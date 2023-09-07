---
title: "Designing Great TypeScript Libraries"
slug: writing-library-code
date: 2021-04-15
tags: ["apiDesign", "code", "typescript"]
description: "Writing a good library means putting yourself in other developer's shoes if you're publishing publicly and not just scratching your own itch. Here we explore tips and techniques for writing better libraries in TypeScript."
---
Since Future Me is often one of the intended users of TS libraries I author, providing an outstanding developer experience (DX) is something I pay attention to. I've use a *lot* of third party libraries over time. Some make me feel like a braniac, and give me confidence in my abilities as a developer. Their APIs make sense and are clear in how I'm supposed to use them. If I have to dig into the code base for some reason, I can make sense of what I'm looking at. Other libraries make me feel like a bonehead. I hate that, and don't want to be That Person™ with libraries I author.

This article focuses on designing good APIs for library code, because that is the touch point with the greatest influence on a library's DX. Behind every good library, though, is a strong foundation that touches all the bases:

- A **comprehensive test suite** to minimize the number of bugs your code base has. Whenever a new bug is reported or found, you'll want to add a test that  would have failed before the bug was patched to make sure the package  doesn't regress in the future.
- **Readable code** so users don't have to spend excessive time studying your code base just to understand what each function does. Smaller, more focused functions and better naming conventions can go a long way in making your code easier to read and work with. Following a consistent and informative naming convention for tokens (variables, functions, etc.) helps users understand at a glance what the parts and pieces of your library are intended to do. TypeScript improves readability of code because it's clear how types move through your methods, and what's expected where.
- **Inline documentation** to improve IntelliSense output, since most of your users will work in an IDE that makes use of the TypeScript language server. Hovering over your library's imports will give types by default. You can help your users out by adding `TSDoc` comments to public exports with detailed descriptions and usage examples. Documentation eliminates wondering what a line of code does or what its intention is.
- Solid **dependency management**, avoiding dependencies on unstable and unmaintained libraries and features. References to deprecated features in dependencies should be removed at the first opportunity.
- A process for **contributions**, with easy to find guidelines for contributions and instructions on creating a local development environment.
- **Release notes** and a **changelog** detailing major API changes.

## What is a Code Library?

Let's start by defining library code. Most of my time spent coding is devoted to developing application code, with the intention of solving some particular set of business problems. The final application might offer some means for third-party code to interact with it, usually through HTTP endpoints (REST, gRPC, GraphQL, etc.) but isn't intended to be directly used by other application code.

Libraries are designed to perform a single or small range of tasks within the application. They are explicit about what they do. A tight, opinionated library with a minimal but sufficient feature set, APIs, and configuration options will provide the best developer experience to users. There should be one, and preferably only one, way of using the library (paraphrasing the *Zen of Python*).

Frameworks are a special case of code libraries. While libraries are designed to be called by application code and are not independently executable, a framework typically calls your application code. The same API design and best practices apply to both. Software Development Kits (SDKs) are sets of libraries for third-party developers to use in producing applications using a particular framework or platform, bundled in one installable package.

## Principles of API Design

I usually write my unit tests alongside code, implementing test cases as I add functionality. That means my test runner is green unless I've introduced a logic error in my code. In test-driven development (TDD), units are written first to fail before the code to implement them. TDD is a good approach to designing your library's public API so that you can target what you want your interface to look like from the user's perspective.

Having a clear and documented public API via initially failing tests will help you control your API. Don't leak types that should be kept private, and only expose things deliberately. It's easier to change things later and less likely to be abused if your public API is carefully chosen.

As you code our your design, you'll see whether the implementation fits the design. If not, then use the information you've gained from how it has to work internally to improve your public API design. The library's internal API doesn't need to match with your public API, it only needs to provide it. Public API and its implementation is a constant cycle of improvement.

The surface area of your library should be proportional. By that I mean that features and functionality added to your library should reinforce the library’s main purpose. The API should be allowed to grow along with the library, rather than adding function overloads that don't feel natural. Users will have an easier time adapting to a new function with a self-describing name than they will yet another overload on an existing method.

## The Art of Signatures

A function signature includes what input parameters are accepted and their types, the return value and its type, any exceptions that might be thrown, and class member modifiers like the  `static` modifier and access modifiers like `public`, `private` and `protected`.

### Input Parameters

If your public API uses positional parameters in its function and method signatures, you'll introduce breaking changes if you modify the signature unless you are adding optional or default parameters at the end of the parameter list. And large numbers of input parameters are unwieldy for your users to keep track of when using your API, especially when they're optional:

```typescript
const skewObject = (offsetTop?: number, offsetLeft?: number, offsetWidth?: number, offsetHeight?: number, rotateDeg?: number) => {
  ...
}

skewObject(10, 20, null, null, 90)
```

 If your API accepts more than two parameters, you'll do your users a favor by accepting an object with well-named keys for input:

```typescript
function applyFilter({array: string[], filter: callbackFn, thisArg: any}): string[] {
  ...
}
```

### Staying Flexible

If your API is likely to be called more than once with different parameters, like a setter method for protected or private properties:

