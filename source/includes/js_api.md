# JavaScript API [Deprecated]

SaleMove API V1 has been released please find the documentation in [here](https://js-sdk-docs.salemove.com/extra/README.md.html)

SaleMove Legacy JS API can be used for handling specific events during the observation and engagement process. The API is bundled with the `salemove_integration` script. [Promises](https://js-sdk-docs.salemove.com/extra/README.md.html) are used to provide access to the JS SDK.

```
sm.getApi().then(
    function(api){
      console.log("I got the api!", api);
      window.salemoveApi = api;
    },
    function(err){ console.log("An error occured: ", err)}
  );
```

The promise is resolved as soon as the SaleMove is fully bootstrapped.

## Event Types

There are few events that are fired during the observatio and engagement process. As an example when an engagement starts the event `ENGAGEMENT_START` is fired and the handler for such an event (if set) is called. All the available events are accesable via the `salemoveAPI.EVENTS` collection.

|Event|Description| Payload|
|------|-----------|-------|
|`ENGAGEMENT_START`| Fired when an engagement starts - proactive or reactive|An object with the engagement Id.|
|`ENGAGEMENT_END`|Fired when an engagement ends either by the operator or the visitor|An object with the engagement Id.|
|`OPERATOR_LIST_UPDATE`|Fired when an operator goes online or offline|An array of Operators|
|`OPERATOR_STATUS_UPDATE`|Fired when an operator's attribute gest updated (e.g. availability status)||

### Engagement Start

Fired when an engagement starts (proactive or reactive). The callback receives a JSON object with the engagement Id as a parameter.

```
salemoveApi.addEventListener(
  salemoveApi.EVENTS.ENGAGEMENT_START,
  function(engagement){
    console.log('The engagement with id ' + engagement.engagementId + ' started');
  }
);
```

### Engagement End

Fired when an engagement ends either by the operator or the visitor. The callback receives a JSON object with the engagement Id as a parameter.

```
salemoveApi.addEventListener(
  salemoveApi.EVENTS.ENGAGEMENT_END,
  function(engagement){
    console.log('The engagement with id ' + engagement.engagementId + ' ended');
  }
);
```

### Engagment List Update

Fired when an operator goes online or offline. The callback receives an Array of online operators as a parameter. Every operator in the list contains the following attributes: id, name, picture, and state (availability and media availability).

```
salemoveApi.addEventListener(
  salemoveApi.EVENTS.OPERATOR_LIST_UPDATE,
  function(operatorList){
    console.log(operatorList)
  }
);
```

Output

```
[{
  id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  name: 'John Doe',
  picture: {
    url: 'http://some.url/picture.png'
  },
  state: {
    available: true,
    media: ['audio', 'chat']
  }
},
{
  id: 'ef117ae4-f8a9-45e9-874c-087e19c8dbe6',
  name: 'John Snow',
  picture: {
    url: 'http://some.url/another_picture.png'
  },
  state: {
    available: false,
    media: ['video','audio', 'chat']
  }
}]
```

### Operator Status Update
Fired when an operator updates his/her availability or his/her media availability. The callback receives an JSON object as a parameter. The object contains the following operator's attributes: id, name, picture, state (availability and media availability).

|Operator Attribute|Description|
-------------------|-----------|
|`id`|Operator Id|
|`name`| Operator Name|
|`picture`| An object with an attribute `url` containing the Operator's picture URL|
|`state`|An object with two attributes `available` and `media`. The `available` attribute indicates if the operator is available for starting and engagement. The `media` attribute indicates what the operator is available for. The `media` attribute possible values are: `video`, `audio`, `chat`|



```
salemoveApi.addEventListener(
  salemoveApi.EVENTS.OPERATOR_STATUS_UPDATE,
  function(operatorNewStatus){
    console.log(operatorNewStatus)
  }
);
```

Output

```
{
  id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
  name: 'John Doe',
  picture: {
    url: 'http://some.url/picture.png'
  },
  state: {
    available: true,
    media: ['audio', 'chat']
  }
}
```

The following example keeps track of operators online and their availability statuses.

```
sm.getApi().then(function(api) {
  var operators = [];

  onOperatorStatusChange = function(updatedOperator) {
    operators = operators.map(function(operator) {
      if (operator.id == updatedOperator.id) {
        return updatedOperator;
      } else {
        return operator;
      }
    });
    updateElementUI();
  }

  onOperatorListChange = function(updatedOperators) {
    operators = updatedOperators;
    updateElementUI();
  }

  updateElementUI = function() {
    filterAvailableOperators = function(operators) {
      return operators.filter(function(operator) {
        return operator.state.available;
      });
    }

    var availableOperators = filterAvailableOperators(operators);
    if (availableOperators.length == 0) {
      alert("No operators are available.");
      // Update application to indicate that no operators are available
    }
    else {
      alert("At least one operator is now available.");
      // Update application to indicate that at least one operator is available
    }
  }

  api.addEventListener(api.EVENTS.OPERATOR_LIST_UPDATE, onOperatorListChange);
  api.addEventListener(api.EVENTS.OPERATOR_STATUS_UPDATE, onOperatorStatusChange);
});
```

## Listeners

The function `addEventListener` is provided to add a callback for any of the events supported. The `addEventListener` function accepts two parameters namely `EventName` and `Callback`. The `EventName` parameter is one of the events suppported by the JS API and the `Callback` is a function fired when the event is triggered.

```
addEventListener(<EventName>, <Callback>)
```

```
salemoveApi.addEventListener(
  salemoveApi.EVENTS.ENGAGEMENT_END,
  function(engagement){
    console.log('the engagement with id ' + engagement.engagementId + ' ended!')
  }
);
```

The function `removeEventListener` is provided to remove a callback previously set for an event.


```
removeEventListener(<EventName>,<CallBack>)
```

```
callback = function(engagement){
  console.log('The engagement with id' + engagement.engagementId + 'ended!');
}
...
salemoveApi.addEventListener(
  salemoveApi.EVENTS.
  callback
);
...
salemoveApi.removeEventListener(
  salemoveApi.EVENTS.ENGAGEMENT_END,
  callback
);
`
```

## Headers

There are few REST end-points that can be accessed only by a currently online visitor. The visitor needs to send few headers to the API for authentication. The JS API provides the function `getRequestHeaders` that returns the collection of Headers needed to make an AJAX request.

```
$.ajax({
  type: 'GET',
  url: 'https://api.salemove.com/visitor',
  headers: salemoveApi.getRequestHeaders(),
  success: function(response){
    ajaxResponse = response;
  }
});
```



