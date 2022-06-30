# ------------------------------------------------------------------------ BUILD
FROM node:25 AS build

WORKDIR /tmp/app/
COPY . ./

# Use the client's CA bundle if present
RUN if [ -s ca-bundle.crt ]; then \
        export NODE_EXTRA_CA_CERTS=/tmp/app/ca-bundle.crt; \
        export npm_config_cafile=/tmp/app/ca-bundle.crt; \
    fi; \
    # set Yarn proxy environment variables
    export YARN_HTTP_PROXY="${http_proxy}" && \
    export YARN_HTTPS_PROXY="${https_proxy}" && \
    # install correct Yarn version
    npm install -g --force @yarnpkg/cli-dist@4.17.1 && \
    # build the platform
    yarn --network-timeout 100000 && \
    yarn install && \
    yarn build:platform

RUN yarn --network-timeout 100000
RUN yarn build:platform

# ---------------------------------------------------------------------- RUNTIME
FROM alpine:3.21

# uncomment the following line if you want to use the client's CA bundle in the runtime container
# COPY --from=build /tmp/app/ca-bundle.crt /etc/ssl/cert.pem

RUN apk add --no-cache nginx brotli nginx-mod-http-brotli && \
    # Point pid to /var/lib/nginx (owned by nginx user)
    # Drop user directive because we already run as nginx
    sed -i \
        -e 's|/var/run/nginx.pid|/var/lib/nginx/nginx.pid|' \
        -e '/^user/d' \
        /etc/nginx/nginx.conf
    
# copy assets, config and entrypoint
COPY --chown=nginx:nginx --from=build /tmp/app/apps/platform/bundle-platform /usr/share/nginx/html
COPY --chown=nginx:nginx ./apps/platform/etc/platform.conf /etc/nginx/http.d/platform.conf
COPY --chmod=755 ./apps/platform/etc/entrypoint.sh /entrypoint.sh

USER nginx

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD wget -qO- http://127.0.0.1:8080/health || exit 1

ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
