**UPD:** **Angular2** star rating app added.

Need to show a Stars (or other graphic items) rating with floating numbers (like to show `2.5` stars or `3.75` circles)?
Use this `AngularJS` directive! :-)

![Screenshot](./screenshot.png?raw=true)

In a file `stars.html` you'll find a working example of using `AngularJS` and `canvas` awesomeness. With said directive you can:

* Define the stars size -- attribute `star-radius`;
* Stipulate how many stars you want to display -- attribute `stars`;
* You can define the color of the 'empty star' with attribute `empty-back-color`, background color of the stars wrapper -- `back-color` and the background color of the selected stars -- `sel-color`;
* Also you can use a two ways to define how many stars will be selected: by defining a 'fill percent' approach -- `rating-percent` attribute, or with 'stars number' -- `rating-stars` (you can use here float numbers, for example you can select `3.5` stars).
* Do not like stars? Prefer circles? Provide your own function to draw the rating element you want via `custom-figure-drawer` attribute.

Wishing to change the rating live?

* You can use the `rating-define` attribute to make the directive to change the rating, depending on mouse moves (`percent` value by percent and `star` value to change by full star). The `click` will "secure" the new rating.

`N.B.` If you want to use several ratings on one page, please wrap each of them into separate `controller` or isolate them other way in order not to interfere each other...

