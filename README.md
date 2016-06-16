Need to show a Stars rating with floating numbers (like to show `3.5` stars)?
Use this `AngularJS` directive! :)

![Screenshot](./screenshot.png?raw=true)

In a file `stars.html` you'll find a working example of using `AngularJS` and `canvas` awesomeness. With said directive you can:

1. Define the stars size -- attribute `star-radius`;
2. Stipulate how many stars you want to display -- attribute `stars`;
3. You can define the color of the 'empty star' with attribute `empty-back-color`, background color of the stars wrapper -- `back-color` and the background color of the selected stars -- `sel-color`;
4. Also you can use a two ways to define how many stars will be selected: by defining a 'fill percent' approach -- `rating-percent` attribute, or with 'stars number' -- `rating-stars` (you can use here float numbers, for example you can select `3.5` stars).

Wishing to change the rating live?

5. You can use the `rating-define` attribute to make the directive to change the rating, depending on mouse moves (`percent` value by percent and `star` value to change by full star). The `click` will "secure" the new rating.

`N.B.` If you want to use several ratings on one page, please wrap each of them into separate `controller` or isolate them other way in order not to interfere each other...

