FROM node:25 AS build

# assert that a compatible yarn version is installed or fail
RUN case `yarn --version` in 1.22*) true;; *) false;; esac
WORKDIR /tmp/app/
COPY . ./
RUN yarn --network-timeout 100000
RUN yarn build:platform

FROM alpine

RUN apk add --no-cache nginx brotli nginx-mod-http-brotli && \
    # Point pid to /var/lib/nginx (owned by nginx user)
    # Drop user directive because we already run as nginx
    sed -i \
    -e 's|/var/run/nginx.pid|/var/lib/nginx/nginx.pid|' \
    -e '/^user/d' \
    /etc/nginx/nginx.conf

RUN addgroup -g 1001 -S nginxgroup && \
    adduser -u 1001 -D -S -G nginxgroup nginxuser

# copy assets, config and entrypoint
COPY --from=build /tmp/app/apps/platform/bundle-platform /usr/share/nginx/html
COPY ./apps/platform/etc/platform.conf /etc/nginx/http.d/platform.conf
COPY ./apps/platform/etc/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

COPY --chown=nginx:nginx ./bundle-platform   /usr/share/nginx/html
COPY --chown=nginx:nginx ./etc/platform.conf /etc/nginx/http.d/platform.conf
COPY --chmod=755         ./etc/entrypoint.sh /entrypoint.sh

USER nginx

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD wget -qO- http://localhost:8080/health || exit 1

ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
