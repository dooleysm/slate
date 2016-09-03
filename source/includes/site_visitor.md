# Site Visitors

A Site has visitors and the information of those visitors can be fetched and updated programatically by means of the following endpoints.

## GET `/sites/{site_id}/visitors/{visitor_id}`

```shell
curl --include \
     --header "Authorization: Token $token" \
     --header "Accept: application/vnd.salemove.v1+json" \
  "https://api.salemove.com/sites/$siteId/visitors/$visitorId"
```

```ruby
#!/usr/bin/env ruby
require 'rubygems'
require 'rest-client'
require 'json'

token = ARGV[0].strip
site_id = ARGV[1].strip
visitor_id=ARGV[2].strip

headers = {
  :authorization => "Token #{token}",
  :accept => 'application/vnd.salemove.v1+json'
}

response = RestClient.get "https://api.salemove.com/sites/#{site_id}/visitors/#{visitor_id}",  headers
puts response.body
```

> Generates the output

```
{
  "href": "https://api.salemove.com/sites/ba02c995-5079-4adc-a0b8-819e7f301091/visitors/bb40afd7-7f65-4869-93ea-48a61c783aba",
  "name": null,
  "email": null,
  "phone": "7378742833",
  "note": null,
  "custom_attributes": {},
  "id": "bb40afd7-7f65-4869-93ea-48a61c783aba"
}
```
It fetches the visitor's information with id `visitor_id` for the site with id `site_id`. The operator whose API Token is used for making the request should have rights on the site.

## PUT `/sites/{site_id}/visitors/{visitor_id}`

```shell
curl --include \
     --request PUT \
     --header "Authorization: Token $token" \
     --header "Accept: application/vnd.salemove.v1+json" \
     --data-binary "{
\"name\": \"John\",
\"email\": \"test@email.com\",
\"phone\": \"55443322\",
\"note\": \"some random dude\",
\"note_update_method\": \"append\",
\"custom_attributes\": {
  \"These are custom fields, which you can define yourself. Those shown below are just examples\": \"...\",
  \"home_address\": \"Winston\",
  \"vip\": \"true\"
}
}" \
"https://api.salemove.com/sites/$siteId/visitors/$visitorId"
```

```ruby
#!/usr/bin/env ruby
require 'rubygems'
require 'rest-client'
require 'json'

token = ARGV[0].strip
site_id = ARGV[1].strip
visitor_id = ARGV[2].strip

values = {
  name: "John",
  email: "test@email.com",
  phone: "55443322",
  note: "some random dude",
  note_update_method: "append",
  custom_attributes: {
    home_address: "Winston",
    vip: "true"
  }
}

headers = {
  :authorization => "Token #{token}",
  :accept => 'application/vnd.salemove.v1+json'
}

response = RestClient.put "https://api.salemove.com/sites/#{site_id}/visitors/#{visitor_id}", values.to_json, headers
puts response.body
```

> Generates the output

```
{
  "href": "https://api.salemove.com/sites/ba02c995-5079-4adc-a0b8-819e7f301091/visitors/bb40afd7-7f65-4869-93ea-48a61c783aba",
  "name": "John",
  "email": "test@email.com",
  "phone": "55443322",
  "note": "some random dude",
  "custom_attributes": {
    "home_address": "Winston",
    "vip": "true"
  },
  "id": "bb40afd7-7f65-4869-93ea-48a61c783aba"
}
```
It updates the visitor's information with id `visitor_id` for the site with id `site_id`. The operator whose API token is used for making the request should have rights on the site.

|Paramter|Type|Required|Description|
|--------|----|--------|-----------|
|`site_id`|`string`|Yes|The site id whose visitor's information will be updated|
|`visitor_id`|`string`|Yes|The visitor whose information will be updated|
|`name`|`string`|No|The visitor's name|
|`email`|`string`|No|The visitor's email|
|`phone`|`string`|No|The visitor's phone|
|`note`|`string`|No|The visitor's notes.|
|`note_updated_method`|`enum`|No|Specifies a method for updating the visitor's note. The default value is `replace`. Available values are `replace` and `append`. If the method is `replace` then the notes for the visitor will be overwriten by the field `note` in the request. If the method is `append` then the field `note` in the request will append to the existing visitor's notes.|
|`custom_attributes`|`object`|No|An object with custom key-value pairs to be assigned to the visitor. The server treats all keys and values as strings and also returns them as strings. Nested key-value pairs are not supported.|



