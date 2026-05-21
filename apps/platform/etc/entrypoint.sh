#!/bin/sh

cat << EOF > /usr/share/nginx/html/config.js
var gitVersion = '${WEBAPP_GIT_VERSION:-}'
var configUrlApi = '${WEBAPP_API_URL:-https://api.platform.opentargets.org/api/v4/graphql}'
var configOTAiApi = '${WEBAPP_OPENAI_URL:-https://ai.platform.opentargets.org}'
var configGoogleTagManagerID = '${WEBAPP_GOOGLE_TAG_MANAGER_ID:-GTM-XXXXX}'
var configShowTopBar = ${WEBAPP_SHOW_TOP_BAR:-false}
configProfile['helpdeskEmail'] = '${WEBAPP_HELPDESK_EMAIL}'
EOF

cat "/usr/share/nginx/html/profiles/${WEBAPP_FLAVOR:-platform}.js" >> /usr/share/nginx/html/config.js

exec nginx -g 'daemon off;'
