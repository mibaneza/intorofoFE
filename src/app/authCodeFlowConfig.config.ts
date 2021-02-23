import {AuthConfig} from 'angular-oauth2-oidc';

export const authCodeFlowConfig: AuthConfig = {
  loginUrl: 'https://discord.com/api/oauth2/authorize',
  tokenEndpoint: 'https://discord.com/api/oauth2/token',
  redirectUri: 'http://localhost:4200/forums/?',
  clientId: '788516512600293426',
  scope: 'identify',
  responseType: 'token',
  strictDiscoveryDocumentValidation: false,
  oidc: false,
  showDebugInformation: true,
};
