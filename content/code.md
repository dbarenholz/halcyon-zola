---
title: "About"
---

This page is a full visual testbed for your code styles.

Use this inline token sample in a paragraph: `const answer = 42;` and another one `map.get("key")?.trim()` to verify inline code color, border, radius, and spacing.

Use inline math-ish tokens too: `x += y * 2`, `A::new()`, `foo.bar?.baz`, `snake_case`, and `camelCase`.

And some markdown:

- Bold: **bold**
- Italic: _italic_
- Both: **_both_**

```md
# header
1. Bold: **bold**
2. Italic: _italic_
3. Both: **_both_**
```

```md,linenos
# header
1. Bold: **bold**
2. Italic: _italic_
3. Both: **_both_**
```

## Plain / Text

```text,linenos,hl_lines=2
plain-text-line-1
plain-text-line-2
plain-text-line-3
```

## Bash / Shell

```bash,linenos,hl_lines=2-3
#!/usr/bin/env bash
set -euo pipefail
name="halcyon"
echo "hello ${name}"
for f in *.md; do
    printf "%s\n" "$f"
done
```

## JSON

```json,linenos,hl_lines=3
{
    "name": "halcyon-zola",
    "private": true,
    "version": "0.1.0",
    "scripts": { "build": "zola build" }
}
```

## TOML

```toml,linenos,hl_lines=4
base_url = "https://example.com"
compile_sass = true
build_search_index = false

[extra.halcyon]
default_theme = "dark"
```

## YAML

```yaml,linenos,hl_lines=4
site:
    title: Halcyon
    nav:
        - label: About
            path: /about/
```

## CSS / SCSS

```scss,linenos,hl_lines=2 8-9
$accent: #ffcc66;
:root {
    --halcyon-accent: #ffcc66;
}

.button {
    color: var(--halcyon-accent);
    border: 1px solid color-mix(in hsl, black, white 15%);
    &:hover { opacity: 0.9; }
}
```

## JavaScript

```javascript,linenos,hl_lines=3-4
    const storageKey = "halcyon-theme";
    const body = document.body;
    const toggle = document.querySelector("[data-theme-toggle]");

    // TODO: Use lucide icons instead of "D" and "L" text.
    /**
     * Updates the toggle button text and aria-label based on the current theme.
     * 
     * @param {String} theme the theme name, one of "light" or "dark"
     * @returns 
     */
    const updateToggleText = (theme) => {
        if (!toggle) {
            return;
        }
        const isDark = theme === "dark";
        toggle.textContent = isDark ? "D" : "L";
        toggle.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
    };

    /**
     * Applies the given theme by updating the body classes and data attributes, and updating the toggle button text.
     * 
     * @param {String} theme the thene name, one of "light" or "dark"
     */
    const applyTheme = (theme) => {
        body.classList.remove("light", "dark");
        body.classList.add(theme);
        body.dataset.theme = theme;
        updateToggleText(theme);
    };
    // Get from local storage
    const saved = localStorage.getItem(storageKey);
    if (saved === "light" || saved === "dark") {
        // If it's a valid theme, apply it.
        applyTheme(saved);
    } else if (body.classList.contains("light")) {
        // Otherwise, try to match on body.light
        updateToggleText("light");
    } else {
        // Default to dark if no preference is found.
        updateToggleText("dark");
    }

    // Listen for clicks on the toggle button to switch themes.
    if (toggle) {
        toggle.addEventListener("click", () => {
            const next = body.classList.contains("dark") ? "light" : "dark";
            applyTheme(next);
            localStorage.setItem(storageKey, next);
        });
    }
class ThemeToggle {
    constructor(root = document.body) {
        this.root = root;
    }

    toggle() {
        this.root.classList.toggle("dark");
    }
}
```

## TypeScript

```ts,linenos,hl_lines=1 6
type NavItem = { name: string; path: string };

const nav: NavItem[] = [
    { name: "About", path: "/about/" },
    { name: "Blog", path: "/blog/" },
];

const first = nav.at(0)?.name ?? "none";
```

## Python

```python,linenos,hl_lines=2 7
from dataclasses import dataclass

@dataclass
class Post:
        title: str
        tags: list[str]

def render(post: Post) -> str:
        return f"{post.title} ({len(post.tags)})"
```

## Rust

```rust,linenos,hl_lines=1 6-7
#[derive(Debug)]
struct Post {
        title: String,
}

impl Post {
        fn new(title: &str) -> Self {
                Self { title: title.to_string() }
        }
}
```

## C++

```cpp,linenos,hl_lines=3
#include <string>

template <typename T>
T add(const T& a, const T& b) {
    return a + b;
}
```

## SQL

```sql,linenos,hl_lines=2
SELECT id, title
FROM posts
WHERE published = true
ORDER BY created_at DESC;
```

## Diff

```diff,linenos
--- a/old.txt
+++ b/new.txt
@@ -1,3 +1,4 @@
-old line
+new line
 unchanged
+added line
```

## GraphQL

```graphql,linenos,hl_lines=2 6
query PostBySlug($slug: String!) {
    post(slug: $slug) {
        title
        tags
    }
}
```

## HTML

```html,linenos,hl_lines=2-3
<article class="post-card">
    <h2 data-kind="title">Hello Halcyon</h2>
    <p>Theme test block with <code>inline</code> sample.</p>
</article>
```
