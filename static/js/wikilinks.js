/**
 * Wikilinks support for Zola, Obsidian-style [[page]] and [[page|display text]] syntax.
 *
 * This script transforms wikilink syntax in text content into proper anchor tags,
 * while avoiding transformation within code blocks, pre tags, and other special elements.
 *
 * Link resolution:
 * - [[page-name]] → /page-name/
 * - [[blog/article]] → /blog/article/
 * - [[page|Custom Text]] → anchor with custom display text
 */
(() => {
    const skippedParentTags = new Set(["SCRIPT", "STYLE", "CODE", "PRE", "TEXTAREA"]);

    /**
     * Converts a page name/path to a URL slug.
     * Handles both simple names and paths with slashes.
     * 
     * @param {string} pageName - The page reference (e.g., "about" or "blog/my-post")
     * @returns {string} - The URL slug (e.g., "/about/" or "/blog/my-post/")
     */
    const pageNameToUrl = (pageName) => {
        const slug = pageName
            .toLowerCase()
            .trim()
            .replaceAll(/\s+/g, '-')
            .replaceAll(/[^\w\-/]/g, '');
        
        // Special case: "home" links to root
        if (slug === 'home') {
            return '/';
        }
        
        // Ensure leading slash, trailing slash
        const url = '/' + slug.replaceAll(/^\/+|\/+$/g, '') + '/';
        return url;
    };

    /**
     * Walk through text nodes and replace wikilinks with anchor tags.
     * 
     * @param {Node} node - The DOM node to process
     */
    const processNode = (node) => {
        if (node.nodeType === Node.TEXT_NODE) {
            // Check if parent is in skipped list
            if (skippedParentTags.has(node.parentElement?.tagName)) {
                return;
            }

            const text = node.textContent;
            // Match [[page]] or [[page|display text]]
            const wikiLinkPattern = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;
            
            if (wikiLinkPattern.test(text)) {
                const fragment = document.createDocumentFragment();
                let lastIndex = 0;
                let match;

                // Reset regex for iteration
                wikiLinkPattern.lastIndex = 0;
                
                while ((match = wikiLinkPattern.exec(text)) !== null) {
                    // Add text before the match
                    if (match.index > lastIndex) {
                        fragment.appendChild(
                            document.createTextNode(text.slice(lastIndex, match.index))
                        );
                    }

                    // Create anchor element
                    const pageName = match[1].trim();
                    const displayText = match[2]?.trim() || pageName;
                    const url = pageNameToUrl(pageName);

                    const link = document.createElement('a');
                    link.href = url;
                    link.textContent = displayText;
                    fragment.appendChild(link);

                    lastIndex = wikiLinkPattern.lastIndex;
                }

                // Add remaining text
                if (lastIndex < text.length) {
                    fragment.appendChild(
                        document.createTextNode(text.slice(lastIndex))
                    );
                }

                // Replace the text node with the fragment
                node.parentElement.replaceChild(fragment, node);
            }
            return;
        }

        // Recursively process child nodes
        if (node.nodeType === Node.ELEMENT_NODE && !skippedParentTags.has(node.tagName)) {
            const children = Array.from(node.childNodes);
            for (const child of children) {
                processNode(child);
            }
        }
    };

    // Process the document when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            processNode(document.body);
        });
    } else {
        processNode(document.body);
    }
})();
