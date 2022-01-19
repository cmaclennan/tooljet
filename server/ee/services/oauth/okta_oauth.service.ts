import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import got from 'got';
import UserResponse from './models/user_response';

@Injectable()
export class OktaOAuthService {
  constructor(private readonly configService: ConfigService) {
    this.clientSecret = this.configService.get<string>('SSO_OKTA_OAUTH2_CLIENT_SECRET');
    this.domain = this.configService.get<string>('SSO_OKTA_OAUTH2_DOMAIN');
    this.clientId = this.configService.get<string>('SSO_OKTA_OAUTH2_CLIENT_ID');
    this.redirectUri = this.configService.get<string>('SSO_OKTA_OAUTH2_REDIRECT_URI');
  }
  private readonly clientSecret: string;
  private readonly domain: string;
  private readonly clientId: string;
  private readonly redirectUri: string;

  async #getUserDetails({ access_token }: AuthResponse): Promise<UserResponse> {
    const getUserUrl = `https://${this.domain}/oauth2/default/v1/userinfo`;
    const response: any = await got(getUserUrl, {
      method: 'get',
      headers: { Authorization: `Bearer ${access_token}` },
    }).json();

    console.log('====>>>', response);


    const { name, email } = response;

    const words = name?.split(' ');
    const firstName = words?.[0] || '';
    const lastName = words?.length > 1 ? words[words.length - 1] : '';

    return { userSSOId: access_token, firstName, lastName, email, sso: 'okta' };
  }

  async signIn(code: string): Promise<UserResponse> {
    const authUrl = `https://${this.domain}/oauth2/default/v1/token`;
    const response: any = await got(authUrl, {
      method: 'post',
      headers: { authorization: `Basic ${Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64')}` },
      form: {
        grant_type: 'authorization_code',
        redirect_uri: this.redirectUri,
        code,
      },
    }).json();
    console.log('====>>>', response);
    

    return await this.#getUserDetails(response);
  }
}

interface AuthResponse {
  access_token: string;
  token_type?: string;
  expires_in?: string;
  scope?: string;
  id_token?: string;
}
