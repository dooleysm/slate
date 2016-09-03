# HTML and CSS Customizations

## Cobrowsing

### Prevent elements to be shown to the operator

```
<div class='sm_cobrowsing_hidden_field'>
  This element will not be displayed to the operator
</div>
...
<div class='sm_cobrowsing_hidden_field other-classes'>
  This element will not be displayed to the operator
</div>
...
<div class='other-classes sm_cobrowsing_hidden_field'>
 This element will not be displayed to the operator
</div>
...
<input class='other-classes sm_cobrowsing_hidden_field' other="...">
  <!-- This input field will not be shown to the operator -->
</input>
...
<form class='other-classes sm_cobrowsing_hidden_field' other="...">
  <!-- The entire form will not be displayed to the operator -->
</form>
```
To prevent elements to be shown in the operator session during observation or engagement add the class `sm_cobrowsing_hidden_field` to the html elements.

### Prevent fields' values to be shown to the operator

```
<form action="action" method="get">
First name:
<!-- This input field value will be shown as `*`(s) to the operator -->
<input class="sm_cobrowsing_masked_field" type="text" name="first_name" />
Last name:
<!-- This input field value will be shown as `*`(s) to the operator -->
<input class="sm_cobrowsing_masked_field last_name_class" type="text" name="last_name" />
<input type="submit" value="Submit" />
</form>
```
To prevent a field value to be shown to the operator during observation or engagement add the class `sm_cobrowsing_masked_field` to the html elements.

### Disable elements to the operator

```
<form action="action" method="get">
First name:
<!-- The operator can see the field and its value but he/she can not mofidy the field value -->
<input class="sm_cobrowsing_disabled_field" type="text" name="first_name" />
Last name:
<!-- The operator can see the field and its value but he/she can not mofidy the field value -->
<input class="sm_cobrowsing_disabled_field last_name_class "type="text" name="last_name" />
<input type="submit" value="Submit" />
</form>
```
To disable an element so the operator can not interact with it during an observation or engagement add the class `sm_cobrowsing_disabled_field` to the element(s).

## Contact Operator Button

```
<div class="salemove-button">
    <a href="javascript:void(0);" class="salemove-button-inner">
        <div class="salemove-button-content">
            <div class="salemove-button-ico-content">
                <div class="salemove-ico-wrapper">
                    <div class="sm-ico-voice"></div>
                </div>
            </div>
            <div class="salemove-text-wrapper">
                <div class="salemove-text">Speak with an Expert!</div>
            </div>
        </div>
    </a>
    <style>
        /* #3582FA - hover background color, #444444 - regular text color, #F4F4F4 - regular background color */
        .salemove-button .salemove-button-inner {
            width: 188px !important;
            height: 39px !important;
            font-size: 11px !important;
            border: 1px solid #3582FA !important;
            background-color: #F4F4F4 !important;
        }
        .salemove-button .salemove-ico-wrapper {
            background-color: #3582FA !important;
        }
        .salemove-button .sm-ico-voice {
            color: #F4F4F4 !important;
            font-size: 2.2em !important;
        }
        .salemove-button .salemove-text {
            color: #444444 !important;
            font-size: 1.36em !important;
        }
        .salemove-button > a:hover {
            background-color: #3582FA !important;
        }
        .salemove-button > a:hover .sm-ico-voice {
            color: #3582FA !important;
        }
        .salemove-button > a:hover .salemove-ico-wrapper {
            background-color: #F4F4F4 !important;
        }
        .salemove-button > a:hover .salemove-text {
            color: #F4F4F4 !important;
        }
    </style>
</div>
```
A Contact Operator Button is an element in the web page that when clicked on it opens the `media-selection` modal. To add a Contact Operator button can be a `div` or `span` element with the class `salemove-button`.

The default look and feel of the button is as follows:

```
TODO Add image
```

The button can be configued by means of the SaleMove JS-SDK -- Link to the SDK Docs). When using the SaleMove JS-SDK to configure the Contact Operator Button three things can be configured:

|Parameter|Type|Description|
|---------|----------|------|
|`withOperatorsHtml`| `string` |Look and feel when there are no operators online to handle the call|
|`withoutOperatorsHtml`| `string` |Look and feel when there are operator online to handle the call|
|`withoutOperatorsCallback`| `function` |A callback fired in case the visitor clicks on the Contact Operator Button and there are not operators online to handle the call|

