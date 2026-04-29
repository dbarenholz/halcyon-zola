---
title: "Testing"
date: 2024-12-1
---

This is a testing page.

Let's try using a wikilink in a paragraph to a page I know exists, namely itself, so [[testing|this page]] exists.
The HTML appears to simply copy it verbatim, so it turns into `[[testing|this page]]`. And if wrapped in a code block we nicely see `<code>` show up.

So, preliminary plan of attack:

- section replace of raw `[[path|link-name]]`, except when in a `<code>` tag.

Here's some tests:

- The homepage [[home|go home]].
- The [[code]] page without display.
- Nonexistent page [[chickens]].
