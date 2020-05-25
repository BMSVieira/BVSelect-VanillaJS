BVSelect - Vanilla JS
--
<p align="center">
<img width="500" src="https://bmsvieira.github.io/BVSelect/demo-template/images/BV.png">
</p>
<br>

Replaces native select elements with fully customizable dropdowns.

Even though this replaces native select options, you can still use <b>Form Submit</b>, <b>Onchange Events</b> and <b>Attributes</b> as you would with normal usage.

Demo:
-
 https://bmsvieira.github.io/BVSelect/

Features:
-
- 🔧 Fully Customizable
- 💪 No Dependencies, built with VanillaJS
- 🌎 Tested in All Modern Browsers (IE11 not Included)
- 😎 Images & FontIcons
- ⌨️ Normal Usage (Multiple Selection included)
- 🔎 Built-in Searchbox
- 🖥 Prevented Viewport Overflow

Installation:
-

1 - Include JavaScript Source.
```javascript
<script src="path/to/bvselect.js"></script>
```
2 - Include Styles.
```javascript
<link rel="stylesheet" href="path/to/bvselect.css">
```
4 - Set HTML.
```javascript
<select id="selectbox">
  <option data-separator="true"> Select Option </option>
  <option value="1"> Option 1 </option>
  <option value="2"> Option 2 </option>
  <option value="3" disabled> Option 3 </option>
  <option value="4"> Option 4 </option>
</select>
```
3 - Initilize.
```javascript
  document.addEventListener("DOMContentLoaded", function() {
        var demo1 = new BVSelect({
          selector: "#selectbox",
          searchbox: true,
          offset: true
        });
  });
```


Methods:
-

<b>Destroy:</b>
```javascript
demo1.Destroy();
```
Removes dropdown, unbinds all its events and brings back the original Select

<b>Update:</b>
```javascript
demo1.Update();
```
Updates current dropdown based on changes to the original selectbox.

<b>Get ID:</b>
```javascript
demo1.GetID();
```
Returns the ID that was generated to build dropdown, so you can add custom classes.

Settings:
-
| Name | Value | Default | Description |
| --- | --- | --- | --- |
| `width` | `px` or `%` | `100%` |  Specify the width of the main element|
| `searchbox` | `true` or `false` | `false` |  Add a search box to the list |
| `offset` | `true` or `false` | `true` | Fixes Viewport Offset |

<b>Example:</b>
```javascript
  document.addEventListener("DOMContentLoaded", function() {
        var demo1 = new BVSelect({
          selector: "#selectbox",
          searchbox: true,
          offset: true
        });
  });
```
Attributes:
-
| Name | Value | Description |
| --- | --- | --- |
| `data-separator` | `true` or `false` | Highlights an option |
| `data-img` | `Image Source` |  Adds an Image to option |
| `data-icon` | `fa fa-hashtag` |  Adds an FontIcon to option, can be used any provider as long it is identical. Images will be prioritized over icons. |
| `disabled (native)` | `disabled` |  Disables an option |

*To add FontIcons, you must include it's own sources*

<b>Example:</b>
```html
<select id="selectbox">
    <option value="##" data-separator="true" selected>Select Option</option>
    <option data-img="path/to/img.png" value="--">Cristiano Ronaldo</option>
    <option data-icon="fa fa-hashtag" value="--" >Lionel Messi </option>
    <option data-img="path/to/img.png" value="--" disabled>Neymar Jr. (Disabled)</option>
    <option data-img="path/to/img.png" value="--">Ronaldinho</option>
    <option data-img="path/to/img.png" value="--">Luis Figo</option>
</select>
```
*All CSS styles are fully customizable in order to match your style*

Frequently Asked Questions
-

<b>Is there any themes?</b>

It doesn't need themes since the CSS is fully customizable, you are able to change everything to match your style.

<b>In addition to design, what changes?</b>

Replaces the original SelectBox but you can use it as you would with a native one, OnChange Events, Attributes, Form Submit, Append/Remove Options, everything.

<b>What about Browser Compatibility?</b>

It was tested successfully in every modern browser (IE11 not Included)
