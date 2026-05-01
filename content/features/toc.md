---
title: "Table of Contents"
date: 2026-05-01
description: "Generate table of contents using `[TOC]` syntax."
taxonomies:
  tags: ["feature", "toc"]
---

From Typora days I've become accustomed to generating a table of contents with `[TOC]` syntax. This is a feature that Zola doesn't have built-in support for, but it's easy enough to add since Zola _does_ keep track of the actual headings in the page.

[TOC]

Even if the [TOC] string is placed inline here, it is shown on the top of the page. And, as you can see, including it a second time as I've done, doesn't generate a second one or errors out. Below are some unused headers so you can see how everything works.

## Hello World

## Headers are nice

### We can do subheaders too

#### This one is too deep, so isn't shown!

### This one will be shown again

## You can use `code` in headers

This gets rendered in the page, and not in the TOC, as one would expect.

## And if you really want to, $math$ too

It gets rendered in the page, and the TOC. I should change this so it's only in the page, probably. But who is using math in headers?

## {% icon(c="var(--halcyon-palette-salmon)") %}thumbs-down{% end %} Icons

Technically work, but not in TOC. This uses the icon shortcode!

## Before [links](https://example.com) is fine but after ...

`links` in the header above is a distinct link. You shouldn't put links in headers -- it will break things.
