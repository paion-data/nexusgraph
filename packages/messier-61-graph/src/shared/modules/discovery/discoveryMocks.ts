/*
 * Copyright Jiaqi Liu
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

type FakeDiscoveryParams = {
  providerIds?: string[]
  host?: string
  neo4jEdition?: 'enterprise' | 'community'
  neo4jVersion?: string
}
export const fakeDiscoveryResponse = ({
  providerIds = [],
  host,
  neo4jVersion = '4.4.0',
  neo4jEdition = 'enterprise'
}: FakeDiscoveryParams): any => ({
  ...(host
    ? {
        bolt_routing: host,
        bolt_direct: host,
        neo4j_version: neo4jVersion,
        neo4j_edition: neo4jEdition
      }
    : {}),
  auth_config: {
    oidc_providers: providerIds.map(createSSOProvider4dot4Format)
  }
})

export const createSSOProvider4dot4Format = (id: string) => ({
  id,
  name: 'Okta',
  auth_flow: 'pkce',
  auth_endpoint: 'https://dev.okta.com/oauth2/default/v1/authorize',
  well_known_discovery_uri:
    'https://dev.okta.com/oauth2/default/.well-known/openid-configuration',
  redirect_uri: 'http://localhost:8085?idp_id=okta-oidc',
  params: {
    client_id: 'cxkvjcvkxlcjbvl',
    response_type: 'code',
    scope: 'openid profile email groups'
  }
})

export const exampleSSOProviderMinimal = {
  id: 'okta-oidc',
  name: 'Okta',
  auth_flow: 'pkce',
  auth_endpoint: 'https://dev.okta.com/oauth2/default/v1/authorize',
  well_known_discovery_uri:
    'https://dev.okta.com/oauth2/default/.well-known/openid-configuration',
  params: {
    client_id: 'cxkvjcvkxlcjbvl',
    redirect_uri: 'http://localhost:8085?idp_id=okta-oidc',
    response_type: 'code',
    scope: 'openid profile email groups'
  }
}

export const exampleSSOProvider = {
  id: 'okta-oidc',
  name: 'Okta',
  auth_flow: 'pkce',
  auth_endpoint: 'https://dev.okta.com/oauth2/default/v1/authorize',
  well_known_discovery_uri:
    'https://dev.okta.com/oauth2/default/.well-known/openid-configuration',
  params: {
    client_id: 'cxkvjcvkxlcjbvl',
    response_type: 'code',
    redirect_uri: 'http://localhost:8085?idp_id=okta-oidc',
    scope: 'openid profile email groups'
  },
  config: {
    implicit_flow_requires_nonce: false,
    token_type_principal: 'id_token',
    token_type_authentication: 'access_token',
    principal: 'sub'
  }
}

export const SSOProvider4dot4Format = {
  bolt_routing: 'neo4j://localhost:7687',
  transaction: 'http://localhost:7474/db/{databaseName}/tx',
  bolt_direct: 'bolt://localhost:7687',
  neo4j_version: '4.4.0-dev',
  neo4j_edition: 'enterprise',
  auth_config: {
    oidc_providers: [
      {
        auth_endpoint:
          'https://login.microsoftonline.com/555ee7dd-5526-4b3d-a35f-b85263b114e7/oauth2/v2.0/authorize',
        well_known_discovery_uri:
          'https://login.microsoftonline.com/555ee7dd-5526-4b3d-a35f-b85263b114e7/v2.0/.well-known/openid-configuration',
        auth_flow: 'pkce',
        id: 'azure-oidc3',
        redirect_uri: 'http://localhost:8085?idp_id=okta-oidc',
        token_endpoint:
          'https://login.microsoftonline.com/555ee7dd-5526-4b3d-a35f-b85263b114e7/oauth2/v2.0/token'
      }
    ]
  }
}

export const exampleSSOProviderFull = {
  id: 'okta-oidc',
  name: 'Okta',
  auth_flow: 'pkce',
  auth_endpoint: 'https://dev.okta.com/oauth2/default/v1/authorize',
  token_endpoint: 'https://dev.okta.com/oauth2/default/v1/token',
  well_known_discovery_uri:
    'https://dev.okta.com/oauth2/default/.well-known/openid-configuration',
  params: {
    client_id: 'cxkvjcvkxlcjbvl',
    redirect_uri: 'http://localhost:8085?idp_id=okta-oidc',
    response_type: 'code',
    scope: 'openid profile email groups'
  },
  auth_params: {
    client_secret: 'jsfsdhfhskfjsdfksdkljfljksf',
    test: 'arg'
  },
  token_params: {
    arg: 'test'
  },
  config: {
    implicit_flow_requires_nonce: false,
    token_type_principal: 'id_token',
    token_type_authentication: 'access_token',
    principal: 'sub',
    code_challenge_method: 'S256'
  }
}