```
sm.getApi().then(
  function(salemoveApi){
    console.log("I got the api!", salemoveApi);
    salemoveApi.setupContactOperatorButton({
      withOperatorsHtml: "<img src='/my_contact_operator_img.png'>",
      withoutOperatorsHtml: "<img src='/no_operators_around_img.png'>",
      withoutOperatorsCallback: function(){
        console.log("You can include here any business logic you need")
        alert("There are no operators around!")
      }
    });
  },
  function(err){ console.log("An error occured: ", err)}
);

```

```
Add image of how it looks like
```

## Custom Contact Operator Widget
```
<!--
The link opens the media selection modal when the visitor clicks on it
-->
<a data-sm-show-media-selection-on="click" href="javascript:void(0);">
  Start a call!
</a>
...
<div data-sm-show-media-selection-on="dblclick">
  <h3>
    Double-click me to start an engagement!
  </h3>
</div>
```
It is possible to instrument any html element in the webpage to open the `media-selection` modal. To set an element to behave as a Custom Operator Widget add the attribute `data-sm-show-media-selection-on` with a string value with the name of the event that will trigger the `media-selection` modal. As an example, if the `media-selection` modal should be open on a `double-click` event on an `div` then such a `div` should look like `<div data-sm-show-media-selection-on="doubleclick"></div>`. The following [DOM event](http://www.w3schools.com/jsref/dom_obj_event.asp) are supported.

Notice that this type of widget can not be configued using the SaleMove JavaScript SDK.

## Hotlinks

A Hotlink is a URL with a hash at the end. The Hash at the end of the URL describes an action that is triggered when the visitor loads such a URL. A Hotlink follows the pattern `http://[Client Domain]#[Action]. As an example if the visitor laods the Url `https://finantialadvisor.com#sm_show_media_selection` the media selection will be open when the visitor loads the `finantialadvisor.com` website.

### Open Media Selection Dialog
```
<!--
With site address:      http://www.site.com
The ‘hotlink' would be: http://www.site.com#sm_show_media_selection
-->
...
<a href='http://www.site.com#sm_show_media_selection'>...</a>
...
```
To open the media selection dialog as soon as the page loads add the hash `#sm_show_media_selection` `URL-hash`. A typical use case for this action is to open the `media-selection` dialog inmediately after the visitor clicks on a link and navigates to a new page.

### Expand Reactive Tab
```
<!--
With site address:      http://www.site.com
The 'hotlink' would be: http://www.site.com#sm_show_reactive_tab_20_seconds.
-->
...
<a href='http://www.site.com#sm_show_reactive_tab_20_seconds'>...</a>
...
```
To expand the Reactive Tab for few seconds as soon as the page loads add the has `sm_show_reactive_tab_X_seconds` where `X` is the number of seconds that the reactive tab should be expanded to the visitor. As an example if the visitor loads the Url `https://finantialadvisor.com#sm_show_reactive_tab_20_seconds` the Reactive Tab will be expanded and shown to the visitor for `20` `seconds`. A typical use case for this action is to open the `operator selector` inmediately after the visitor clicks on a link and navigates to a new page.

### Show Notification & Save Visitor Information

```
/* Show notification and save visitor's contact information */
sm_show_notification?(attribute=value[&attribute=value]*)
```

```
/* Show notification with a specific message and save visitor's contact information*/
sm_show_notification?message=message-value&(attribute=value[&attribute=value]*)
```

Show notification and save visitor's contact information
```
sm_show_notification?name=visitor+name&phone=56567775&email=visitor@email.com&note=visitor+note&custom_attributes[attribute1]=attribute1+value&custom_attributes[attribute2]=attribute2+value
```

This composed action updates the visitor's information and shows a desktop notification to the online operators notifying about the presence of the visitor. This action hash patter is as follows:


Show notification with a message and save visitor's contact information

```
sm_show_notification?message=some+message&name=visitor+name&phone=56567775&email=visitor@email.com&note=visitor+note&custom_attributes[attribute1]=attribute1+value&custom_attributes[attribute2]=attribute2+value
```

The fields that can be updated by means of this action are: name, email, phone, notes and custom attributes. Notice that the custom attributes is a collection of attributes and are encoded in the URL as `custom_attribute[attributeName]=attributeValue`.

Multiple parameters are separated by ampersand `&` symbol. If a field value contains spaces they must be replaced with `+` or `%20` symbols. The `+` or `%20` signs will be replaced with spaces automatically by the SaleMove's backend. If some or all contact information parameters are ommited the ommited fields' values will not be updated.

A typical use case for this action is to notify to operators about the online presence of high profile visitors. If there is some information about the visitor that is already known then that information can be pushed into SaleMove so it is shown to the operators. Later, this information can be used by the operators to provide the right information and experience to such high profile visitors.


