BVSelect - Vanilla JS
--
<p align="center">
<img width="500" src="https://bmsvieira.github.io/BVSelect-VanillaJS/demo-template/images/BV.png">
</p>
<br>

Replaces native select elements with fully customizable dropdowns.

Even though this replaces native select options, you can still use <b>Form Submit</b>, <b>Onchange Events</b> and <b>Attributes</b> as you would with normal usage.

Demo:
-
https://bmsvieira.github.io/BVSelect-VanillaJS/

<b>JQuery Version:</b>

https://github.com/BMSVieira/BVSelect

Features:
-
- 🔧 Fully Customizable
- 💪 No Dependencies, built with VanillaJS
- 🌎 Tested in All Modern Browsers
- 😎 Images & FontIcons
- ⌨️ Mobile Optimization & Normal Usage
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
        width: "100%",
        searchbox: true,
        offset: true,
        placeholder: "Select Option",
        search_placeholder: "Search...",
        breakpoint: 450
      });
});
```
Polyfill:
-
BVSelect uses ES6 which isn't supported in all browsers yet (especially older browsers). Some features will need to be polyfilled to be available. Use the following sources instead:
```javascript
// Polyfill Source
<script src="https://polyfill.io/v3/polyfill.min.js?features=document.querySelector%2Cdocument%2CArray.prototype.forEach%2CNodeList.prototype.forEach%2CElement.prototype.closest%2CArray.from%2Ces5"></script>

// BVSelect Polyfilled Version
<script src="path/to/bvselect.polyfill.js"></script>
```

Methods:
-

<b>Destroy:</b>
Removes dropdown, unbinds all its events and brings back the original Select.

```javascript
demo1.Destroy();
```

<b>Update:</b>
Updates current dropdown based on changes to the original selectbox.

```javascript
demo1.Update();
```

<b>Get ID:</b>
Returns the ID that was generated to build dropdown, so you can add custom classes.

```javascript
demo1.GetID();
```

<b>Set Option:</b>
Set new selected option.

| Name | Value | Description |
| --- | --- | --- |
| `type` | `byIndex` or `byValue` | Parameter |
| `value` | `string` | Value to search |

```javascript
demo1.Set({
  type: "byIndex",
  value: "1"
});
```

<b>Change:</b>
Changes dropdown's settings

| Name | Value | Description |
| --- | --- | --- |
| `placeholder` | `string` | Modify dropdown's placeholder |
| `search_placeholder` | `string` | Modify input's placelholder |
| `options` | `object` | Replaces all options in the original selectbox |

```javascript
demo1.Change({
  placeholder: "New Placeholder",
  search_placeholder: "New Searchbox's Placeholder",
  options : {
          0: {
              inner_text: 'Metallica',
              value: "met",
              disabled: false,
              separator: false,
              img: "https://img.icons8.com/color/2x/usa.png",
              icon: "fa fa-hashtag"
          },
          1: {
              inner_text: 'Megadeth',
              value: "meg",
              disabled: false,
              separator: false,
              img: false,
              icon: "fa fa-tshirt"
          },
          2: {
              inner_text: 'Slayer',
              value: "sla",
              disabled: false,
              separator: false,
              img: false,
              icon: "fa fa-hashtag"
          }  
    }
});

// Update Dropdown based on changes to the original selectbox
demo1.Update();
```

Settings:
-
| Name | Value | Default | Description |
| --- | --- | --- | --- |
| `selector` | `ID`  | `---` |  Specify ID of the element|
| `width` | `px` or `%` | `100%` |  Specify the width of the main element|
| `searchbox` | `boolean` | `false` |  Add a search box to the list |
| `offset` | `boolean` | `true` | Fixes Viewport Offset |
| `placeholder` | `string` | `Select Option` | Modify dropdown's placeholder |
| `search_placeholder` | `string` | `Search...` | Modify input's placelholder |
| `breakpoint` | `integer` | `600` | Defines the responsive breakpoint (in px) |

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
| `data-separator` | `boolean` | Highlights an option |
| `data-img` | `Image Source` |  Adds an Image to option |
| `data-icon` | `fa fa-hashtag` |  Adds an FontIcon to option, can be used any provider as long it is identical. Images will be prioritized over icons. |
| `disabled (native)` | `disabled` |  Disables an option |

*To add FontIcons, you must include it's own sources*

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

Appearance
-
This was built to fit any style and to be 100% fully customizable, so you are able to change everything in the css file.

<p align="center">
  <img width="800" src="https://i.imgur.com/oj0VAJm.png">
</p>

