#!/bin/sh

cat << EOF > /usr/share/nginx/html/config.js
var gitVersion = '${WEBAPP_GIT_VERSION:-}'
var configUrlApi = '${WEBAPP_API_URL:-https://api.platform.opentargets.org/api/v4/graphql}'
var configOTAiApi = '${WEBAPP_OPENAI_URL:-https://ai.platform.opentargets.org}'
var configGoogleTagManagerID = '${WEBAPP_GOOGLE_TAG_MANAGER_ID:-GTM-XXXXX}'
var configShowTopBar = ${WEBAPP_SHOW_TOP_BAR:-false}
EOF

cat "/usr/share/nginx/html/profiles/${WEBAPP_FLAVOR:-platform}.js" >> /usr/share/nginx/html/config.js

# Select the PPP llms.txt variant when running the partner flavor
if [ "${WEBAPP_FLAVOR:-platform}" = "ppp" ]; then
  cp /usr/share/nginx/html/llms.ppp.txt /usr/share/nginx/html/llms.txt
fi

# Remove the inactive partner variant so it is never served on the public origin
rm -f /usr/share/nginx/html/llms.ppp.txt
# helpdeskEmail must be appended AFTER the profile file, not before.
# Reason: the profile defines `var configProfile = {...}`. If we assign
# configProfile['helpdeskEmail'] before that line runs, configProfile is still
# undefined. Appending after ensures configProfile is already
# initialized, so this line both overrides an existing value (e.g. ppp.js)
# and injects the property when the profile omits it (e.g. platform.js).
cat << EOF >> /usr/share/nginx/html/config.js
configProfile['helpdeskEmail'] = '${WEBAPP_HELPDESK_EMAIL}'
EOF

exec "$@"
