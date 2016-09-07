---
title: API Reference

language_tabs:
  - shell
  - ruby
  - python
  - javascript

toc_footers:
  - <a href='#'>Sign Up for a Developer Key</a>
  - <a href='https://github.com/tripit/slate'>Documentation Powered by Slate</a>

includes:
  - operators
  - visitors
  - sites
  - site_visitor
  - site_reactive_tab
  - engagements
  - statistics
  - exports
  - saml
  - surveys
  - js_api
  - html_css

search: true
---

# SaleMove API

This describes the resources that make up official SaleMove API v1. If you have any problems, requests or questions please contact support.

## Current Version
```
Accept: application/vnd.salemove.v1+json
```
The current API version is **v1** and it must be explicitly requested via the `Accept` header.

## Schema

```
HTTP/1.1 200 OK
Date: Thu, 29 Jan 2015 11:44:37 GMT
Status: 200 OK
Connection: close
Content-Type: text/html;charset=utf-8
Access-Control-Allow-Origin: https://salemove.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS, PATCH
Access-Control-Allow-Headers: *, Content-Type, Accept, AUTHORIZATION, Cache-Control, X-Salemove-Visit-Session-Id
Access-Control-Allow-Credentials: true
Access-Control-Max-Age: 1728000
Access-Control-Expose-Headers: Cache-Control, Content-Language, Content-Type, Expires, Last-Modified, Pragma
Content-Length: 0
X-XSS-Protection: 1; mode=block
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
```
```
YYYY-MM-DDTHH:MM:SSZ
```

All API access is over HTTPS, and accessed from the `https://api.salemove.com` endpoint. All data is sent and received as `JSON`. The only supported cryptographic protocol is TLS 1.2.

Blank fields are included as `null` instead of being ommited.

All timestamps are formatted in `ISO 8601`.

This documentation provides an example response for each API method. The example responses illustrate attributes that are returned by that method.

## Parameters

Many API methods take optional parameters. For `GET` requests, any parameters not specified as part of the path can be passed as an `HTTP` query string parameter. For `POST`, `PATCH`, `PUT`, and `DELETE` requests, parameters not included in the URL should be encoded as `JSON` with a `content-type` of `application/json`.

## Client Errors

```
HTTP/1.1 400 400
```
```
[
  {
    "error": "BadRequest",
    "message": "Invalid api version used",
    "debug_message": "Invalid api version used. Make sure you set the 'Accept' header with API version e.g. 'application/vnd.salemove.v1+json'"
  }
]
```
If the request is malformed then an error is thrown. The response contains a description of the error. In general, the response includes two attributes namely `error` which contains a short description of the error encountered and a `debug_message` which contains a more detail explanation of the error.

## HTTP Verbs
Where possible, API strives to use appropriate HTTP verbs for each action.

|Verbs | Description|
---------|-----------
|`HEAD` | Can be issued against any resource to get just the HTTP header info.|
|`GET` | Used for retrieving resources.|
|`POST` | Used for creating resources.|
|`PATCH` | Used for updating resources with partial JSON data.  For instance, an Issue resource has `title` and `body` attributes.  A PATCH request may accept one or more of the attributes to update the resource.  PATCH is a relatively new and uncommon HTTP verb, so resource endpoints also accept `POST` requests.|
|`PUT` | Used for replacing resources or collections. For `PUT` requests with no `body` attribute, be sure to set the `Content-Length` header to zero.|
|`DELETE` |Used for deleting resources.|

## Authentication

### Headers

```shell
# curl -X GET -i https://api.salemove.com/operators -H "Authorization: Token API_TOKEN" -H "Accept: application/vnd.salemove.v1+json"
```

```javascript
$.ajax({
  type: 'GET',
  url: 'https://api.salemove.com/engagements',
  headers: {
    'Accept': 'application/vnd.salemove.v1+json',
    'Authorization': 'Token API_TOKEN'
  },
  success: function(response){
    ajaxResponse = response;
  }
});
```
Along with the request the following headers need to be sent:

|Header|Description|
-------|-----------
|`Accept`|It specify the api version. For the version `1` of the API the header value is `application/vnd.salemove.v1+json`|
|`Authorization`|The API token. The tokens are assigned per operator. A token is a 32 character string. For example `2pFuPlTYkH7T4MylrwxApA`|

## Cross Origin Resource Sharing

The API supports Cross Origin Resource Sharing (CORS) for AJAX requests from any origin. More information about CORS in [CORS W3C Recommendation](http://www.w3.org/TR/cors/), or the intro from the [HTML 5 Security Guide](https://www.owasp.org/index.php/HTML5_Security_Cheat_Sheet).

## Pagination
```
GET /operators
```
> Generates the output

```
[
  {
      "next_page" : "http://api.salemove.com/collections?page=2",
      "last_page" : "http://api.salemove.com/collections?page=3",
      "collection" : [
        {
          "href" : "http://api.salemove.com/collections/1",
          "attribute" : "value",
          "..." : "..."
        },
        {
          "href" : "http://api.salemove.com/collections/2",
          "attribute" : "value",
          "..." : "..."
        },
      ]
  }
]
```

Some requests return a collection of items divided by pages. A specific page can be requested by setting the parameter `page` and the size of the page can be set with the parameter `per_page`. The minimum page size is `1` the maximum page size is `100` and the default page size is `30`. The collections can be ordered using the parameter `order` with values `asc` or `desc`.

Fetchs all the operators with 30 items per page

Fetchs the second page of operators. Notice the parameter `page` with a value of `2` (`page=2`)
```
GET /operators?page=2
```

### Link Header

The responses for collections that are paginated include an attribute `next_page` that points to the next page of items for the collection. In addition, the response includes a `last_page` attribute that points to the last page of the collection.


<div id="salemove"></div>
