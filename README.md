# Calendar

Html5 calendar that looks like the default on windows 10.

Made with vanilla javascript and css

## Installation

Load the js and css file into your site. Remember to add the js script after your calendar elements.
```html
<link rel="stylesheet" href="path/to/calendar.css">
```
```html
<script src="path/to/calendar.js"></script>
```
## Usage
To create a calendar, just place the class *calendar* in a div element.
```html
<div class="calendar"></div>
```

<img  src="https://user-images.githubusercontent.com/87664764/130087564-39089723-456d-4790-b0ce-068c6ebd90fb.png" alt="standard calendar" width="200"/>

**Note:** the checked box is the current date of the user computer.

You can put as much calendars as you need in your page.

### Attributes min and max

You can use the attributes min and max to limit the range of dates your calendar can reach.

```html
 <div class="calendar" min="2021/08/16" max="2021/08/22"></div>
```
<img  src="https://user-images.githubusercontent.com/87664764/130093412-11dca0b9-6ec1-4711-a348-6b09ec5cc112.png" alt="calendar with the min and max attribute set" width="200"/>

In this calendar, the user can only select a day in the current week. Since the whole range is in the current month, the calendar won't let the user change the month that is visualized by the calendar.

You can use the value "now" in both *min* and *max* attributes to set the current date as a limit.

### Events

The calendars has a mecanism to detect user interactivity, as it could be:
+ selecting a date
+ change month
+ change year

```js
const calendar = document.getElementsByClassName("calendar")[0];

calendar.addEventListener("click", function(e){
    if(dayChange(e)){
        const day = getValue(this);
        //do something with the selected day
    }
    if(monthChange(e)){
        //do something when month change
    }
    if(yearChange(e)){
        //do somenthing when year change
    }
    
});
```
Or using jQuery

```js
$(".calendar").on("click",function(e) {
    if(dayChange(e)){
        const day = getValue(this);
        //do something with the selected day
    }
});
```

**Note:** the jQuery code will bind the event to all calendar elements, while the javascrit one will bind the event to only the first calendar.

## Language support

It has 10 different languagues by now. It automatically use the languague of your html *lang* attribute. Besides that, you can put the *languague* attribute to a calendar element to make it use that languague.
The supported languagues are:
+ en - english
+ es - spanish
+ in, id - indonesian
+ pt - portuguese
+ fr - french
+ ru - russian
+ de - german
+ zh, zh-Hans, zh-Hant - chinese
+ ja - japanese
+ ar - arabic

If the *lang* of the html tag is not supported and neither the *languague* attribute of the calendar, it will use english as default.
