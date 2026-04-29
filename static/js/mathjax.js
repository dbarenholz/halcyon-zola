/**
 * Shared MathJax bootstrap and Zola markdown normalization.
 * Zola collapses TeX row breaks at the end of lines inside block math, so
 * environments like aligned, bmatrix, and cases arrive as \ instead of \\.
 */
(() => {
    const skippedParentTags = new Set(["SCRIPT", "STYLE", "CODE", "PRE", "TEXTAREA"]);

    /**
     * Normalizes a line of display math by checking if it ends with an unescaped backslash, and if so, replacing it with a double backslash.
     * We need this little hack because Zola's internals collapse `\\` into `\` since it's an "escape".
     * 
     * @param {String} line  
     * @param {Number} index 
     * @param {String[]} lines 
     * @returns 
     */
    const normalizeDisplayMathLine = (line, index, lines) => {
        if (index === lines.length - 1) {
            return line;
        }

        return /(^|[^\\])\\\s*$/.test(line)
            ? line.replace(/\\(\s*)$/, String.raw`\\$1`)
            : line;
    };

    /**
     * Normalize an entire math block by normalizing each line.
     * 
     * @param {String} inner the inner content of a display math block
     * @return {String} the normalized content with proper `\\` line breaks
     */
    const normalizeDisplayMathBlock = (inner) => inner
        .replaceAll("\r\n", "\n")
        .split("\n")
        .map((l, i, ls) => normalizeDisplayMathLine(l, i, ls))
        .join("\n");

    /**
     * Do the normalization, then put back dollar signs.
     * 
     * @param {String} text the math text to normalize
     * @returns a complete block for mathjax to process
     */
    const normalizeDisplayMathText = (text) => text.replaceAll(/\$\$([\s\S]*?)\$\$/g, (_match, inner) => {
        const normalizedInner = normalizeDisplayMathBlock(inner);
        return `$$${normalizedInner}$$`;
    });

    /**
     * Fix collapsed newlines in math blocks by processing the entire page's text nodes.
     * This is a workaround so we get multiline math.
     */
    const fixCollapsedNewlines = () => {
        if (!document.body) {
            return;
        }

        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        const textNodes = [];

        while (walker.nextNode()) {
            const textNode = walker.currentNode;
            const parent = textNode.parentElement;
            if (!parent || skippedParentTags.has(parent.tagName)) {
                continue;
            }

            if (!textNode.textContent.includes("$$")) {
                continue;
            }

            textNodes.push(textNode);
        }

        for (const textNode of textNodes) {
            textNode.textContent = normalizeDisplayMathText(textNode.textContent);
        }
    };

    globalThis.MathJax = {
        // fix newlines on startup
        startup: {
            pageReady: () => {
                fixCollapsedNewlines();
                return globalThis.MathJax.startup.defaultPageReady();
            }
        },
        tex: {
            packages: {
                "[+]": ["ams"]
            },
            inlineMath: [
                ["$", "$"],
            ],
            displayMath: [
                ["$$", "$$"],
            ],
            processEscapes: true,
            processEnvironments: true,
            processRefs: false,
            numberPattern: /^(?:\d+(?:\{,\}\d{3})*(?:\.\d*)?|\.\d+)/,
            initialDigit: /[0-9.,]/,
            identifierPattern: /^[a-zA-Z]+/,
            initialLetter: /[a-zA-Z]/,
            tags: "ams",
            tagSide: "right",
            tagIndent: "0.8em",
            tagAlign: "baseline",
            useLabelIds: true,
            ignoreDuplicateLabels: false,
            mathStyle: "ISO",
            maxBuffer: 1 * 1024,
            maxTemplateSubtitutions: 10000
        }
    };
})();
