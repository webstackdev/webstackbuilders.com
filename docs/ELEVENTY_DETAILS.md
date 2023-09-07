# Details About Using 11ty

## Collections

Collections use the `tag` label in YAML frontmatter to sort pages.

```njk
{%- for post in collections.post -%}
  <li>{{ post.data.title }}</li>
{%- endfor -%}
```

Each collection item has the following keys available on it:

- `inputPath`: the full path to the source input file (including the path to the input directory)
- `fileSlug`: for permalinks - inputPath filename minus template file extension.
- `outputPath`: the full path to the output file to be written for this content
- `url`: url used to link to this piece of content.
- `date`: the resolved JS Date Object used for sorting. Read more about Content Dates.
- `data`: all data for this piece of content (includes any data inherited from layouts)
- `templateContent`: the rendered content of this template. This does not include layout wrappers.

```js
let page = {
  // URL can be used in <a href> to link to other templates
  // Note: This value will be `false` if `permalink` is set to `false`.
  url: '/current/page/myFile/',

  // For permalinks: inputPath filename minus template file extension
  fileSlug: 'myFile',

  // For permalinks: inputPath minus template file extension
  filePathStem: '/current/page/myFile',

  // JS Date Object for current page (used to sort collections)
  date: new Date(),

  // The path to the original source file for the template
  // Note: this will include your input directory path!
  inputPath: './current/page/myFile.md',

  // Depends on your output directory (the default is _site)
  // You probably will not use this: `url` is better.
  // Note: This value will be `false` if `permalink` is set to `false`.
  outputPath: './_site/current/page/myFile/index.html',

  // Added in 1.0
  // Useful with `page.filePathStem` when using custom file extensions.
  outputFileExtension: 'html',
}
```

## Nunjucks Syntax for Collections

```nunjucks
{% import "components/file.njk" as file_component %}
{% for file in files %}
  {{ file_component.render(file) }}
{% endfor %}
```

## Including Markdown in Nunjucks

```nunjucks
{% renderFile "./src/_layouts/layouts/articles/snippet.md" %}
```
Notice that the Markdown tags have to be left aligned, or else they'll be interpreted as strings:
```nunjucks
    {% renderTemplate "md" %}
# I am not a real title

* I am not a real list
* I am not a real list
    {% endrenderTemplate %}
```

## Fixing  Circular Reference for Accessing Template content

From the page object you can access `content` and within a collection you can use `templateContent` to get the rendered output not including layout wrappers.

`frontMatter.content` holds the raw markdown content without the frontmatter part:

```javascript
---
pagination:
  data: collections.post
  size: 10
  alias: posts
---
{% for post in posts %}
  {{ post.template.frontMatter.content | log }}
{% endfor %}
``

### Error:

`./src/pages/home/index.njk contains a circular reference (using collections) to its own templateContent. (via UsingCircularTemplateContentReferenceError)`

One fix showed:

```javascript
-    markdownTemplateEngine: 'njk',
+    markdownTemplateEngine: false,
```

I was having the same issue with a liquid template (for rendering tags with post excerpts), so the problem seems to be universal. I also use the excerpt short code (with a custom function), so I guess the access to `templateContent` inside the excerpt function might be the culprit.

I have solved the problem (rather clumsily) with the following code snippet at the top of my excerpt function:

```javascript
function excerpt(post){
  // list of template pages that iterate over post
  const iteratingTemplates = ['./src/index.liquid', './src/tags.liquid'];
  if (iteratingTemplates.indexOf(post.inputPath)>-1) {
    return null;
  }
 // now extract the excerpt from post.templateContent
}
```

Of course this means that templates which contain lists can never have excerpts and that you have to add your specific template names to your custom excerpt function. A better approach would probably be to check somewhere in post.template if the template matches p`ost.inputPath`, preventing a post from trying to excerpt itself. But I don't know enough how 11ty works to know where to look for that information or if such an approach is even possible.