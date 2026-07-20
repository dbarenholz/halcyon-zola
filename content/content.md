---
title: "Content"
---

This page showcases how markdown content is rendered. It can be used as a test page for modifying the theme's styles (e.g. to verify light and dark mode works, or to really try and make that blockquote look pretty). This paragraph is generated using plain text in markdown. Let's get to some headers, shall we?

## I'm a header

That's a H2. Since the title of the page is treated as H1, it's good practise to never use it in your source.

### I'm a smaller header

#### I'm even smaller

##### I'm the smallest header

###### The above header is lying!

That's enough headers for now.

## Basic Markup

Words can be **bold**, _italic_, or **_both_**[^1]. We can also have ~~strikethrough~~ text[^2]. Inline codeblocks[^3]? `hi! it's me!`. We've also got math for you, $f(x) = \int_{-\infty}^\infty \hat f(\xi)\,e^{2 \pi i \xi x}\,d\xi$. And of course, links: [Zola](https://www.getzola.org/), [Halcyon](https://halcyon-theme.netlify.app/), and [Lucide](https://lucide.dev/). Markdown[^4] also[^4] allows[^4] you[^4] to[^4] link[^4] to[^4] a[^4] header[^4], so [here's the smallest one above](#the-above-header-is-lying). Clearly, footnotes exist too.

## Blocks: Lists [^5]

Here's what lists look like. First, unordered lists:

- Item 1
- Item 2
  - Nested 1
    - Nested nested 1
      - Nested nested nested 1
        - Nested nested nested nested 1
        - No more nesting, I swear!
    - Nested nested 2
  - Subitem 2
- Item 3

Next, ordered lists:

1. First item
2. Second item
    1. Subitem 1
        1. Subsubitem 1
        2. Subsubitem 2, I thought you said no more nesting though?
    2. Subitem 2
3. Third item

And finally, task lists:

- [ ] do this
- [x] and this
  - [ ] but then first this one
  - [ ] and this one
- [ ] do this

## Blocks: quotes, and callouts

> Do note that blockquotes look pretty nice. Right?

But if you don't like it, you can use callouts (GitHub style alerts) instead:

> [!NOTE]
> A note.

> [!TIP]
> A tip.

> [!WARNING]
> A warning.

> [!CAUTION]
> A caution? That's not something I'd commonly see, but sure.

> [!IMPORTANT]
> This one is important!

## Blocks: code

An `md` codeblock.

```md
This is a `code block`! It has the **markdown** syntax highlighting applied. This line is very long so you can see how line wrapping works in code blocks.
```

Notice how we don't do any line wrapping -- you stay in control of the code. Zola supports a few flavours of codeblocks, so if you want linenumbers, add `linenos` to the codeblock info string:

```md,linenos
This is a `code block`! It has the **markdown** syntax highlighting applied, and also linenumbers.
This is a second line, a newline was placed deliberately to create it.
No lists are complete if they're not $3$ long.
```

You can also highlight certain lines. By adding `hl_lines=2` to the info string we can highlight the second line.

```md,linenos,hl_lines=2
This is a `code block`! It has the **markdown** syntax highlighting applied, and also linenumbers.
This is a second line, a newline was placed deliberately to create it.
No lists are complete if they're not $3$ long.
```

More details on codeblocks in the [Zola documentation](https://www.getzola.org/documentation/content/syntax-highlighting/#annotations).

## Blocks: Tables

Markdown tables look like this:

| Letter | Number | Smiley |
| --- | --- | --- |
| A | 1 | 🙂 |
| B | 2 | 🙃 |
| C | 3 | 😎 |

We can also play with alignment:

| Left align | Center align | Right align |
| :--- | :---: | ---: |
| Left | Center | Right |
| A | 1 | 🙂 |
| B | 2 | 🙃 |
| C | 3 | 😎 |

[^1]: Hi!
[^2]: Footnotes too!
[^3]: Footnotes **can** _also_ `contain` $\text{ certain }$ markdown styling.
[^4]: Nothing special here, just testing a very long footnotes to see how it shows up when using a mobile or other device that doesn't have the widest viewport. You know, cause it's useful to test these things.
[^5]: Footnotes also work in headers.