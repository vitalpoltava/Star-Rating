![Logo](https://www.shareicon.net/data/128x128/2016/08/01/640324_logo_512x512.png)

The **React** version of the **Star Rating** application.

Usage example:

```javascript
<Stars radius="45" stars="4" stars-selected="2"/>
```

This will show `4` stars with `2` of them selected. Default configuration will show those in light gray background (for not selected) anf gold for selected.
However, you can select your own colours using the following attributes: `star-back-color` for not selected stars and `sel-color` for selected.

Other then pre-selecting by stars you can also pre-select by `percent`:
 
 ```javascript
 <Stars percent="50"/>
 ```
 
 This will show `5` stars (default value) with `radius` of `30px` (default value) and selected `2.5` stars (`50%` of the whole rating).
 
 User will be able to select another rating by hovering mouse over the stars (a click will define the new rating value). However, you can disable this behavior by using the `disabled` attribute, like below:
 
 ```javascript
 <Stars stars-selected="3.5" disabled="true"/>
 ```
 
 This will show `5` stars with `3.5` of those selected and any other action over the rating will be disabled.
