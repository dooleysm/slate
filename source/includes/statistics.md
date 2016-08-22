# Statistics
Queries are made in JSON using an HTTP REST style request. The query language is based on [Druid query language](http://druid.io/docs/latest/querying/querying.html).

## Query Types
There are two types of queries: **timeseries** and **group by** queries.

### Query Type: Timeseries
These types of queries take a `timeseries` query object and return an array of JSON objects where each object represents a value asked for by the timeseries query.

An example timeseries query object against `/engagements/stats/count` endpoint is shown below
```
{
  "query_type": "timeseries",
  "granularity": "all",
  "start_date": "2015-01-01T00:00:00Z",
  "end_date": "2016-01-01T00:00:00Z",
  "filter": {
    "type": "selector",
    "dimension": "type",
    "value": "reactive"
  }
}
```

A `timeseries` query includes the following parts:

| property    | description                                                                                     | required?  |
| ----------- |:-----------------------------------------------------------------------------------------------:| ----------:|
| query_type  | This String should always be "timeseries".                                                      | yes        |
| granularity | Defines the granularity to bucket query results. See [Granularities](#statistics-granularities) | yes        |
| start_date  | A ISO-8601 timestamp. Defines the query start date (inclusive).                                 | yes        |
| end_date    | A ISO-8601 timestamp. Defines the query end date (exclusive).                                   | yes        |
| filter      | See [Filters](#statistics-filters)                                                              | yes        |

### Query Type: Group by
These types of queries take a `group by` query object and return an array of JSON objects where each object represents a grouping asked for by the query. **Note**: If you only want to do straight aggregates for some time range, we highly recommend using `timeseries` queries instead. The performance will be substantially better.

An example `group by` query object against `/engagements/stats/count` endpoint is shown below
```js
    {
      "query_type": "timeseries",
      "dimensions": ["operator_id"],
      "granularity": "all",
      "start_date": "2015-01-01T00:00:00Z",
      "end_date": "2016-01-01T00:00:00Z",
      "filter": {"type": "selector", "dimension": "type", "value": "reactive"}
    }
```

A `group by` query includes the following parts:

| property    | description                                                                                     | required?  |
| ----------- |:-----------------------------------------------------------------------------------------------:| ----------:|
| query_type  | This String should always be "group_by".                                                        | yes        |
| dimensions  | A JSON list of dimensions to do group by over.                                                  | yes        |
| granularity | Defines the granularity to bucket query results. See [Granularities](#statistics-granularities) | yes        |
| start_date  | A ISO-8601 timestamp. Defines the query start date (inclusive).                                 | yes        |
| end_date    | A ISO-8601 timestamp. Defines the query end date (exclusive).                                   | yes        |
| filter      | See [Filters](#statistics-filters)                                                              | yes        |

## Granularities
<a name="statistics-granularities"></a>

The granularity field determines how data gets aggregated. Supported granularities are `all`, `hour` and `day`. `all` buckets everything into a single bucket.

## Filters
<a name="statistics-filters"></a>

A filter is a JSON object indicating which rows of data should be included in the computation for a query. It’s essentially the equivalent of the WHERE clause in SQL. You can use the following types of filters.

### Selector filter
The simplest filter is a selector filter. The selector filter will match a specific dimension with a specific value. Selector filters can be used as the base filters for more complex Boolean expressions of filters.

The grammar for a SELECTOR filter is as follows:
```
  "filter": {"type": "selector", "dimension": <dimension_string>, "value": <dimension_value_string>}
```

### Logical expression filters
#### AND
The grammar for an AND filter is as follows:
```
  "filter": {"type": "and", "fields": [<filter>, <filter>, ...]}
```

#### OR
The grammar for an OR filter is as follows:
```
  "filter": {"type": "or", "fields": [<filter>, <filter>, ...]}
```

#### NOT
The grammar for a NOT filter is as follows:
```
  "filter": {"type": "not", "field": <filter>}
```

#####

### `POST /engagements/stats/count`

Returns engagement count.

Possible dimensions that can be used in filters:

|Dimension|Description|
|---------|-----------|
|`site_id`| Site ID|
|`operator_id`| Operator ID|
|`type`| Type of engagemens. Possible values are `proactive`, `reactive`, `transfer`|
|`source`| **reactive** engagement starting source (`button_embed`, `callout`, `hotlink`, `external_button`, `tab`) |
|`outcome` |Engagement outcome (`accepted`, `rejected`, `timed_out`, `visitor_left`, `visitor_cancel`, `operator_cancel`, `operator_left`)|
|`offered_media`  |  `video`, `audio`, `phone`, `chat`|
|`accepted_media` | `video`, `audio`, `phone`, `chat`|


#### Request

Headers
```
Authorization: Token 2pFuPlTYkH7T4MylrwxApA
Accept: application/vnd.salemove.v1+json
```
Body
```
{
  "query_type": "group_by",
  "dimensions": ["operator_id"],
  "granularity": "day",
  "start_date": "2015-09-01T00:00:00Z",
  "end_date": "2015-09-03T00:00:00Z",
  "filter": {
    "type": "or",
    "fields": [
      {
        "type": "selector",
        "dimension": "operator_id",
        "value": "92d333b3-c194-4dfa-8a48-562d81c27bd8"
      },
      {
        "type": "selector",
        "dimension": "operator_id",
        "value": "8a832fe9-db22-48ac-a3ef-b25bf0d9db95"
      }
    ]
  }
}
```

#### Response
```
200

[
  {
    "count": 18,
    "operator_id": "92d333b3-c194-4dfa-8a48-562d81c27bd8",
    "timestamp": "2015-09-01T00:00:00.000Z"
  },
  {
    "count": 2,
    "operator_id": "8a832fe9-db22-48ac-a3ef-b25bf0d9db95",
    "timestamp": "2015-09-01T00:00:00.000Z"
  },
  {
    "count": 20,
    "operator_id": "92d333b3-c194-4dfa-8a48-562d81c27bd8",
    "timestamp": "2015-09-02T00:00:00.000Z"
  },
  {
    "count": 22,
    "operator_id": "8a832fe9-db22-48ac-a3ef-b25bf0d9db95",
    "timestamp": "2015-09-02T00:00:00.000Z"
  }
]
```

### POST `/engagements/stats/duration`

Returns the sum of engagement durations in seconds.

Possible dimensions that can be used in filters:

|Filters|Type|Required|Description|
|-------|----|--------|-----------|
|`site_id`|`string`|Yes|A site `id` whose engagements will be included in the calculations|
|`operator_id`|`strings`|Yes|An operator `id` whose engagements will be included in the calculations|

#### Request

Headers
```
Authorization: Token 2pFuPlTYkH7T4MylrwxApA
Accept: application/vnd.salemove.v1+json
```

Body
```
{
  "query_type": "timeseries",
  "granularity": "day",
  "start_date": "2015-09-01T00:00:00Z",
  "end_date": "2015-09-03T00:00:00Z",
  "filter": {}
}
```
#### Response
```
200

[
  {
    "seconds": 1334,
    "timestamp": "2015-09-01T00:00:00.000Z",
  },
  {
    "seconds": 568,
    "timestamp": "2015-09-02T00:00:00.000Z",
  }
]
```

### POST `/engagements/media_events/stats/count`

Returns the count of various events relating to engagement media. Such as engagement offers (from both the operator and the visitor) with a particular media and upgrades from one media to another.

Possible dimensions that can be used in filters:

|Dimension|Type|Required|Description|
|---------|----|--------|-----------|
|`site_id`|`string`|Yes|A site `id` whose engagements will be included in the calculations|
|`operator_id`|`strings`|Yes|An operator `id` whose engagements will be included in the calculations|
|`media`|`string`|No|The types of media that will be used for the filter. Possible values are (`video`, `audio`, `phone`, `chat`)|
|`type`|`enum`|No|The engagement event type|

|Engagement Event Type|Description|
|---------------------|-----------|
|`visitor_requested`|reactive engagement request event|
|`operator_requested` | proactive engagement request event|
|`visitor_accepted`|proactive engagement accept event|
|`operator_accepted` | reactive engagement accept event|
|`visitor_media_upgrade` | visitor media upgrade event|
|`operator_media_upgrade` | operator media upgrade event|
|`operator_media_upgrade_offer`| operator offer for both to use given media|

#### Request
Headers
```
Authorization: Token 2pFuPlTYkH7T4MylrwxApA
Accept: application/vnd.salemove.v1+json
```

Body
```
{
  "query_type": "timeseries",
  "granularity": "day",
  "start_date": "2015-09-01T00:00:00Z",
  "end_date": "2015-09-03T00:00:00Z",
  "filter": {}
}
```

#### Response
```
200
[
  {
    "count": 1334,
    "timestamp": "2015-09-01T00:00:00.000Z",
  },
  {
    "count": 568,
    "timestamp": "2015-09-02T00:00:00.000Z",
  }
]
```

### POST `/visitors/stats/count`

Returns approximate distinct visitor count. This endpoint is using [HyperLogLog](https://en.wikipedia.org/wiki/HyperLogLog) algorithm to calculate cardinality.

Possible dimensions that can be used in filters:

|Dimension|Type|Required|Description|
|`site_id`|`string`|Yes|The `site_id` of the site whose visitors are included in the calculations|


#### Request

Headers
```
Authorization: Token 2pFuPlTYkH7T4MylrwxApA
Accept: application/vnd.salemove.v1+json
```
Body
```
{
  "query_type": "timeseries",
  "granularity": "day",
  "start_date": "2015-09-01T00:00:00Z",
  "end_date": "2015-09-03T00:00:00Z",
  "filter": {}
}
```
#### Response
```
200

[
  {
    "count": 1898,
    "timestamp": "2015-09-01T00:00:00.000Z",
  },
  {
    "count": 2034,
    "timestamp": "2015-09-02T00:00:00.000Z",
  }
]
```

### POST `/visits/stats/count`

Returns visitor session count.

Possible dimensions that can be used in filters:

|Dimension|Type|Required|Description|
|---------|----|--------|-----------|
|`site_id`|`string`|Yes|The `site_id` of the site whose visits are included in the calculations|


#### Request

Headers
```
Authorization: Token 2pFuPlTYkH7T4MylrwxApA
Accept: application/vnd.salemove.v1+json
```

Body
```
{
  "query_type": "timeseries",
  "granularity": "day",
  "start_date": "2015-09-01T00:00:00Z",
  "end_date": "2015-09-03T00:00:00Z",
  "filter": {}
}
```

#### Response
```
200

[
  {
    "count": 2023,
    "timestamp": "2015-09-01T00:00:00.000Z",
  },
  {
    "count": 2094,
    "timestamp": "2015-09-02T00:00:00.000Z",
  }
]
```

### POST `/alerts/stats/count`

Returns operator alert count.

Possible dimensions that can be used in filters:

|Dimensions|Type|Required|Description|
|----------|----|--------|-----------|
|`site_id`|`string`|Yes|The `site_id` whose alerts will be included in the calculations|
|`operator_id`|`string`|Yes| The `operator_id` who received the alerts from the site with `id`|

#### Request

Headers
```
Authorization: Token 2pFuPlTYkH7T4MylrwxApA
Accept: application/vnd.salemove.v1+json
```

Body
```
{
  "query_type": "timeseries",
  "granularity": "day",
  "start_date": "2015-09-01T00:00:00Z",
  "end_date": "2015-09-03T00:00:00Z",
  "filter": {}
}
```

#### Response
```
200

[
  {
    "count": 1022,
    "timestamp": "2015-09-01T00:00:00.000Z",
  },
  {
    "count": 1058,
    "timestamp": "2015-09-02T00:00:00.000Z",
  }
]
```

### POST `/operators/stats/online_duration`

Returns operator online duration in seconds.

Possible dimensions that can be used in filters:

|Dimension|Type|Required|Description|
|---------|----|--------|-----------|
|`site_id`|`string`|Yes|A `site_id` whose operators will be included in the calculations|
|`operator_id`|`string`|Yes|An `operator_id` whose online duration is being requested|
|`type`|`enum`|Yes| Operator online status.|

There are three groups of types an online operator can have:

|Operator Status Type|Description|
|--------------------|-----------|
|available media type| It describes what the operator is available for. Possible values are `video`, `audio`, `chat`|
|engaged|if the operator is currently in an engagement. Possible values (`true`, `false`)|
|unavailable type|It describes what kind of unavailiabity the operator selected while being marked as away or busy. E.g. `Quick Break`, `Training`, `With Customer`|

#### Request

Headers
```
Authorization: Token 2pFuPlTYkH7T4MylrwxApA
Accept: application/vnd.salemove.v1+json
```

Body
```
{
  "query_type": "timeseries",
  "granularity": "day",
  "start_date": "2015-09-01T00:00:00Z",
  "end_date": "2015-09-03T00:00:00Z",
  "filter": {}
}
```

#### Response
```
200

[
  {
    "seconds": 4122,
    "timestamp": "2015-09-01T00:00:00.000Z",
  },
  {
    "seconds": 4458,
    "timestamp": "2015-09-02T00:00:00.000Z",
  }
]
```

