---
title: "Feature: Navigation"
---

The Halcyon theme provides a navigation bar.
It can be used by setting `nav` under `extra` in your `config.toml`. The example below is what this demo site uses.

```toml
[extra]
nav = [
    { name = "Navigation", url = "/navigation/" },
    { name = "Features", url = "/features/" },
    { name = "Content", url = "/content/" },
]
```

This will create a navbar on the top of the page, with the specified links. It expects you to create these pages, otherwise it'll be a 404.
If you're curious what the 404 looks like, here's [a link to it](i-dont-have-this-page/).
