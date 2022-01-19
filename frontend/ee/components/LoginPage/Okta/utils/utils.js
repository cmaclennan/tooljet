import { buildURL } from '@/_helpers/utils';
import * as uuid from 'uuid';
import OktaSignIn from '@okta/okta-signin-widget';

export function getOktaURL({ clientId, oktaDomain, authServer, redirectUri }) {
  return buildURL(`https://${oktaDomain}/oauth2/${authServer}/v1/authorize`, {
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: 'openid email profile',
    response_type: 'code',
    response_mode: 'query',
    state: uuid.v4(),
    nonce: uuid.v4(),
  });
}

export function getOktaSignIn({ clientId, oktaDomain, authServer, redirectUri }) {
  return new OktaSignIn({
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
}
