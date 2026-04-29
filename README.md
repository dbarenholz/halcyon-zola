# zola-halcyon

A [halcyon](https://halcyon-theme.netlify.app/) inspired theme for [Zola](https://www.getzola.org/).
Initially made mostly for my own use, with [Obsidian](https://obsidian.md/) in mind.

## TODOs

- [ ] Create testpages for basic markdown things
- [ ] Create testpages for advanced markdown things and shortcodes
- [ ] Based on testpages, fix all color variables

- [x] Refactor SCSS to have a lot more smaller files, e.g. for links, headers, callouts, quotes, ...
- [ ] Refactor partials so theme switcher, mathjax, mermaid, lucide, .. are all their own partial.
- [ ] Setup config so that users can choose if they want to include above functionality, or not -- if they DONT want it, we shouldn't include CSS for it, so figure out a way for that too.

- [ ] Look at everything related to blogs -- haven't touched this yet.
- [ ] In particular, I want filterable searchable blog posts somehow.

- [ ] Figure out how to use `toc` shortcode correctly; right now only `[TOC]` works.

- [ ] Colors for non-code related things, including normal tables.
- [ ] critical look at light mode colors.
- [ ] Fix templates for actual templates -- I have neglected to actually make a normal theme, only working on fancy features
- [?] Wikilink support (in Zola Next -- will eventually be released)

- Support for Obsidian Bases.
- JS-based filtering and searching of your posts/notes.

## Acknowledgements

- <https://github.com/majodev/google-webfonts-helper/> for getting `woff2` files for fonts.
