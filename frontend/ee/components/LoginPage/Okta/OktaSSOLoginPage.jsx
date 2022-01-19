import React, { useEffect } from 'react';
import OktaSignIn from '@okta/okta-signin-widget';
import useRouter from '@/_hooks/use-router';
import { buildURL } from '@/_helpers/utils';
import * as uuid from 'uuid';

export default function OktaSSOLoginPage() {
  const router = useRouter();

  const clientId = window.public_config?.SSO_OKTA_OAUTH2_CLIENT_ID;
  const oktaDomain = window.public_config?.SSO_OKTA_OAUTH2_DOMAIN;
  const redirectUri = window.public_config?.SSO_OKTA_OAUTH2_REDIRECT_URI;
  const authServer = window.public_config?.SSO_OKTA_OAUTH2_AUTH_SERVER || 'default';

  useEffect(() => {
    console.log(router.query.iss, oktaDomain);
    if (router.query?.iss?.includes(oktaDomain)) {
      window.location.href = buildURL(`https://${oktaDomain}/oauth2/${authServer}/v1/authorize`, {
        client_id: clientId,
        redirect_uri: redirectUri,
        scope: 'openid email profile',
        response_type: 'code',
        response_mode: 'query',
        state: uuid.v4(),
        nonce: uuid.v4(),
      });
    }
    if (!(clientId && oktaDomain && redirectUri)) {
      return window.location.href(`${redirectUri}?error_description=Okta login error`);
    }
    const signIn = new OktaSignIn({
      logo: 'https://ok12static.oktacdn.com/assets/img/logos/okta-logo.47066819ac7db5c13f4c431b2687cef6.png',
      baseUrl: oktaDomain,
      clientId: clientId,
      redirectUri: redirectUri,
      issuer: `https://${oktaDomain}/oauth2/${authServer}`,
      scopes: ['openid', 'email', 'profile'],
      authParams: {
        pkce: false,
        responseType: 'code',
      },
      helpLinks: {
        help: `https://${oktaDomain}/help/login`,
      },
    });
    signIn
      .showSignInAndRedirect({
        el: '#osw-container',
      })
      .catch(function () {
        window.location.href(`${redirectUri}?error_description=Okta login error`);
      });
  }, []);

  return (
    <div className="page page-center">
      <div className="container-tight py-2">
        <div id="osw-container"></div>
      </div>
    </div>
  );
}
