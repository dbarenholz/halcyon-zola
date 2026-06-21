# halcyon-zola

A [halcyon](https://halcyon-theme.netlify.app/) inspired theme for [Zola](https://www.getzola.org/).
Initially made mostly for my own use, partly with [Obsidian](https://obsidian.md/) in mind.

## Features

The Halcyon theme is still new, and may change as I discover new things I want it to have. For now, here's what it does:

1. Light and dark mode, JS-based switching using `color-scheme`.
2. MathJax support for math rendering, both inline and display. This is (until I find a better way) done client side.
3. Mermaid diagram support, also client side. Mermaid diagrams automatically switch between light and dark mode by re-rendering when the theme changes.
4. Table of contents "support" (it's really rather hacky). It works by looking for the `[TOC]` string in the markdown content, and replacing it with a div that gets filled with the actual table of contents by JS.
5. Wikilink "support" (also rather hacky). This is done by looking for `[[` and `]]` in the rendered HTML content after-the-fact, and replacing it with a link to the corresponding page. If the page doesn't exist, it naturally is 404. This is bad for SEO.
6. Stylable Lucide icons. All icons are included in the theme. You can use the `icon` shortcode to include them in your content, though generally speaking you probably want to use them in custom templates instead.

## Future work

Certain choices have been made when creating this theme, mostly being due to not wanting users to depend on a custom Zola fork.

**Prerendered math**:

This depends on Zola support either some sort of preprocessor, or custom scripts e.g. `./fix-math.sh && zola build` or similar pattern. Depending on such script is not the intent of this theme, and is left to users to make (client-side mathjax of course still works).

**Prerendered mermaid**:

Again, we depend on Zola having some sort of preprocessor or you'd need a custom script that creates SVG files in dark and light mode, which then get loaded based on theme. Again, such script (e.g. `./fix-mermaid.sh && zola build`) is not the intent of this theme, and is left to users to make.

**Expose settings**:

Right now, many things are hardcoded in the theme. It would be _very_ nice to expose certain things in the `config.toml` of consumers of the theme, but for now I guess it works for me.

**Searching through posts**:

I need to have a good look once I port my site over to use this theme to see how I want to implement this. I want to be able to filter based on categories, as well as search through the content of posts.

**Wikilinks**:

Right now Zola doesn't support wikilinks. My hope is that this will be added in the future. The current implementation is hacky and not the best for SEO. The intent is to replace it with native support once Zola supports it, but for now this is what we have.

**Obsidian compatibility**:

I want to be able to use Obsidian to author posts for my own site, for which I wrote this theme. This means that I want wikilinks, math, mermaid diagrams as I currently have. But also, I'd want Properties to work, as well as Bases. This is a long-term goal, and may never be realized when sticking to vanilla Zola, possibly requiring a custom fork. It'd be nice if Zola supported some sort of plugin system though!

## Known issues

- I'm doing something wrong with the `toc` shortcode, and it currently doesn't work. Please use `[TOC]` instead.

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details. Licenses for the fonts used can be found in the `static/fonts/licenses` directory. Lucide icons are either ISC or MIT licensed, see more [here](https://lucide.dev/license).
