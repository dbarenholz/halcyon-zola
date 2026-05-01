---
title: "Home"
---

[TOC]

<!-- note that this page uses zero width spaces to display shortcodes in codeblocks -->

## The Theme

This theme is based on [Halcyon](https://halcyon-theme.netlify.app/), which is originally a color scheme for dark mode only. I've now create a light mode as well, and you can switch between light and dark mode by setting the classes `.dark` or `.light` on the `body` of the document. See the `static/src/theme-toggle.js` file how we do this.

## Features

A couple of features are added. For details, check the features in the navigation bar, but here's a quick overview:

- **Light and dark mode**, with automatic switching based on user preference.
- **Navigation bar**, fully responsive.
- Generated **table of contents** by using `[TOC]` in your markdown source.
- **Math** support using (client-side) MathJax.
- **Mermaid** diagram support, with automatic theme switching.
- Neat looking **blockquotes** and GitHub style alerts (callouts).
- Lucide **icons**, for use in your own templates.

And more!

## Installation

For details, see the [Zola documentation](https://www.getzola.org/documentation/themes/installation/), but briefly:

```bash, linenos
cd your-zola-site
git submodule add https://github.com/dbarenholz/halcyon-zola themes/halcyon
```

Then modify your `config.toml` to set `theme = halcyon`.
