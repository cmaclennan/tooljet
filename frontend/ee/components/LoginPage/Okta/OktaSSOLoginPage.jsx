import React, { useEffect } from 'react';
import useRouter from '@/_hooks/use-router';
import { getOktaURL, getOktaSignIn } from './utils/utils';

export default function OktaSSOLoginPage() {
  const router = useRouter();

  const clientId = window.public_config?.SSO_OKTA_OAUTH2_CLIENT_ID;
  const oktaDomain = window.public_config?.SSO_OKTA_OAUTH2_DOMAIN;
  const redirectUri = window.public_config?.SSO_OKTA_OAUTH2_REDIRECT_URI;
  const authServer = window.public_config?.SSO_OKTA_OAUTH2_AUTH_SERVER || 'default';
  const enableSelfHosted = window.public_config?.SSO_OKTA_OAUTH2_ENABLE_SELF_HOSTED;

  useEffect(() => {
    if (!(clientId && oktaDomain && redirectUri)) {
      return window.location.href(`${redirectUri}?error_description=Okta login error`);
    }

    if (enableSelfHosted === 'true') {
      getOktaSignIn({ clientId, oktaDomain, redirectUri, authServer })
        .showSignInAndRedirect({
          el: '#osw-container',
        })
        .catch(function () {
          window.location.href(`${redirectUri}?error_description=Okta login error`);
        });
    } else if (router.query?.iss?.includes(oktaDomain)) {
      window.location.href = getOktaURL({ clientId, oktaDomain, redirectUri, authServer });
    } else {
      return window.location.href(`${redirectUri}?error_description=Okta login error`);
    }
  }, []);

  return (
    <div>
      {enableSelfHosted === 'true' && (
        <div className="page page-center">
          <link
            href="https://global.oktacdn.com/okta-signin-widget/5.16.1/css/okta-sign-in.min.css"
            type="text/css"
            rel="stylesheet"
          />
          <div className="container-tight py-2">
            <div id="osw-container"></div>
          </div>
        </div>
      )}
    </div>
  );
}
