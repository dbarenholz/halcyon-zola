/**
 * Mermaid diagram support for Zola, with more hacks than I'd like.
 * This supports "normal" mermaid code blocks ala Obsidian style.
 *
 * Zola wraps fenced mermaid blocks as:
 *   <pre class="... z-code"><code data-lang="mermaid"><span ...>...</span>...</code></pre>
 *
 * This script strips those highlight spans, replaces the <pre> with a plain
 * <pre class="mermaid">, then dynamically loads Mermaid from CDN and renders.
 * Mermaid is only fetched when at least one diagram is present on the page.
 * 
 * It also re-renders diagrams when the page theme (body.dark / body.light) changes, and 
 * does so by stashing the original source in a data attribute and restoring it before re-rendering.
 */
(() => {
    /**
     * Find every Zola-highlighted mermaid block and replace it with the plain
     * <pre class="mermaid"> element that Mermaid expects.
     *
     * @returns {number} how many blocks were transformed
     */
    const transformMermaidBlocks = () => {
        const codeBlocks = document.querySelectorAll('code[data-lang="mermaid"]');
        for (const code of codeBlocks) {
            const pre = code.parentElement;
            if (pre?.tagName !== 'PRE') continue;

            const mermaidPre = document.createElement('pre');
            mermaidPre.className = 'mermaid';
            // textContent decodes HTML entities (e.g. &gt; → >) automatically.
            mermaidPre.textContent = code.textContent.trim();
            pre.replaceWith(mermaidPre);
        }
        return codeBlocks.length;
    };

    // Colors are defined in _colors.scss partial.
    // We automatically resolve them from browser's CSS values.
    // Do not change the keys or values in this map
    const mermaidThemeVariableMap = {
        background: 'background',
        primaryColor: 'primary-color',
        primaryTextColor: 'primary-text-color',
        primaryBorderColor: 'primary-border-color',
        secondaryColor: 'secondary-color',
        tertiaryColor: 'tertiary-color',
        lineColor: 'line-color',
        edgeLabelBackground: 'edge-label-background',
        clusterBkg: 'cluster-background',
        clusterBorder: 'cluster-border',
        titleColor: 'title-color',
        noteBkgColor: 'note-background',
        noteTextColor: 'note-text-color',
        noteBorderColor: 'note-border-color'
    };

    const getThemeName = () =>
        document.body.classList.contains('light') ? 'light' : 'dark';

    const getCssVar = (name) =>
        getComputedStyle(document.documentElement).getPropertyValue(name).trim();

    /**
     * Return a Mermaid config that resolves all theme colors from CSS custom
     * properties. This keeps palette choices in Sass and lets theme toggles
     * work without duplicating the light/dark color tables in JS.
     */
    const getMermaidConfig = () => {
        const themeName = getThemeName();
        const themeVariables = Object.fromEntries(
            Object.entries(mermaidThemeVariableMap).map(([key, token]) => [
                key,
                getCssVar(`--halcyon-mermaid-${token}-${themeName}`)
            ])
        );

        themeVariables.fontFamily = getComputedStyle(document.body).fontFamily;
        themeVariables.fontSize = '14px';

        return { startOnLoad: false, theme: 'base', themeVariables };
    };

    /**
     * Restore all rendered diagrams back to plain <pre class="mermaid"> so
     * Mermaid can re-render them. Sources were stashed in a data attribute.
     */
    const restoreDiagrams = () => {
        for (const el of document.querySelectorAll('[data-mermaid-src]')) {
            const pre = document.createElement('pre');
            pre.className = 'mermaid';
            pre.textContent = el.dataset.mermaidSrc;
            el.replaceWith(pre);
        }
    };

    /**
     * Stash each diagram's source text into a data attribute on its container
     * so we can restore it later for theme re-renders.
     * Mermaid wraps rendered output in a <div> or <svg>; we look for the
     * <pre class="mermaid"> that was just processed (Mermaid replaces its
     * inner content but keeps the element) OR the sibling container it inserts.
     * The simplest anchor is to walk pre.mermaid before running, save text,
     * then after running find the rendered element by position.
     */
    const renderDiagrams = async (mermaid) => {
        // Collect sources before mermaid.run() mutates the DOM.
        const sources = [...document.querySelectorAll('pre.mermaid')]
            .map(pre => pre.textContent.trim());

        mermaid.initialize(getMermaidConfig());
        await mermaid.run();

        // Mermaid v11 marks rendered containers with data-processed.
        // Attach source so we can restore on theme change.
        [...document.querySelectorAll('[data-processed]')].forEach((el, i) => {
            if (sources[i] !== undefined) el.dataset.mermaidSrc = sources[i];
        });
    };

    const initMermaid = async () => {
        const transformedCount = transformMermaidBlocks();
        const mermaidPreCount = document.querySelectorAll('pre.mermaid').length;
        if (transformedCount === 0 && mermaidPreCount === 0) return;

        const { default: mermaid } = await import('https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs');

        await renderDiagrams(mermaid);

        // Re-render whenever the body theme class changes.
        let lastThemeName = getThemeName();
        new MutationObserver(() => {
            const themeName = getThemeName();
            if (themeName === lastThemeName) return;
            lastThemeName = themeName;
            restoreDiagrams();
            renderDiagrams(mermaid);
        }).observe(document.body, { attributes: true, attributeFilter: ['class'] });
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMermaid);
    } else {
        initMermaid();
    }
})();
