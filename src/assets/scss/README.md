# Notes on project stylings using SCSS

## @TODO: List

- `base/_fonts.scss` is requiring missing fonts `fonts/baloo-2-v1-latin-regular.woff2` and `fonts/baloo-2-v1-latin-500.woff2`

- Are `.bookmarklet`, or `topbanner` classes used?

## @TODO: Use clothoid corners with border-radius: https://onotakehiko.dev/clothoid/

## @TODO: Make sure accent-color or styling for checkboxes/radio button groups is set up:

Sets the colour used by checkboxes and radio buttons, as well as range fields and progress indicators. The accent colour is inherited

```scss
:root{
  accent-color : #696;
}
``

Custom stylings:

```scss
input:where([type="checkbox"], [type="radio"]){
  -webkit-appearance : none; // necessary for Safari
  appearance         : none;
  width              : 22px;
  height             : 22px;
  margin             : calc(0.75em - 11px) 0.25rem 0 0;
  vertical-align     : top;
  border             : 2px solid #ddd;
  border-radius      : 4px;
  background         : #fff no-repeat center center;
}

input[type="radio"]{
  border-radius : 50%;
}
// Active and focused state
input:where([type="checkbox"], [type="radio"]):where(:active:not(:disabled), :focus){
  border-color : #696;
  outline      : none;
}
// Disabled state
input:where([type="checkbox"], [type="radio"]):disabled{
  background : #eee;
}
// Checked state
input[type="checkbox"]:checked{
  background-image : url('checkbox.svg');
}

input[type="radio"]:checked{
  background-image : url('radio.svg');
}
```

## @TODO: Replace all :focus pseudoselectors with :focus-visible

```css
/* Focusing the button with a keyboard will show a dashed black line. */
button:focus-visible {
  outline: 4px dashed black;
}

/* Focusing the button with a mouse, touch, or stylus will show a subtle drop shadow. */
button:focus:not(:focus-visible) {
  outline: none;
  box-shadow: 1px 1px 5px rgba(1, 1, 0, .7);
}
```

## Colors

See [ThemePicker](../script/modules/themepicker/README.md) for information on colors.

## Summary of different reusable classes available in the project

### Base / Accessibility

- `sr-only`

Hide information intended only for screen readers from the rendered page. Useful for forms that don't include a label for every input, which will cause problems for screen readers.

- `sr-skip-link`

The skip link is only visible on focus.



### Base / Animations

- `.fade-in`

Half-second fade-in transition animation.



### Base / Form

- `.form`

Class with BEM classes for sign-up and web-share forms (`form__field`, `form__fields`, `form__label`, `form__input`, `form__checkbox`, `form__settings`, `form__actions`, `form__feedback`).

- `.form--signup`



### Base / Typography

- `.lead`

Used for font styling of subtitles on pages

- `.smalltitle`

Used for font styling of title in article section



### Utils / Utility

Alignment utility classes:

- `.align-center`

- `.align-right`

- `.align-middle`



### Functions / Mixins

- `getZIndexValue($layerName)`

Get numeric value for Z-index layering by name, e.g. `titlebar`, `nav`, `modal`, and `content-overlay`.

- `media-query-mobile-first($name)`

Prints a mobile first media query wrapping included content, based on the name given (e.g. `md`).

- `media-query-desktop-first($name)`

Prints a desktop first media query wrapping included content, based on the name given (e.g. `md`).

- `hyphenate()`

Control hyphenation in text blocks.

- `coverall()`

Absolute positioned with edges set to `0`

- `container-narrow()`

Container with auto margins, full width, and narrow max width. Narrow version of the `.container` class in `base/_layouts` file.

- `stretched-link()`

Effect used in `_featured` styles for article link */





