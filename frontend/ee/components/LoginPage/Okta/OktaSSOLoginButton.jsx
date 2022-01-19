import React from 'react';
import { buildURL } from '@/_helpers/utils';
import * as uuid from 'uuid';

export default function OktaSSOLoginButton() {
  const clientId = window.public_config?.SSO_OKTA_OAUTH2_CLIENT_ID;
  const enableSelfHosted = window.public_config?.SSO_OKTA_OAUTH2_ENABLE_SELF_HOSTED;
  const authServer = window.public_config?.SSO_OKTA_OAUTH2_AUTH_SERVER || 'default';
  const oktaDomain = window.public_config?.SSO_OKTA_OAUTH2_DOMAIN;
  const redirectUri = window.public_config?.SSO_OKTA_OAUTH2_REDIRECT_URI;

  const redirect = (e) => {
    e.preventDefault();

    if (enableSelfHosted === 'true') {
      window.location.href = '/auth/okta';
    } else {
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
  };
  return (
    <div>
      <button onClick={redirect} className="btn border-0 rounded-2">
        <img src="/assets/images/sso-buttons/okta.svg" className="h-4" />
        <span className="px-1">Sign in with okta</span>
      </button>
    </div>
  );
}
