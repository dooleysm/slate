# Engagements

## GET /engagements

```shell
curl -X GET --include \
     --header "Authorization: Token API_TOKEN" \
     --header "Accept: application/vnd.salemove.v1+json" \
  'https://api.salemove.com/engagements?operator_ids[]=e1c6bd0b-aef2-4948-8182-85a075f419e0&site_ids[]=18529853-4487-4234-be0b-7ca94e1e06bf&start_date=2015-10-01T13'
```

```ruby
require 'httparty'

ENGAGEMENT_API_ENDPOINT = 'https://api.salemove.com/engagements'

api_token = ARGV[0]

headers = {
  "Authorization" => "Token #{api_token}",
  "Accept" => "application/vnd.salemove.v1+json"
}

options = {
  headers: headers,
  query: {
    site_ids: ['e1c6bd0b-aef2-4948-8182-85a075f419e0'],
    operator_ids: ['18529853-4487-4234-be0b-7ca94e1e06bf']
    page: 1
  }
}

raw_response = HTTParty.get(ENGAGEMENT_API_ENDPOINT, options)

response = JSON.parse raw_response.body
puts response
```

> Generates the output

```
{
    "next_page": "https://api.salemove.com/engagements?page=2&per_page=3",
    "last_page": "https://api.salemove.com/engagements?page=22&per_page=3",
    "engagements": [
      {
        "id": "52f8e590-72af-4f20-8428-dfaf95de889e",
        "engagement_type": "reactive",
        "created_at": "2016-07-06T11:57:47.656Z",
        "duration": 0,
        "visitor_name": "Visitor #8",
        "visitor_id": "4cb42417-f153-4209-b885-757f87237b8b",
        "cobrowsing_used": false,
        "video_used": false,
        "audio_used": false,
        "flagged": false,
        "audio_recording_urls": [],
        "crm_forwarded": false,
        "summary_forwarded": true,
        "visitor": {
          "href": "https://api.salemove.com/visitors/4cb42417-f153-4209-b885-757f87237b8b"
        },
        "chat_transcript": {
          "href": "https://api.salemove.com/engagements/52f8e590-72af-4f20-8428-dfaf95de889e/chat_transcript"
        },
        "operators": [{
          "href": "https://api.salemove.com/operators/18529853-4487-4234-be0b-7ca94e1e06bf"
        }]
      },
      {
        "id": "37e9f0f4-c62e-4103-8ff6-f4e8024a4204",
        "engagement_type": "reactive",
        "created_at": "2016-07-06T11:46:37.569Z",
        "duration": 1,
        "visitor_name": "Visitor #8",
        "visitor_id": "4cb42417-f153-4209-b885-757f87237b8b",
        "cobrowsing_used": false,
        "video_used": false,
        "flagged": false,
        "audio_recording_urls": ["https://api.salemove.com/sub_engagements/1120220/twilio_recordings/4994"],
        "crm_forwarded": false,
        "summary_forwarded": true,
        "visitor": {
          "href": "https://api.salemove.com/visitors/4cb42417-f153-4209-b885-757f87237b8b"
        },
        "chat_transcript": {
          "href": "https://api.salemove.com/engagements/37e9f0f4-c62e-4103-8ff6-f4e8024a4204/chat_transcript"
        },
        "operators": [{
          "href": "https://api.salemove.com/operators/18529853-4487-4234-be0b-7ca94e1e06bf"
        }]
      },
      {
        "id": "98ad3576-849f-48e0-b456-a5bddfd83055",
        "engagement_type": "reactive",
        "created_at": "2016-07-06T11:23:54.508Z",
        "duration": 0,
        "visitor_name": "Visitor #7",
        "visitor_id": "2bf17d2a-4dd1-43f2-b27b-f48e159e6721",
        "cobrowsing_used": true,
        "video_used": false,
        "audio_used": false,
        "flagged": false,
        "audio_recording_urls": [],
        "crm_forwarded": false,
        "summary_forwarded": true,
        "visitor": {
          "href": "https://api.salemove.com/visitors/2bf17d2a-4dd1-43f2-b27b-f48e159e6721"
        },
        "chat_transcript": {
          "href": "https://api.salemove.com/engagements/98ad3576-849f-48e0-b456-a5bddfd83055/chat_transcript"
        },
        "operators": [{
          "href": "https://api.salemove.com/operators/18529853-4487-4234-be0b-7ca94e1e06bf"
      }]
    }]
}
```
Fetches a collection of engagements. The endpoint requires a list of `site_ids` as well as a set of `operator_ids`. The requester needs to have access to the sites and operators send along with the request. The results are paginated and sorted by engagement id in descending order.

The endpoint accepts the following filters.

|Parameter| Required |Type|Description|
|--------|----------|----|-----------|
|`operator_ids` | Yes | Array of strings | A list of operator ids whose engagements are requested.|
|`site_ids`| Yes | Array of strings | A list of site ids whose engagements are requested.|
|`start_date`| No | `iso8601` Date | The response will include engagements that happen from `start_date` forward in time.|
|`end_date`| No | `iso8601` Date | The response will include engagement that happen on `end_date` or before `start_data`.|
|`page`| No |  Number| If pagination is used then this parameter specifies what page is requested.|
|`per_page`| No | Number | If pagination is used then this parameter specifies the number of engagements per page.|
|`order`| No | [`asc`, `desc`]| It specifies if the results should be sorted in `ascending` or `descending` order. Engagements are sorted by starting time in descending order.|

