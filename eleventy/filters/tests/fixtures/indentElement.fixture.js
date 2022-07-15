/**
 * Fixture to run filter or shortcode to be tested using 11ty programmatic CLI
 * Universal filters, shortcodes, and other JavaScript Template Functions work
 * here and are exposed on `this`. Example providing `permalink` function.
 */

// Using `this` in an arrow function will throw an error
class Test {
  data() {
    return {
      title: 'This is my blog post title',
      // Writes to "/this-is-my-blog-post-title/index.html"
      permalink: function (data) {
        return `/${this.slug(data.title)}/`
      },
      // does not support Nunjucks as an override, Markdown only
      templateEngineOverride: '11ty.js,md',
    }
  }

  render(data) {
    return `
# ${data.title}
<h1>${this.myFilter(data.myVar)}</h1>
<p>${this.user(data.firstName, data.lastName)}</p>
<p>${this.pairedUser(`Here is some more content`, data.firstName, data.lastName)}</p>
`
  }
}

module.exports = Test

/*
A JavaScript Template Function allows you to extend your JavaScript templates
with extra functionality. If you add any Universal Filters or Shortcodes, they
will be exposed as JavaScript Template Functions.
*/

/*
// Sync JavaScript Template Function

// filename .eleventy.js
module.exports = function(eleventyConfig) {
  eleventyConfig.addJavaScriptFunction("myFunction", function(a, b) { … });
};

// Filename js-fn-example.11ty.js
module.exports = function(data) {
  return `<h1>${this.myFunction(data.a, data.b)}</h1>`;
};

// Async JavaScript Template Function

//Filename .eleventy.js
module.exports = function(eleventyConfig) {
  eleventyConfig.addJavaScriptFunction("myAsyncFunction", async function(a, b) { … });
};

// Filename js-async-fn-example.11ty.js
module.exports = async function(data) {
  return `<h1>${await this.myAsyncFunction(data.a, data.b)}</h1>`;
};

// Using filters, shortcodes, and paired shortcodes in 11ty.js files
// Any universal filters or shortcodes will also be available as
// JavaScript Template Functions.

// Filename .eleventy.js
module.exports = function(eleventyConfig) {
  // Universal filters (Adds to Liquid, Nunjucks, 11ty.js, and Handlebars)
  eleventyConfig.addFilter("myFilter", function(myVariable) { … });

  // Universal Shortcodes (Adds to Liquid, Nunjucks, 11ty.js, Handlebars)
  eleventyConfig.addShortcode("user", function(firstName, lastName) { … });

  // Universal Paired Shortcodes (Adds to Liquid, Nunjucks, 11ty.js, Handlebars)
  eleventyConfig.addPairedShortcode("pairedUser", function(content, firstName, lastName) { … });
};

//Filename universal-examples.11ty.js
module.exports = function(data) {
  return `
<h1>${this.myFilter(data.myVar)}</h1>
<p>${this.user(data.firstName, data.lastName)}</p>
<p>${this.pairedUser(`Here is some more content`, data.firstName, data.lastName)}</p>
`;
};

// JavaScript Functions (and Nunjucks, Liquid, and Handlebars Shortcodes) have access
// to Eleventy page data values without needing to pass them in as arguments.
module.exports = function(eleventyConfig) {
  eleventyConfig.addJavaScriptFunction("myFunction", function() {
    // Available in 0.11.0 and above
    console.log( this.page );

    // For example:
    console.log( this.page.url );
    console.log( this.page.inputPath );
    console.log( this.page.fileSlug );
  });
};
*/
