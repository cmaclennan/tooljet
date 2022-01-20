---
sidebar_position: 6
sidebar_label: Okta
---

# Okta Single Sign-on

Sign in to [Okta developer console](https://developer.okta.com/)
Goto `Applications` section and `Create App Integration`

<img class="screenshot-full" src="/img/sso/okta/create-app.png" alt="ToolJet - Okta create application" height="420"/>
<br /><br /><br />

Select `Sign-in method` as `OIDC - OpenID Connect` and `Application type` as `Web Application`. Go to next step

<img class="screenshot-full" src="/img/sso/okta/create-app-s1.png" alt="ToolJet - Okta create application" height="420"/>
<br /><br /><br />

Enter `App integration name`. Enter `Sign-in redirect URIs` as `<YOUR-DOMAIN>/sso/okta` same sould be configured as environment variable `SSO_OKTA_OAUTH2_REDIRECT_URI`.

<img class="screenshot-full" src="/img/sso/okta/create-app-s2.png" alt="ToolJet - Okta create application" height="420"/>
<br /><br /><br />

If you plan to self-host the Okta Sign-In Widget, you should configure `Trusted Origins` which is your domain and set the environment variable `SSO_OKTA_OAUTH2_ENABLE_SELF_HOSTED` value `true`. Select appropriate `Controlled access` for your application.

<img class="screenshot-full" src="/img/sso/okta/create-app-s3.png" alt="ToolJet - Okta create application" height="420"/>
<br /><br /><br />

Create application. Configure `Client Credentials` in environment variable. Set `SSO_OKTA_OAUTH2_CLIENT_ID` as `Client ID` and `SSO_OKTA_OAUTH2_CLIENT_SECRET` as `Client secret`.
You can find `Okta domain`, set it for `SSO_OKTA_OAUTH2_DOMAIN`.

<img class="screenshot-full" src="/img/sso/okta/create-app-s4.png" alt="ToolJet - Okta set environment variables" height="420"/>
<br /><br /><br />

If you wish to show your application on Okta, Edit the application and select `Login initiated by` section as `Either Okta or App`. Select visibility. `Login flow` should be `Redirect to app to initiate login (OIDC Compliant)`

:::info

### Change Grant type 
To change the Login flow to `Redirect to app to initiate login (OIDC Compliant)`, its mandatory to change the `Grant type` - `Client acting on behalf of a user` section to `Implicit (hybrid)` and tick `Allow Access Token with implicit grant type`.
:::

<img class="screenshot-full" src="/img/sso/okta/create-app-s5.png" alt="ToolJet - List the application in okta" height="420"/>
<br /><br /><br />

:::info

### Authorization Servers
If you want to use `Authorization Server` other than `default`, the name has to be set to `SSO_OKTA_OAUTH2_AUTH_SERVER` environment variable. Got to `API` under `Security` menu to view list of servers. No need to set any value to environment variable if you are using `default`.
:::

<br />
The Okta sign-in button will now be available in your ToolJet login screen.