## GET /engagement/:engagement_id

```shell
curl -X GET --include \
     --header "Authorization: Token API_TOKEN" \
     --header "Accept: application/vnd.salemove.v1+json" \
  'https://api.salemove.com/engagements/ef117ae4-f8a9-45e9-874c-087e19c8dbe6'
```

```ruby
require 'httparty'

ENGAGEMENT_API_ENDPOINT = 'https://api.salemove.com/engagements'

api_token = ARGV[0]
engagement_id = ARGV[1]

def headers
  {
    "Authorization" => "Token #{api_token}",
    "Accept" => "application/vnd.salemove.v1+json"
  }
end

raw_response = HTTParty.get "#{ENGAGEMENT_API_ENDPOINT}/#{engagement_id}"
parsed_response = JSON.parse raw_response

puts parsed_response
```

> Generates the output

```
{
    "id": "65f68744-40c5-4278-968a-6ee33df0722a",
    "engagement_type": "proactive",
    "created_at": "2016-07-07T13:47:21.150Z",
    "duration": 10,
    "visitor_name": "Visitor #7",
    "visitor_id": "88cf925d-d606-46d6-bdf0-0715e7bb963d",
    "cobrowsing_used": true,
    "video_used": true,
    "audio_used": true,
    "flagged": false,
    "audio_recording_urls":
      [
        "https://api.salemove.com/sub_engagements/1122834/recordings/XaMiTQI"
      ],
    "crm_forwarded": false,
    "summary_forwarded": false,
    "visitor": {
      "href": "https://api.salemove.com/visitors/88cf925d-d606-46d6-bdf0-0715e7bb963d"
    },
    "chat_transcript": {
      "href": "https://api.salemove.com/engagements/65f68744-40c5-4278-968a-6ee33df0722a/chat_transcript"
    },
    "operators":
    [
      {
        "href": "https://api.salemove.com/operators/f8769233-937d-4550-bdd3-8613027b2729"
      }
    ]
}
```
Fetches a single engagement by ID. The Operator whose token is used for sending the request should be authorized to access the Site's information to which the engagement belongs.

## GET /engagements/:engagement_id/chat_transcript

```shell
curl -X GET --include \
     --header "Authorization: Token API_TOKEN" \
     --header "Accept: application/vnd.salemove.v1+json" \
  'https://api.salemove.com/engagements/e1c6bd0b-aef2-4948-8182-85a075f419e0/chat_transcript'
```

```ruby
require 'httparty'

ENGAGEMENT_API_ENDPOINT = 'https://api.salemove.com/engagements'

api_token = ARGV[0]
engagement_id = ARGV[1]

def headers
  {
    "Authorization" => "Token #{api_token}",
    "Accept" => "application/vnd.salemove.v1+json"
  }
end

raw_response = HTTParty.get "#{ENGAGEMENT_API_ENDPOINT}/#{engagement_id}/chat_transcript"
parsed_response = JSON.parse raw_response

puts parsed_response
```

> Generates the output

```
[
  {
    "message": "Hi, can u please help me get a quote?",
    "created_at": "2016-07-07T13:47:28.000Z",
    "sender": {
      "href": "https://api.salemove.com/visitors/88cf925d-d606-46d6-bdf0-0715e7bb963d",
      "name": null,
      "type": "visitor"
    }
  },
  {
    "message": "Sure, Ill take you there",
    "created_at": "2016-07-07T13:47:34.000Z",
    "sender": {
      "href": "https://api.salemove.com/operators/f8769233-937d-4550-bdd3-8613027b2729",
      "name": "Alex Raffa",
      "type": "operator"
    }
  },
  {
    "message": "CoBrowsing Started",
    "created_at": "2016-07-07T13:47:41.000Z",
    "sender": {
      "type": "system",
      "name": "system"
    }
  }, {
    "message": "Upgraded to One-Way Video",
    "created_at": "2016-07-07T13:48:13.000Z",
    "sender": {
        "type": "system",
        "name": "system"
    }
}]
```
Fetches an engagement's chat transcript. The operator whose token is used for sending the request should be authorized to access the Site's information to which the engagement belongs.

## POST /engagements/:engagement_id/export

```shell
curl --include \
     --request POST \
     --header "Authorization: Token API_TOKEN" \
     --header "Accept: application/vnd.salemove.v1+json" \
  'https://api.salemove.com/engagements/18529853-4487-4234-be0b-7ca94e1e06bf/export'
```

```ruby
require 'httparty'

ENGAGEMENT_API_ENDPOINT = 'https://api.salemove.com/engagements'

api_token = ARGV[0]
engagement_id = ARGV[1]

def headers
  {
    "Authorization" => "Token #{api_token}",
    "Accept" => "application/vnd.salemove.v1+json"
  }
end

raw_response = HTTParty.get "#{ENGAGEMENT_API_ENDPOINT}/#{engagement_id}/export"
parsed_response = JSON.parse raw_response

puts parsed_response
```

> Generates the output

```
{"success":true}
```
It exports the engagement using all exports definitions configured for the Site to which the engagement started on. The Operator whose token is used for sending the request should be authorized to access the Sites' information to which the engagement belongs. If the engagement is transfered to other sites and the Operator is not authorized in all the sites then the export will contain only the data concern to the sites that the Operator's is authorized to access.