```typescript
image.transformOption('crop', 50)
image.transformOption('saturation', 80)
```

An API that also accepts a dictionary, and handling both primitive parameters and mapping over object parameters in your method, will likely be more convenient for your users:

```typescript
image.transformOption({'crop': 50, 'saturation': 80})
```

### Keeping Your Options Open

One "option" to avoid the problem of having a long list of parameters is to  accept option objects, so that the parameters of the function don't change if optional parameters are added:

```typescript
function exec(command: string, options: OptionsObject) {
  ...
}
```

You can specify a default options object, and use an extend mechanism inside your function to set options as the default with overrides from the option object passed in. This way there's a central place to set defaults for users:

```typescript
function exec(command: string, options: OptionsObject) {
  const opts = Object.assign({}, ExecDefaultOptions, options || {})
  ...
}
```

### A Fluent Approach

Fluent interfaces are an object-oriented API design that chains method calls together for better readability. To implement it, we return the object instance from class methods:

```typescript
class PersonBuilder {
  constructor() {
    this.person = {}
  }

  setName(name) {
    this.person.name = name
    return this
  }

  setAge(age) {
    this.person.age = age
    return this
  }

  getPerson() {
    return this.person
  }
}

const person = new PersonBuilder()
  .setName("Tom Cruise")
  .setAge(61)
  .getPerson()

console.log(person) // { name: "Tom Cruise", age: 61 }
```

Method chaining allows code to stream through your API. It makes sense to add appropriate helper methods to help developers avoid work. Mapping out what chained methods will often follow in sequence to each other can help identify useful utility methods to consider implementing.

Adding a logging method can help users collect telemetry from a fluent API for diagnosing production problems.

## Delivering the Goods

### Pure and Simple

Javascript passes objects by reference, so input parameters that accept objects can have those objects changed outside of the function and break user expectations. Take for an example a constructor function to calculate date intervals that accepts two `Date` objects as input, and provides various chained methods to get the interval back in days, months, and years. If the input parameter `Date` objects are modified between assigning the constructor function to a variable and calling the chained methods, for example by calling `setMonth(monthValue)` on one of the input parameters, the value of the parameter inside the function will be mutated.

You can avoid this by cloning input parameter objects in the function using `Object.assign()` and working on the local copy.

### Green Lighting Your Parameters

The rule of thumb in application code is to trust your callers to pass your function valid parameters. A type system like TypeScript and integration tests should surface any coding errors during development. But library code is external to your application, and shouldn't trust its callers. Input parameters should be validated at function entry during execution, like making sure a start date occurs before an end date and that input values are defined and have the correct type.

Throw on invalid input, and include meaningful debug information in your exception. It's the responsibility of application code to handle the error message appropriately given security concerns. This applies to fluent interfaces with respect to the passed object (`this`) in chained methods. Chained objects will continue to execute through the whole chain, even if something along the way returns a result where it doesn't make sense to continue, like null.

## Empowering Power Users

A well designed API resists bloating its surface area, and offers just enough configuration to users to cover the majority of use cases. Libraries with tens of configuration options for each function are unnecessarily difficult to use. To allow those users that need flexibility to implement edge-cases can provide entry points to extend the core and the API itself of your library.

### Accepting Callbacks

Accepting an optional callback functions alongside a default callback implementation gives your users a lot of flexibility with minimal disruption for those who don't need it. JavaScript's built-in library makes extensive use of this pattern. Allowing users to pass a callback for mapping over array elements or object key/value pairs are one common use case.

Callback parameters should be limited per function or method, especially with fluent interfaces. If providing enough flexibility for configuration in a given API points to accepting multiple callbacks in a single signature, it's likely your API will benefit from breaking that function or method up.

Make sure you’re consistent about the context in which callbacks are executed in (where `this` points to).

### Plugin Systems

Wouldn't it be great if users could just subscribe to your API, and be able to extend your API as they need during the execution life cycle of its features? Providing an eventing system for users to register event listeners on provides a lot flexibility for your library's users.

JavaScript doesn't have a consistent event bus across platforms. In the browser, it uses event delegation tied to DOM nodes. Node has a built-in Events module, but it has some limitations. Event handlers are synchronous and blocking. Errors within event emitters are treated as special cases by Node, breaking user expectations.

There are several very popular eventing libraries in the TypeScript ecosystem, with options for both synchronous and asynchronous event handling logic. Follow conventions for naming lifecycle events (like `onBeforeStart`, `onStart`, and `onAfterStart`). Document the data payloads provided to handler functions. Sindre Sorhus's [Emittery](https://www.npmjs.com/package/emittery) library has a well considered API and provides generics to strongly type the list of events and data passed to their event listeners.

### Extending by Proxy

