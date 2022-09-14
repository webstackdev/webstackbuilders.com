---
title: 'Hello World'
slug: hello-world
date: 2021-03-31
tags: code
---

A demo of the "Page" template and kitchen sink sample of styled elements.

<!-- excerpt -->

## Full Front Matter Example:

```yaml
title: The Emergency Website Kit
slug: emergency-website-kit
date: 2021-03-31
tags: code
featured: true
image: cover.jpg
cardImage: emergency.jpg
```

# Header 1

[Link to another page](/about).

## Header 2

```js
// Javascript code with syntax highlighting.
var fun = function lang(l) {
  dateformat.i18n = require('./lang/' + l)
  return true
}
```

```ruby
# Ruby code with syntax highlighting
GitHubPages::Dependencies.gems.each do |gem, version|
  s.add_dependency(gem, "= #{version}")
end
```

### Small Image

{% asyncImageHandler 'hello-world-printf.webp', 'Hello world printf example' %}

### Large image

![Large image](https://picsum.photos/800/300)

<div class="extend">
  <video width="960" style="margin:0 auto; border: 1px solid var(--color-border);" preload controls>
    <source src="https://res.cloudinary.com/mxb/video/upload/q_auto/v1621003114/bookstore_nnn2vr.webm" type="video/webm" />
    <source src="https://res.cloudinary.com/mxb/video/upload/q_auto/v1621003115/bookstore_kkpxmt.mp4" type="video/mp4" />
  </video>
</div>

## Short Codes

{% callout "warning" %}
This demo currently only works in [Chrome Canary](https://www.google.com/chrome/canary/). Download the latest version, then enable Container Queries under _chrome://flags_ to see them in action.
{% endcallout %}

<figure class="extend">
  <img src="https://res.cloudinary.com/mxb/image/upload/v1621005967/grid_sa0gt0.png" style="border: 1px solid var(--color-border);" alt="layout schema for the bookstore with three main content sections">
</figure>

{% callout %}
Some examples using this approach:

- [EleventyOne](https://github.com/philhawksworth/eleventyone) by Phil Hawskworth
- [Supermaya](https://github.com/MadeByMike/supermaya) by Mike Riethmuller
- [Eleventastic](https://github.com/maxboeck/eleventastic) by me
  {% endcallout %}

{% signup "By the way..." %}
I'm running an email list for people interested in front-end development and static sites.
If you enjoy that kind of stuff, you can join here and I'll notify you whenever I publish a new post. No strings attached, unsubscribe anytime.
{% endsignup %}
