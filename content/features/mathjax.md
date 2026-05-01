---
title: "MathJax"
date: 2026-05-01
description: "Explanation how MathJax is supported in Halcyon, allowing you to include mathematical notation in your content using LaTeX syntax."
taxonomies:
  tags: ["feature", "mathjax"]
---

Halcyon has built-in support for MathJax, which allows you to include mathematical notation in your content using LaTeX syntax. I personally heavily use math notation in Obsidian, so I wanted to make sure that this feature was supported in Halcyon as well.

## The Sad

Zola does not have support for MathJax on _generation_ side of things. So we have to "patch" the HTML directly, or write some sort of preprocessor that is completely separate from the `zola` binary. For now, I've opted for the former, but eventually I'd like to have some form of preprocessor, either Rust based or JS based, that we can use to preprocess _before_ Zola does its thing.

## The Good

Client-side MathJax support isn't necessarily hard to add to a site. You have to include the MathJax script through CDN in your `<head>`, and have an accompanying script that does configuration.

For the Halcyon theme, the configuration is done in `static/js/mathjax.js`. See [the mathjax documentation](https://docs.mathjax.org/en/stable/web/start.html#configuring-mathjax) on how this configuration works. The interesting part is that we have to do some work to ensure that math is properly rendered when `\\` is used, which Zola interprets as an escaped backslash. Clearly, directly passing that to e.g. `\begin{align}` or simimlar won't work, as we expect `\\` there for linebreaks!

To fix this, we need to replace all instances of `\` in the HTML with `\\`, but only for math content. The mathjax configuration allows me to call a function before math is rendered. Said function -- `fixCollapsedNewlines` -- uses a [`TreeWalker`](https://developer.mozilla.org/en-US/docs/Web/API/Document/createTreeWalker) to get text nodes in the page, ignoring when the parent node is e.g. `<script>` or `<code>`, and ignoring if the text node doesn't include `$$` -- which is the syntax for math. The nodes left over are indeed math equations, and we can safely replace `\` with `\\` in those nodes.

$$
\begin{align*}
    E &= m\cdot c^2 \\
    m \cdot c^2 &= E
\end{align*}
$$

As can be seen, the above renders, so our replacement works. It's done with the functions below (comments stripped to save space, but you can see the full code in `static/js/mathjax.js`):

```js, linenos
    const normalizeDisplayMathLine = (line, index, lines) => {
        if (index === lines.length - 1) {
            return line;
        }

        return /(^|[^\\])\\\s*$/.test(line)
            ? line.replace(/\\(\s*)$/, String.raw`\\$1`)
            : line;
    };

    const normalizeDisplayMathBlock = (inner) => inner
        .replaceAll("\r\n", "\n")
        .split("\n")
        .map((l, i, ls) => normalizeDisplayMathLine(l, i, ls))
        .join("\n");

    const normalizeDisplayMathText = (text) => text.replaceAll(/\$\$([\s\S]*?)\$\$/g, (_match, inner) => {
        const normalizedInner = normalizeDisplayMathBlock(inner);
        return `$$${normalizedInner}$$`;
    });
```

> The equation shown above is made with the following notation:
>
> ```latex
> $$
> \begin{align*}
>     E &= m\cdot c^2 \\
>     m \cdot c^2 &= E
> \end{align*}
> $$
> ```
