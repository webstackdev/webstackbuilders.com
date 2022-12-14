# Notes on project stylings using SCSS

## @TODO: Use clothoid corners with border-radius: https://onotakehiko.dev/clothoid/

## @TODO: Make sure accent-color or styling for checkboxes/radio button groups is set up. Sets the colour used by checkboxes and radio buttons, as well as range fields and progress indicators. The accent colour is inherited

```scss
:root{
  accent-color : #696;
}
``

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
