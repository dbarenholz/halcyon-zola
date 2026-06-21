---
title: "Images"
date: 2026-05-01
description: "Shows how images are used"
taxonomies:
  tags: ["feature", "images"]
---


We have a shortcode for images, namely `img`. It takes a few arguments/parameteres (see also [the Zola docs](https://www.getzola.org/documentation/content/image-processing/)):

- `path`: which image to include; does not support relative paths
- `op`: the resize operation. If unclear, set to `fit_width`, make `width` as wide as desired, and set `height` to something larger. Options are listed on the docs linked above.
- `width`: the width of the image, in pixels
- `height`: the height of the image, in pixels
- `caption`: the caption text of the image. This is placed directly in `alt` text, too.

Generally speaking, I like to use `static/img` for my own images. Zola/Tera (the templating engine used) then puts its processed images in `static/processed_images`.

On this page, to demonstrate how images work, we use an image of a duck taken from Wikipedia. For all of these (identical) duck images, note the picture was realized by Richard Bartz by using a Canon EF 70-300mm f/4-5.6 IS USM Lens - Own work, CC BY-SA 2.5, <https://commons.wikimedia.org/w/index.php?curid=6449086>.

## very large duck

The duck below is set to `scale` to a very large size. 

{{ img(path="/img/duck_wikipedia.jpg", op="scale", width=5000, height=5000, caption="5000x5000 duck") }}

## `op="scale"`

When using `scale`, it's your responsibility to not mess with the aspect ratio.

{{ img(path="/img/duck_wikipedia.jpg", op="scale", width=20, height=200, caption="20x200 duck") }}
{{ img(path="/img/duck_wikipedia.jpg", op="scale", width=200, height=200, caption="200x200 duck") }}
{{ img(path="/img/duck_wikipedia.jpg", op="scale", width=200, height=20, caption="200x20 duck") }}

## `op="fit_width"`

When using `fit_width`, the image will take as much of the width it can, without messing with the aspect ratio.

{{ img(path="/img/duck_wikipedia.jpg", op="fit_width", width=20, height=200, caption="20x200 duck") }}
{{ img(path="/img/duck_wikipedia.jpg", op="fit_width", width=200, height=200, caption="200x200 duck") }}
{{ img(path="/img/duck_wikipedia.jpg", op="fit_width", width=200, height=20, caption="200x20 duck") }}

## `op="fit_height"`

When using `fit_height`, the image will take as much of the height it can, without messing with the aspect ratio.

{{ img(path="/img/duck_wikipedia.jpg", op="fit_height", width=20, height=200, caption="20x200 duck") }}
{{ img(path="/img/duck_wikipedia.jpg", op="fit_height", width=200, height=200, caption="200x200 duck") }}
{{ img(path="/img/duck_wikipedia.jpg", op="fit_height", width=200, height=20, caption="200x20 duck") }}

## `op="fit"`

When using `fit`, the image will be fit to the smaller of the two dimensions, i.e. $\min(\text{width}, \text{height})$.

{{ img(path="/img/duck_wikipedia.jpg", op="fit", width=20, height=200, caption="20x200 duck") }}
{{ img(path="/img/duck_wikipedia.jpg", op="fit", width=200, height=200, caption="200x200 duck") }}
{{ img(path="/img/duck_wikipedia.jpg", op="fit", width=200, height=20, caption="200x20 duck") }}

## `op="fill"`

When using `fill`, it's your responsibility to have a large enough area to fill.

{{ img(path="/img/duck_wikipedia.jpg", op="fill", width=20, height=200, caption="20x200 duck") }}
{{ img(path="/img/duck_wikipedia.jpg", op="fill", width=200, height=200, caption="200x200 duck") }}
{{ img(path="/img/duck_wikipedia.jpg", op="fill", width=200, height=20, caption="200x20 duck") }}