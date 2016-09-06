# Sites

## Search by `hostname` `GET /sites?hostname={hostname}`

```shell
# curl --include \
     --header "Authorization: Token $token" \
     --header "Accept: application/vnd.salemove.v1+json" \
  'https://api.salemove.com/sites?hostname=salemove.com'
```

```ruby
#!/usr/bin/env ruby
require 'rubygems'
require 'rest-client'
require 'json'

token = ARGV[0].strip
hostname = ARGV[1].strip

headers = {
  :authorization => "Token #{token}",
  :accept => 'application/vnd.salemove.v1+json'
}

response = RestClient.get "https://api.salemove.com/sites?hostname=#{hostname}", headers
```

> Generates the output

```
{
  "last_page": "https://api.salemove.com/sites?hostname=salemove.com&page=1",
  "sites": [
    {
      "href": "https://api.salemove.com/sites/8a832fe9-db22-48ac-a3ef-b25bf0d9db95",
      "id": "8a832fe9-db22-48ac-a3ef-b25bf0d9db95",
      "addresses": ["salemove.com", "salemove.cars2go.mobi", "auto.salemove.com", "webflow.io"]
    }
  ]
}
```
A site can have one ore more `addresses` where an `address` is a combination of `hostname` + `path`. As an example a valid address is `salemove.com/auto` where `hostname`=`salemove.com` and `path`=`/auto`.

This endpoint fetches a list of sites that have the `hostname` within the site's addresses.


## POST `/sites`

```shell
curl --include \
     --request POST \
     --header "Authorization: Token $token" \
     --header "Accept: application/vnd.salemove.v1+json" \
     --data-binary "    {
      \"name\": \"New site name\",
      \"addresses\": [\"sub.whitelisteddomain.com\"]
    }" \
'https://api.salemove.com/sites'
```

```ruby
#!/usr/bin/env ruby
require 'rubygems'
require 'rest-client'
require 'json'

token = ARGV[0].strip

values = {
  "name": "My New Site",
  "addresses": [ "sub.whitelisteddomain.com" ]
}

headers = {
  :authorization => "Token #{token}",
  :accept => 'application/vnd.salemove.v1+json'
}

response = RestClient.post "https://api.salemove.com/sites", values.to_json, headers
puts response.body
```

> Generates the output

```
{
  "href": "https://api.salemove.com/sites/05dd4b39-52df-401a-9dd7-1e1af0aff783",
  "id": "05dd4b39-52df-401a-9dd7-1e1af0aff783",
  "addresses": ["sub.whitelisteddomain.com"],
  "name": "New site name",
  "salemove_enabled": false
}
```

An operator with `manager` privileges can use the API token associated to the account to create new sites.

|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|`name`|`string`|Yes|The name for the new site|
|`addresses`|`array`|Yes|A list of site's addresses|
|`clone_from_id`|`string`|No|The new site will be configured using this `site_id` as template. The new site will copy the visuals, teams and business rules from the `site_id` passed in this parameter.|

## GET `/sites/{id}`

```shell
curl --include \
     --header "Authorization: Token $token" \
     --header "Accept: application/vnd.salemove.v1+json" \
  "https://api.salemove.com/sites/$siteId"
```

```ruby
#!/usr/bin/env ruby
require 'rubygems'
require 'rest-client'
require 'json'

token = ARGV[0].strip
site_id = ARGV[1].strip

values = {}

headers = {
  :authorization => "Token #{token}",
  :accept => 'application/vnd.salemove.v1+json'
}

response = RestClient.get "https://api.salemove.com/sites/#{site_id}",  headers
puts response.body
```

> Generates the output

```
{
    "href": "https://api.salemove.com/sites/47e2cb4c-d3d2-48ea-9a8f-604ed837410f",
    "id": "47e2cb4c-d3d2-48ea-9a8f-604ed837410f",
    "hostnames": ["beta.carlospaniagua.io"],
    "name": "Carlos Beta",
    "salemove_enabled": false
}
```
It fetches the site with id `id`. The operator whose API token is used to send the request should have rights on the site with id `id`.

|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|`id`|`string`|Yes|The site `id` that is requested|


## PUT `/sites/{id}`

```shell
# curl --include \
     --request PUT \
     --header "Authorization: Token $token" \
     --header "Accept: application/vnd.salemove.v1+json" \
     --data-binary "{
  \"salemove_enabled\": \"true\",
  \"reactive_enabled\": \"false\",
  \"name\": \"New site name\",
  \"domains\": [\"mobile.domain.com\"]
}" \
"https://api.salemove.com/sites/$siteId"
```

```ruby
#!/usr/bin/env ruby
require 'rubygems'
require 'rest-client'
require 'json'

token = ARGV[0].strip
siteId = ARGV[1].strip

values = {
  "name": "My New Site",
  "domains": [ "new.whitelisteddomain.com" ],
  "salemove_enabled": false,
  "reactive_enabled": false
}

headers = {
  :authorization => "Token #{token}",
  :accept => 'application/vnd.salemove.v1+json'
}

response = RestClient.put "https://api.salemove.com/sites/#{siteId}", values.to_json, headers
puts response
```

> Generates the output

```
HTTP/1.1 200 OK
Content-Type: application/json
Date: Thu, 21 Jul 2016 12:56:47 GMT
Server: nginx/1.9.15
X-Content-Type-Options: nosniff
Content-Length: 203
Connection: keep-alive

{
  "href": "https://api.salemove.com/sites/47e2cb4c-d3d2-48ea-9a8f-604ed837410f",
  "id": "47e2cb4c-d3d2-48ea-9a8f-604ed837410f",
  "hostnames": ["mobile.domain.com"],
  "name": "New site name",
  "salemove_enabled": true
}

```

It updates the site with id `id`. The operator whose API token is used to send the request should have rghts on the site with id `id`.

|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|`id`|`string`|Yes|The site `id` that is being updated|
|`salemove_enabled`|`boolean`|No|if `true` then it enables SaleMove for the Site, if `false` it disables SaleMove for the site. When SaleMove is enabled the SaleMove integration is delivered otherwise a `204` `No-Content` is delivered|
|`reactive_enabled`|`boolean`|No|If `true` then the Reactive Tab is shown to the visitor. If `false` then the Reactive Tab is hidden to the visitor.|
|`clone_from_id`|`string`|No|The new site will be configured using this `site_id` as template. The new site will copy the visuals, teams and business rules from the `site_id` passed in this parameter.|