You can also let your library's users extend your API by proxying specific missing methods to a user-provided callback. This technique allows you to avoid exposing classes for users to extend, which can result in brittle inheritance hierarchies that break on minor version upgrades in your library.  This approach uses reflection and JavaScript's `Proxy` object. The exact implementation of the proxy depends on how you want the user to be able to extend your API. Keith Cirkel has a [good article](https://www.keithcirkel.co.uk/metaprogramming-in-es6-part-3-proxies/) on implementing the technique.

## Documentation

We all know writing good documentation for our code is an import factor in that code's usability to others. And also that generating and maintaining good documentation is hard. Docs that are separate from code easily fall out of sync as changes are merged into a code base. For that reason, tools like [TypeDoc](https://typedoc.org) that generate documentation from TSDoc blocks and type annotations are great.

TypeDoc and similar tools focus on generating documentation for function and class signatures. Great docs go further, and also overcome some limitations of TSDoc generation tools. These include:

1. Code examples help in explaining how your library API works, and help your users avoid confusion.
2. Associated documentation like library overviews, architecture, and event system and flow diagrams.
3. Function overrides are difficult to express in generated documentation.
4. Function option object parameters that have complex behavior, where multiple options work together, are difficult to document in documentation blocks.
5. TSDoc has a `@callback` tag that allows you to add a description of callback functions used for input parameters, and also to document the callback's inputs, return types, and exceptions they may throw. But there's no way to add a description of the behavior of a default callback function in comments and have them picked up in the generated documentation.
6. Generated functions can be documented with TSDoc's `@name` tag when the functions are known beforehand. There's no clean way to document dynamically generated functions like getters and setters created automatically for external JSON or GraphQL schemas.

Doxygen, a venerable and widely used documentation generation tool, is now turning a quarter century old. Facebook released Docusaurus five years ago, a tool to generate static documentation websites using React and MDX (a version of Markdown that allows using JSX inside the text file, for example to include partials). Docusaurus supports light and dark themes and is highly configurable.

Markdown has become the de facto preferred markup format for JS/TS developer documentation, partially driven by NPM and hosted repositories like GitHub's automatic display of `README.md` files for repos. It's a convenient format, highly portable, and has great tooling.

My preference for project documentation is Docusaurus with TypeDoc, using a [plugin](https://www.npmjs.com/package/docusaurus-plugin-typedoc) that generates static TypeDoc pages in Markdown with frontmatter as part of the Docusaurus build. It's an incredibly flexible system and addresses all of the issues with documentation code generator-only approaches.

## Maintainence

Whether your library is internal or open source, you'll help your users by having a clear workflow for reporting issues and sending pull requests to the project. You should have a contributing guideline detailing how to build a local development environment and how to submit PRs. Having a continuous integration pipeline set up to automatically test contributions, and a continuous deployment pipeline to push those contributions to production once they're accepted, will benefit both your project maintainers and users.

I also have some general advice to improve maintainability of your library over time:

- **Maintain stability.** Catch breaking changes before they ship and release a new version of the API if necessary. A robust testing suite makes this task easy.
- **Maintain consistency.** Your library will be most useful to users if the API stays internally consistent across its entire surface area. Changing parameter names across versions makes searching for help difficult. Keep the same naming  conventions and data handling consistent throughout your API.
- **Be picky about feature requests.** You should have a good idea of what features would fit the scope of your library, and what features would bloat your library or make long-term maintenance difficult. Make your library's criteria for accepting new features explicit in your documentation.
- **Avoid leaking implementation details.** If you fail to expose types your users need in your public API (forcing users to copy and past them into their own code), or provide enough extensibility to make the library work for their use cases, the underlying implementation details of your library can become part of the API itself. You can set the `exports` key in your `package.json` file so that only the specified paths can be accessed from the package alongside paying attention to your user's use cases.
- **Be careful with exposing enums in your public API.** Adding new variants to an enum is a breaking change. They should only be exposed if no new variants can be introduced *by definition* of what is being represented and they only hold simple data.
- **Avoid making classes the public API.** Users might might use the method names you want to use in future versions. Users might override your methods without calling `super()`, leading to breaks on minor version updates. If you do expose classes in your public API, require derived classes to override methods completely instead of requiring a `super()` call.
- **Avoid deep inheritance hierarchies.** If you do expose classes in your public API, don't inherit more than once in your internal classes. Instead of creating a class hierarchy, consider creating several factory functions. You can implement a strategy pattern, with a strategy object passed to each factory function in sequence to control their behavior. The important part in this approach is to keep inputs and outputs explicit at every step (the law of monads).
- **Prefer duck typing for input validation.** Instead of using `instanceof` checks of parameters accepting class objects, assert the existence of the methods you plan to use. This eliminates issues with class identity across different execution contexts like web workers, VMs, and iframes, and makes userland extensions easier.
- **Use generics and type inference to improve ergonomics.** Well crafted generic types can make it a lot cleaner to use your API so that callers don't have to do many type conversions or housekeeping operations themselves.

## Wrapping Up

APIs are forever, though they often grow organically in a project until we recognize that we have some piece of functionality that really isn't application code, and should be treated as a library.  That's one reason I prefer to take advantage of Yarn's `workspaces` feature and create a `packages` directory on the same level of an application's `src` directory, and centralize my utilities and helpers in named packages there. I don't have to publish them, but it avoids my projects being littered with `lib`, `util`, and `helpers` directories close to the code those utilities are supporting. It's a simple technique to make me think a little bit more critically about my code organization and structure.
