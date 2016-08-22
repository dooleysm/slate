# Site Reactive Tab

A Site's reactibe tab visuals and behavior can be configured by means of the following endpoints.


## PUT `/sites/{site_id}/reactive_tab`

It updates the reactive tab visuals and behavior for the site with id `site_id`. The Operator whose API Token is used should have rigths on the site.

|Parameters|Type|Required|Description|
|----------|----|--------|-----------|
|`site_id`|`string`|Yes||
|`placement`|`string`|Yes||
|`vertical_offset`|`integer`|Yes|The vertical offset of the Reactive Tab from the bottom of the browser's viewport, expressed as a percentage. Possible values range from 0 to 100|
|`format`|`string`|Yes|Whether the Reactive Tab should contain just `text` or a `mix` of both text and icons. Possible values are `text` and `mix`|
|`size`|`integer`|Yes|The scale of the Reactive Tab as a percentage of the default size. Suggested values are between 80 and 100|
|`text`|`text`|`string`|No|The text displayed in the Reactive Tab|
|`font_size|`integer`|Yes|The size of the font used to display the Reactive Tab text. Possible values are 20, 24, and 27|
|`icon_class`|`string`|No|The icon to be shown in the Reactive Tab. Possible values are `ico-voice`, `ico-text`, and `ico-video`|
|`front_color`|`string`|Yes|The Front color of the Reactive Tab in `hex` format|
|`back_color`|`string`|Yes|The back color of the Reactive Tab in `hex` formar|
|`hover_color`|`string`|Yes|The hover color of the Reactive Tab in `hex` format|

```ruby
#!/usr/bin/env ruby
require 'rubygems'
require 'rest-client'
require 'json'

token = ARGV[0].strip
site_id = ARGV[1].strip

values = {
  front_color: '#53a0fd',
  format: 'text',
  placement: 'left',
  icon_class: 'ico-voice',
  font_size: 20,
  vertical_offset: 50,
  size:  90,
  text: "Let's talk",
  back_color:  '#ffffff',
  hover_color: '#e6e6e6'
}

headers = {
  :authorization => "Token #{token}",
  :accept => 'application/vnd.salemove.v1+json'
}
response = RestClient.put "https://api.salemove.com/sites/#{site_id}/reactive_tab", values.to_json, headers
puts response.body
```
