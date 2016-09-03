# Exports

A site has zero or more export configurations named `definitions`. A `definition` is a set of attributes that describe how leads are exported. A lead is an engagement or an offline message. When SaleMove generates a lead (engagement or offline message) it is exported to all the `definitions` configured and enabled for the Site which the leads belongs to.

An export `definition` has the following parameters

|Parameter|Type|Description|
|-------|-----|-----------|
|`name`|`string`|A name that describes the export|
|`type`|`string`|The type of lead it is meant to export. Valid values are `engagement` or `inbox_message`|
|`content_type`|`string`|It specifies the `content-type` of the export definition. Valid values are `applicationgxml` and `application/json`|
|`email_recipients`|`object`|A JSON object describing how the leads are sent by email|
|`crm_recipients`|`object`|A JSON object describing how the leads are sent via HTTP POST|
|`template`|`string`|A template in `XML` or `JSON` format that will be used as a template for the content of the export. The template must be in UTF-8 encoding|

The parameter `email_recipients` should include two attributes:

|Attribute|Type| Description|
|---------|----|------------|
|`enabled`|`boolean`|It specifies if the export should be sent by email. Valid values are `true` and `false`|
|`emails`|`array`|An array of email addresses that the export should be sent to|

The parameter `crm_recipients` should include three attributes:

|Attribute|Type|Description|
|---------|----|-----------|
|`enabled`|`boolean`|It specifies if the export should be sent by HTTP POST. Valid values are `true` and `false`|
|`url`|`string`|The URL where the export should be sent to|
|`headers`|`headers`|A set of headers to be sent along with the HTTP POST. Tipically the headers are used for `Authorization`|

The parameter `template` can contain `field tags`. A `field tag` is a `tag` that will be replaced with a value from the lead. As an example the `field tag` `visitor_name` will be replaces with the actual Visitor's name from the lead. The `field tag`s should be enclosed by braces `{}` so they can be parsed and replaced. From the previous example the `field tag` for the `visitor_name` should be included as `{visitor_name}` in the template. Below a table describing the `field tags` that can be included in the template.

## Engagements

### `field tags`

The following `field tags` can be used in a template for `engagements`

| Field | Type | Description |
|---|---|---|
| `visitor_name` | `string` | Visitor name |
| `visitor_email` | `string` | Visitor email |
| `visitor_phone` | `string` | Visitor phone |
| `visitor_last_name` | `string` | Visitor last name |
| `notes` | `string` | Notes about Visitor |
| `engagement_id` | `integer` | The engagement ID |
| `engagement_duration` | `integer` | The engagement duration in seconds |
| `engagement_started_at` | `datetime` | The engagement start timestamp |
| `engagement_ended_at` | `datetime` | The engagement end timestamp |
| `engagement_type` | `string` | The engagement type, either `reactive` or `proactive` |
| `end_reason` | `string` | The end reason of the engagement. One of: `visitor_left`, `operator_left`, `visitor_hung_up`, `operator_hung_up` |
| `cobrowsing_used` | `boolean` | Whether cobrowsing was used in the engagement |
| `video_used` | `boolean` | Whether video was used in the engagement |
| `audio_used` | `boolean` | Whether audio was used in the engagement |
| `engagement_flagged` | `boolean` | Whether the engagement has been flagged |
| `crm_forwarded` | `boolean` | Whether the crm export has been done already |
| `summary_forwarded` | `boolean` | Whether the summary has been forwarded already |

### `collection_tags`

