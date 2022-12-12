# Theme Picker info

The theme picker works by setting CSS attribute matchers for the `data-theme` attribute to the group of sitewide CSS variables, like `--color-bg`. That way, when the data theme is changed on the root document `<html>` element, the variable values in the CSS are changed as well. This is over-ridden locally in the theme picker modal, where the `data-theme` attribute is set on individual theme item cards so the card shows that theme's colors.

The theme picker has multiple pieces:

## Client Script

`src/assets/modules/themePicker`


## Generate HTML for the Theme Picker Modal

`src/_layouts/components/themePicker/themes.njk` creates the theme picker HTML by looping through `themes`. Data is generated by `_data/themes.js`.


## Generate HTML for the Theme Picker Icon

`src/_layouts/components/themePicker/icon.njk`


## Generate `<script>` HTML tag for the document head

`src/_layouts/components/themePicker/initial.njk` this sets the `window.metaColors` global variable that is used to set a changed theme on the `<meta name="theme-color" content="CSS_VAR">` element used by the browser for UI surrounding the page like title bars


## Places theme state is stashed away:

- Set on the `data-theme` attribute for the document element

  `<html data-theme="default">`


- Meta tag with "theme-color" for setting the surrounding UI by the browser

  `<meta name="theme-color" content="#FFFFFF">`


### Theme Picker Modal Open and Closed State

- Theme switcher modal `<div>` `hidden` attribute and `is-open` class
- Theme switcher toggle button `aria-expanded` attribute


### For the theme picker's use only:

- Sets `is-active` class and `aria-checked` attribute on active theme item card
- Localstorage under THEME_STORAGE_KEY key as the string themeId of the current theme.