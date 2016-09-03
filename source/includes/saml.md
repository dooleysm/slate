# SAML

SaleMove supports clients using Single Sign-On via Security Assertion Markup Language (SAML 2.0). SAML is an XML-based, open-standard data format that allows parties to securely exchange user authentication and authorization data.  SAML-Based Single Sign-On (SSO) allows clients to have full control over the authorization and authentication of user accounts that can access to the web-based Operator Application. In this model, SaleMove acts as a service provider while SaleMove's clients act as identity providers that control usernames, passwords and other information used during the identification, authentication and authorization process of users by SaleMove web applications. In addition, all logs remain with the identity provider (SaleMove’s client) for audit purposes.

SaleMove supports two ways of SSO by means of SAML: Identity Provider (IdP) Initiated SSO (Unsolicited Web SSO) and Service Provider (SP) initiated SSO. In an IdP Initiated SSO a user is logged on to the IdP and attempts to access a resource (SaleMove) on a remote SP server. The SAML assertion is transported to the Service Provider (SaleMove) via HTTP POST.

The SAML parameters can be configured programatically or by requesting help from your success maanager.

## POST `/saml`

```shell
```

```ruby
```

It creates a SAML provider and it can be associated to a site.

|Parameters|Type|Required|Description|
|----------|----|--------|-----------|
|`idp_metadata_url`|`string`|Yes|An URL to the SAML Provider endpoint that returns the Provider's configuration data|
|`site_id`|`string`|Yes|The `id` of the Site that the SAML configuration will be associated to|
|`name_identifier_format`|`string`|Yes|The name of the attribute within a sAML response where the operator's email is placed|
|`subdomain`|`string`|Yes|The subdomain that will be used by operators to access the operator console. E.g. if the subdomain is set to `client_name` then the operators will access SaleMove via `client_name.app.salemove.com`|
|`auth_context`|`string`|No|The authentication context of the SAML|
|`idp_name_attribute`|`string`|No|The name of the attribute within a SAML response where the operator's name is placed|
|`idp_email_attribute`|`string`|No|The name of the attribute within a SAML response where the opeartor's emal is placed|

Later the information of the new SAML provider can be fetched at the url `subdomain.app.salemove.com/saml/metadata`. Where the `subdomain` is the value of the parameter `subdomain` sent along with the POST request.

## PUT `/saml/{saml_id}`

```shell
```
```ruby
```
It updates the configuration of a SAML provider.

|Parameters|Type|Required|Description|
|----------|----|--------|-----------|
|`saml_id`|`string`|Yes|The `id` of the SAML provider to be updated|
|`site_id`|`string`|Yes|The `id` of the site that the SAML will be assigned to|
|`idp_metadata_url`|`string`|Yes|An URL to the SAML Provider endpoint that returns the Provider's configuration data|
|`site_id`|`string`|Yes|The `id` of the Site that the SAML configuration will be associated to|
|`name_identifier_format`|`string`|Yes|The name of the attribute within a sAML response where the operator's email is placed|
|`subdomain`|`string`|Yes|The subdomain that will be used by operators to access the operator console. E.g. if the subdomain is set to `client_name` then the operators will access SaleMove via `client_name.app.salemove.com`|
|`auth_context`|`string`|No|The authentication context of the SAML|
|`idp_name_attribute`|`string`|No|The name of the attribute within a SAML response where the operator's name is placed|
|`idp_email_attribute`|`string`|No|The name of the attribute within a SAML response where the opeartor's emal is placed|

## Call your sucess manager

While configuring the SAML provider via the Success Manager the following parameters will be requested

|Parameters|Type|Required|Description|
|----------|----|--------|-----------|
|`certificate fingerpring`|`string`|Yes|The certificate fingerprint used for authentication purposes between the IDP and the SP|
|`name_identifier_format`|`string`|Yes|The name of the attribute within a sAML response where the operator's email is placed|
|
