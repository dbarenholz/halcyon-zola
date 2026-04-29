# Style structure

## Layers

### `base`

The base contains variables used elsewhere.
It defines the colours, spacing, and typography used in the theme.

### `md`

Page sources are written in markdown.
This folder dictates how each markdown element is to be rendered.

### `templates`

Every single template at `/site/templates/` has a corresponding file in here.
See table below for mappings.

| Template | SCSS module |
| --- | --- |
| `templates/partials/nav.html` | `sass/partials/templates/_nav.scss` |
| `templates/partials/toc.html` | `sass/partials/templates/_toc.scss` |
| `templates/401.html` | `sass/partials/templates/_err.scss` |
| `templates/403.html` | `sass/partials/templates/_err.scss` |
| `templates/404.html` | `sass/partials/templates/_err.scss` |
| `templates/500.html` | `sass/partials/templates/_err.scss` |
| `templates/503.html` | `sass/partials/templates/_err.scss` |

Template classes that do not currently have SCSS-backed selectors are intentionally left out until they are actively styled.

## BEM authoring with nested Sass

When writing styles, prefer BEM names while keeping nesting ergonomics with `@at-root`:

```scss
.block {
    @at-root #{&}__element {
        // element styles
    }

    @at-root #{&}--modifier {
        // modifier styles
    }
}
```

This keeps styles readable in one block while compiling to flat BEM selectors.