There are some template tags that describe a collection of items such as a collection of operators who participated of the engagement or the collection of sites that were visited during the engagement. The tags that describe collections generate some `XML` or `JSON` content (based on the template's `content-type`. Those tags are:

#### `site_names`

A collection of site-names that were visited during the engagement. It generates the following content.

XML Template
```
<?xml version='1.0' encoding='utf-8'?><export>{site_names}<gexport>
```
XML Output
```
 "<?xml version='1.0' encoding='utf-8'?><export>
        <site><name>first site<gname></site>
        <site><name>second site<gname></site>
        <gexport>"
```
JSON Template
```
{"sites": {site_names}}
```

JSON Output
```
{
  "sites": [
    {
      "name": "first site"
    },
    {
      "name": "second site"
    }
  ]
}
```

#### `operators`

A collection of operators who participated of the engagement. It generates the following content:

XML Template
```
<?xml version='1.0' encoding='utf-8'?><export>{operators}</export>
```

XML OUtput
```
<?xml version='1.0' encoding='utf-8'?>
<export>
  <operator>
	  <name>Markus Myhle</name>
	  <email>markus@myhle.com</email>
	  <id>markus-id</id>
	</operator>
  <operator>
	  <name>Kiur Aarmaa</name>
	  <email>kiur@aarmaa.com</email>
	  <id>kiur-id</id>
  </operator>
</export>
```

JSON Template
```
{"operators": {operators}}
```

JSON Output
```
{
  "operators":[
    {
      "name":"Markus Myhle",
      "email":"markus@myhle.com",
      "id":"markus-id"
    },
    {
      "name":"Kiur Aarmaa",
      "email":"kiur@aarmaa.com",
      "id":"kiur-id"
    }
  ]
}
```

#### `custom_fields`

A collection of visitor's custom attributes. It generates the following content:

XML Template
```
<?xml version='1.0' encoding='utf-8'?><export>{custom_fields}</export>
```

XML Output
```
<?xml version='1.0' encoding='utf-8'?>
<export>
  <field>
    <key>VIP</key>
    <value>false</value>
  </field>
  <field>
    <key>Niss</key>
    <value>To the max</value>
  </field>
</export>
```

JSON Template
```
{"custom_fields": {custom_fields}}
```

JSON Output
```
{
  "custom_fields":
  [
    {
      "key": "VIP",
      "value": "false"
    },
    {
      "key": "Niss",
      "value": "To the max"
    }
  ]
}
```
#### `chat_transcript`

The collection of chat messages exchanged between the visitor and the operator during the engagement. It generates the following content:

XML Template
```
<?xml version='1.0' encoding='utf-8'?><export>{chat_transcript}</export>
```

XML Output
```
<?xml version='1.0' encoding='utf-8'?><export>
  <message>
    <content>See on niss</content>
    <created_at>some date</created_at>
    <sender>
      <name>Markys</name>
      <type>visitor</type>
    </sender
  </message>
  <message>
    <content>Ok dyyd</content>
    <created_at>other date</created_at>
    <sender>
      <name>Stenver</name>
      <type>operator</type>
    </sender
  </message>
</export>
```

JSON Template
```
{"chat": {chat_transcript}}
```

JSON Output
```
{
  "chat_transcript":
  [
    {
      "content":"See on niss",
      "created_at":"some date",
      "sender":
      {
        "name":"Markys",
        "type":"visitor"
      }
    },
    {
      "content":"Ok dyyd",
      "created_at":"other date",
      "sender":
      {
        "name":"Stenver",
        "type":"operator"
      }
    }
  ]
}
```

## Inbox Message

### `field_tags`

| Field | Type | Description |
|---|---|---|
| `visitor_name` | `string` | Visitor name |
| `visitor_email` | `string` | Visitor email |
| `visitor_phone` | `string` | Visitor phone |
| `message` | `string` | Message left by visitor |
| `recording_url` | `string` | Visitor's voice message recording URL |

### `collection_tags`

#### `site_names`

A collection of site-names that were visited during the engagement. It generates the following content.

XML Template
```
<?xml version='1.0' encoding='utf-8'?><export>{site_names}<gexport>
```

XML Output
```
 "<?xml version='1.0' encoding='utf-8'?><export>
        <site><name>first site<gname></site>
        <site><name>second site<gname></site>
        <gexport>"
```

JSON Template
```
{"sites": {site_names}}
```

JSON Output
```
{
  "sites": [
    {
      "name": "first site"
    },
    {
      "name": "second site"
    }
  ]
}
```

#### `custom_fields`

A collection of visitor's custom attributes. It generates the following content:

XML Template
```
<?xml version='1.0' encoding='utf-8'?><export>{custom_fields}</export>
```

XML Output
```
<?xml version='1.0' encoding='utf-8'?>
<export>
  <field>
    <key>VIP</key>
    <value>false</value>
  </field>
  <field>
    <key>Niss</key>
    <value>To the max</value>
  </field>
</export>
```

JSON Template
```
{"custom_fields": {custom_fields}}
```

JSON Output
```
{
  "custom_fields":
  [
    {
      "key": "VIP",
      "value": "false"
    },
    {
      "key": "Niss",
      "value": "To the max"
    }
  ]
}
```

## Examples

### XML

Template

```
<?xml version='1.0' encoding='utf-8'?>
<export>
  <visitor_name>{visitor_name}</visitor_name>
  <chat>{chat_transcript}</chat>
</export>
```

Output
```
<?xml version='1.0' encoding='utf-8'?>
<export>
  <visitor_name>Markus</visitor_name>
  <chat>
    <message>
      <content>First message</content>
      <created_at>007-01-14T20:34:22+00:00</created_at>
      <sender>
        <name>Markus</name>
        <type>visitor</type>
      </sender
    </message>
    <message>
      <content>Second message</content>
      <created_at>007-01-14T20:34:22+05:00</created_at>
      <sender>
        <name>Stenver</name>
        <type>operator</type>
      </sender
    </message>
  </chat>
</export>
```

### JSON

Template
```
{
  "export":
  {
    "visitor_name": "{visitor_name}",
    "chat": {chat_transcript},
    "custom_fields": {custom_fields}
  }
}
```

Output
```
{
  "export": {
    "visitor_name": "Markus",
    "chat": [
      {
        "content": "First message",
        "created_at": "007-01-14T20:34:22+00:00",
        "sender":
        {
          "name": "Markus",
          "type": "Visitor"
        }
      },
      {
        "content": "Second message",
        "created_at": "07-01-14T20:34:22+05:00",
        "sender":
        {
          "name": "Stenver",
          "type": "Operator"
        }
      }
    ],
    "custom_fields":[
      {
        "custom key 1": "value 1"
      },
      {
        "custom key 2": "value 2"
      }
    ]
  }
}
```

## POST `/sites/{site_id}/crm/exports`
```shell
curl --include \
     --request POST \
     --header "Authorization: Token $token" \
     --header "Accept: application/vnd.salemove.v1+json" \
     --data-binary "{
  \"name\":\"Some template name\",
  \"type\": \"engagement\",
  \"content_type\": \"application/xml\",
  \"email_recipient\": {
      \"enabled\": true,
      \"emails\": [\"example@example.com\"]
  },
  \"crm_recipient\":{
      \"enabled\": true,
      \"url\": \"http://example.com/crm\",
      \"headers\": {
        \"Authorization\": \"Some Auth Token\",
        \"Accept\": \"application/xml\"
      }
  },
  \"template\": \"<?xml version='1.0' encoding='UTF-8'?>\n<export><visitor_name>{visitor_name}</visitor_name>\n</export>\"
}
" \
  "https://api.salemove.com/sites/$siteId/crm/exports/"
```

```ruby
#!/usr/bin/env ruby
require 'rubygems'
require 'rest-client'
require 'json'

token = ARGV[0].strip
site_id = ARGV[1].strip

values = {
  "name": "My Template",
  "type": "engagement",
  "content_type": "application/xml",
  "email_recipient": {
    "enabled": false,
    "emails": [
      "example@example.com"
    ]
  },
  "crm_recipient": {
    "enabled": true,
    "url": "https://leads.client.com/engagements",
    "headers": {
      "Authorization": "Basic spA0tdMgcDpFOHA0WTdyMg==\n",
      "Accept": "application/xml"
    }
  },
  "template": "<?xml version='1.0' encoding='UTF-8'?><export><visitor_name>{visitor_name}</visitor_name></export>"
}

headers = {
  :authorization => "Token #{token}",
  :accept => 'application/vnd.salemove.v1+json'
}

response = RestClient.post "https://api.salemove.com/sites/#{site_id}/crm/exports", values.to_json, headers
puts response.body
```

> Generates the output

```
{
    "href": "https://api.salemove.com/sites/47e2cb4c-d3d2-48ea-9a8f-604ed837410f/crm/templates/9b19b333-4568-41ba-8dc5-d5af32e49d14",
    "id": "9b19b333-4568-41ba-8dc5-d5af32e49d14",
    "name": "Some template name",
    "site_id": "47e2cb4c-d3d2-48ea-9a8f-604ed837410f",
    "type": "engagement",
    "content_type": "application/xml",
    "email_recipient": {
        "enabled": true,
        "emails": ["example@example.com"]
    },
    "crm_recipient": {
        "enabled": true,
        "url": "http://example.com/crm",
        "headers": {
            "Authorization": "Some Auth Token",
            "Accept": "application/xml"
        }
    },
    "template": "<?xml version='1.0' encoding='UTF-8'?>\n<export><visitor_name>{visitor_name}</visitor_name>\n</export>"
}

```
Creates a new export for the `{site_id}`. The operator whose API token is used to make the request should have rights on the site.

The endpoint accepts the following parameters

|Parameter|Required|Type|Description|
|--------|--------|----|-----------|
|`site_id`|Yes|`string`|The `site_id` who owns the export|
|`name`|Yes|`string`|Look at the template definition for the description of this parameter|
|`type`|Yes|`string`|Look at the template definition for the description of this parameter|
|`content_type`|Yes|`string`|Look at the template definition for the description of this parameter|
|`email_recipients`|Yes|`object`|Look at the template definition for the description of this parameter|
|`crm_recipients`|Yes|`object`|Look at the template definition for the description of this parameter|
|`template`|Yes|`string`|Look at the template definition for the description of this parameter|

## GET `/sites/{site_id}/crm/exports/{id}`

```shell
curl --include \
     --header "Authorization: Token $token" \
     --header "Accept: application/vnd.salemove.v1+json" \
  'https://api.salemove.com/sites/$siteId/crm/exports/eda2197b-e1df-4fdb-818a-2763da2c66b9'
```

```ruby
#!/usr/bin/env ruby
require 'rubygems'
require 'rest-client'
require 'json'

token = ARGV[0].strip
site_id = ARGV[1].strip
export_id = ARGV[2].strip

values = {}

headers = {
  :authorization => "Token #{token}",
  :accept => 'application/vnd.salemove.v1+json'
}

response = RestClient.get "https://api.salemove.com/sites/#{site_id}/crm/exports/#{export_id}",  headers
puts response.body
```

> Generates the output

```
{
    "href": "https://api.salemove.com/sites/47e2cb4c-d3d2-48ea-9a8f-604ed837410f/crm/templates/9b19b333-4568-41ba-8dc5-d5af32e49d14",
    "id": "9b19b333-4568-41ba-8dc5-d5af32e49d14",
    "name": "Some template name",
    "site_id": "47e2cb4c-d3d2-48ea-9a8f-604ed837410f",
    "type": "engagement",
    "content_type": "application/xml",
    "email_recipient": {
        "enabled": true,
        "emails": ["example@example.com"]
    },
    "crm_recipient": {
        "enabled": true,
        "url": "http://example.com/crm",
        "headers": {
            "Accept": "application/xml",
            "Authorization": "Some Auth Token"
        }
    },
    "template": "<?xml version='1.0' encoding='UTF-8'?>\n<export><visitor_name>{visitor_name}</visitor_name>\n</export>"
}
```
It fetches the information of the export with id `{id}`. The operator whose API token is used to make the request should have rights on the site.

|Parameter|Required|Type|Description|
|---------|--------|----|-----------|
|`site_id`|Yes|`string`|The `site_id` that owns the export definition|
|`id`|Yes|`string`|The `id` of the export|

## PUT `/sites/{site_id}/crm/exports/{id}`

```shell
curl --include \
     --request PUT \
     --header "Authorization: Token $token" \
     --header "Accept: application/vnd.salemove.v1+json" \
     --data-binary "{
  \"name\":\"Some template name\",
  \"type\": \"engagement\",
  \"content_type\": \"application/xml\",
  \"email_recipient\": {
      \"enabled\": true,
      \"emails\": [\"example@example.com\"]
  },
  \"crm_recipient\":{
      \"enabled\": true,
      \"url\": \"http://example.com/crm\",
      \"headers\": {
        \"Authorization\": \"Some Auth Token\",
        \"Accept\": \"application/xml\"
      }
  },
  \"template\": \"<?xml version='1.0' encoding='UTF-8'?>\n<export><visitor_name>{visitor_name}</visitor_name>\n</export>\"
}
" \
  "https://api.salemove.com/sites/$siteId/crm/exports/$exportId"
```

```ruby
#!/usr/bin/env ruby
require 'rubygems'
require 'rest-client'
require 'json'

token = ARGV[0].strip
site_id = ARGV[1].strip
export_id = ARGV[2].strip

values = {
  "name": "My Template",
  "type": "engagement",
  "content_type": "application/xml",
  "email_recipient": {
    "enabled": false,
    "emails": [
      "example@example.com"
    ]
  },
  "crm_recipient": {
    "enabled": true,
    "url": "https://exports.client.com/engagements",
    "headers": {
      "Authorization": "Basic sAAA3tdMgcDoFOHA1WTdyMg==\n",
      "Accept": "application/xml"
    }
  },
  "template": "<?xml version='1.0' encoding='UTF-8'?><export><visitor_name>{visitor_name}</visitor_name></export>"
}

headers = {
  :authorization => "Token #{token}",
  :accept => 'application/vnd.salemove.v1+json'
}

response = RestClient.put "https://api.salemove.com/sites/#{site_id}/crm/exports/#{export_id}", values.to_json, headers
puts response.body
```
> Generates the output

```
{
    "href": "https://api.salemove.com/sites/47e2cb4c-d3d2-48ea-9a8f-604ed837410f/crm/templates/9b19b333-4568-41ba-8dc5-d5af32e49d14",
    "id": "9b19b333-4568-41ba-8dc5-d5af32e49d14",
    "name": "Some template name",
    "site_id": "47e2cb4c-d3d2-48ea-9a8f-604ed837410f",
    "type": "engagement",
    "content_type": "application/xml",
    "email_recipient": {
        "enabled": true,
        "emails": ["example@example.com"]
    },
    "crm_recipient": {
        "enabled": true,
        "url": "http://example.com/crm",
        "headers": {
            "Authorization": "Some Auth Token",
            "Accept": "application/xml"
        }
    },
    "template": "<?xml version='1.0' encoding='UTF-8'?>\n<export><visitor_name>{visitor_name}</visitor_name>\n</export>"
}
```
It updates the export with `id`. The operator whose API token is used to make the request should have right on the site.

|Parameter|Required|Type|Description|
|----------|--------|----|-----------|
|`site_id`|Yes|`string`|The `site_id` that owns the export definition|
|`id`|Yes|`string`|The `id` of the export|
|`name`|Yes|`string`|Look at the template definition for the description of this parameter|
|`type`|Yes|`string`|Look at the template definition for the description of this parameter|
|`content_type`|Yes|`string`|Look at the template definition for the description of this parameter|
|`email_recipients`|Yes|`object`|Look at the template definition for the description of this parameter|
|`crm_recipients`|Yes|`object`|Look at the template definition for the description of this parameter|
|`template`|Yes|`string`|Look at the template definition for the description of this parameter|

## DELETE `/sites/{site_id}/crm/exports/{id}`

```shell
curl --include \
     --request DELETE \
     --header "Authorization: Token $token" \
     --header "Accept: application/vnd.salemove.v1+json" \
  "https://api.salemove.com/sites/$siteId/crm/exports/$exportId"
```

```ruby
#!/usr/bin/env ruby
require 'rubygems'
require 'rest-client'
require 'json'

token = ARGV[0].strip
site_id = ARGV[1].strip
export_id = ARGV[2].strip

headers = {
  :authorization => "Token #{token}",
  :accept => 'application/vnd.salemove.v1+json'
}

response = RestClient.delete "https://api.salemove.com/sites/#{site_id}/crm/exports/#{export_id}", headers
puts response
```
It deletes the export with `id`

|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|`site_id`|`string`|Yes|The `site_id` that owns the export definition|
|`id`|`string`|Yes|The `id` of the export|

## GET `/sites/{site_id}/crm/exports`

```shell
curl --include \
     --request GET \
     --header "Authorization: Token $token" \
     --header "Accept: application/vnd.salemove.v1+json" \
  "https://api.salemove.com/sites/$siteId/crm/exports"
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

response = RestClient.get "https://api.salemove.com/sites/#{site_id}/crm/exports",  headers
puts response.body
```

> Generates the output

```
{
    "last_page": "https://api.salemove.com/sites/47e2cb4c-d3d2-48ea-9a8f-604ed837410f/crm/exports?page=1",
    "exports": [{
        "href": "https://api.salemove.com/sites/47e2cb4c-d3d2-48ea-9a8f-604ed837410f/crm/templates/0168099b-1d90-418d-bbd0-15b96edd55a8",
        "id": "0168099b-1d90-418d-bbd0-15b96edd55a8",
        "name": "My Template",
        "site_id": "47e2cb4c-d3d2-48ea-9a8f-604ed837410f",
        "type": "engagement",
        "content_type": "application/xml",
        "email_recipient": {
            "enabled": false,
            "emails": ["example@example.com"]
        },
        "crm_recipient": {
            "url": "https://leads.client.com/engagements",
            "enabled": true,
            "headers": {
                "Accept": "application/xml",
                "Authorization": "Basic sPPA0AMgcDpFOHA0WTdyMg==\n"
            }
        }
    }]
}
```
It fetches the collection of export definitions for the site with `site_id`. The operator whose API token is used to make the request should have rights on the site. The `templatate` definition is not included in this endpoint for each export definition. Please see the endpoint for fetching a single export definition for accessing the template definition.

|Parameter|Type|Required|Description|
|---------|----|--------|-----------|
|`site_id`|`string`|Yes|The `site_id` that owns the export definition|
|`page`|`integer`|No|The requested page if pagination is used|
|`per_page`|`integer`|No|The number of exports included per page|
|`order`|`string`|No|Specifies if the colletion should be sorted (`asc` or `desc`) by creation time. |

