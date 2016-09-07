# Surveys

Surveys enable operators and visitors to give feedback and extra details about engagements.

## GET `/engagements/:engagement_"id"/visitor_survey`
```shell
```

```ruby
```

> Generates the output

```
{
  "questions": [
    {
      "id": 54545211,
      "type": "boolean",
      "title": "Would you recommend this agent?"
    },
    {
      "id": 54545212,
      "type": "scale",
      "title": "How helpful was your chat representative?"
    },
    {
      "id": 54545213,
      "type": "single_choice",
      "title": "What was the order value?",
      "choices": [
        {
          "id": 2340,
          "title": "$0-100"
        },
        {
          "id": 2341,
          "title": "$101-200"
        },
        {
          "id": 2342,
          "title": "$200+"
        }
      ]
    },
    {
      "id": 54545214,
      "type": "text",
      "title": "Additional Feedback"
    },
  ],
  "answers" : [
    {
      "id": 54545211,
      "response": true
    },
    {
      "id": 54545212,
      "response": 4
    },
    {
      "id": 54545213,
      "response": 2341
    },
    {
      "id": 54545214,
      "response": "Best experience ever!"
    }
  ]
}
```
It fetches the survey filled by the visitor after an engagement.


## PUT `/engagements/:engagement_id/visitor_survey/answers`
```shell
```

```ruby
```

> Geerates the output

```
[
  {
    "id": 54545211,
    "response": true
  },
  {
    "id": 54545212,
    "response": 4
  },
  {
    "id": 54545213,
    "response": 2341
  },
  {
    "id": 54545214,
    "response": "Best experience ever!"
  }
]
```

Submits visitor survey response for the given engagement id.
