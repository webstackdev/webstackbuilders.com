---
title: "Useful VS Code Extensions"
slug: useful-vs-code-extensions
date: 2021-03-31
tags: ["code", "typescript"]
description: "Take your productivity to the next level with this carefully curated and tested list of the best VS Code extensions for projects using React, Express, Laravel, GraphQL, and more. Check out our greatest hits list and streamline your development workflow."
---
I spend a lot of time coding, and having an efficient setup makes spending time doing what I 💖 that much better. One side of that is bricks and mortar: a robust workstation, a large main monitor in a dual monitor setup, an ergonomic keyboard and mouse, a comfortable chair, and an airy and pleasant work environment.

The software side for me is focused on efficiency. Like most devs, I spend most of my time split between a code editor and browsers. I spent my first years in the industry using Eclipse. It had good support for the languages I was using, a convenient extension API, and worked cross-platform. But a university friend who worked for a Microsoft shop told me how much I was missing out by not using Visual Studio. And then, Redmond embraced open source and released VS Code.

## The VS Code IDE

Out of the box, VS Code is a code editor like Sublime rather than a full-fledged integrated development environment (IDE) like Visual Studio. Being "batteries included" as a full IDE is one of the selling points of Jetbrain's commercial IDEs. VS Code relies on installed extensions to provide an IDE experience. Discovering those useful extensions can be time consuming and hit-or-miss, so this article includes a list of extensions you might find useful to build out your VS Code environment as well as other tips on making the most of the VS Code editor.

## VS Code Terminology

### Command Palette

To maintain a solid developer experience (DX), VS Code is fairly restrictive on what parts of the editor UI an extension can modify. The main Menu Bar (with drop-down items like `File`, `Edit`, and `Selection`) is mostly off limits. Extensions usually provide access to their functionality in a few ways:

- From its own view in the Side Bar (see picture at top for location in the UI) or a command added to a View from another context, like the Explorer or Search view
- Based on trigger characters when typing in an editor view, like code completion when a specific term is entered in a Javascript file context such as `function`
- In CodeLens in an editor view (see below)
- From a key binding to a keyboard shortcut, in addition to the large number of built-in shortcuts ([MacOS](https://go.microsoft.com/fwlink/?linkid=832143) / [Windows](https://go.microsoft.com/fwlink/?linkid=832145) / [Linux](https://go.microsoft.com/fwlink/?linkid=832144))
- Through the Command Palette

The Command Palette is accessed through the default keyboard shortcut `Ctrl+Shift+P`, and will show the available commands and their keyboard shortcuts based on the current VS Code context. That context can be whether there is a selection in an editor window, the type of file open in the active editor window, whether the debugger is running, your operating system, and more. Extensions will include the Command Palette text to type to access the extension in their documentation.

### CodeLens

Code lens show contextual information directly above code lines in an editor view. An example is the GitLens extension, which will show you the author and how long ago that line was added to the file and offer single click access to the relevant commit. You'll want to enable code lens for VS Code if you use extensions providing them by adding `"typescript.referencesCodeLens.enabled": true` to your `settings.json` file, accessible by searching for the file name in the Command Palette or by searching for the setting in the view show by selecting `File` > `Preferences` > `Settings` from the Menu Bar.

## Profiles

One bane of developing in a variety of languages for me in the past was the need to have a large number of IDEs and code editors in my workspace. Eclipse is highly optimized for Java work, for example. Before Mono, it was hard to work in the Microsoft ecosystem without Visual Studio because the compiler for Visual C++ was built into that IDE and not available separately.

One of Microsoft's strengths has always been languages. VS Code has great support for a wide variety of languages through its extensions. The exceptions I've encountered are compiling native code for iOS and MacOS, which requires Apple's XCode IDE, and native Android development. Google provides its own IDE called Android Studio, which is built on JetBrain's IntelliJ IDEA platform as a series of plugins (the Android branded studio is free to use).

VS Code is efficient in not loading or running extensions unnecessarily. Extensions can load at startup, in the background after startup completes, when a particular language is used, or in response to some condition being met like the workspace containing a particular configuration file for an extension that provides functionality for a specific tool.

If you'd prefer to keep the extensions that are loaded distinct for different languages or frameworks, VS Code offers Profiles to do so. The editor uses its Default profile on initial startup. You can install the extensions that you use across all profiles in your default and use that as a base to copy to more specific profiles. One reason to do this might be that that you regularly use several frameworks that each have their own vendor-provided extensions, and the functionality or keyboard shortcuts for those extensions interfere with each other. Profiles each keep their own UI state, key bindings, and settings.

## A Better Default Editor

These are extensions that are useful for a variety of different languages.