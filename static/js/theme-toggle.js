/**
 * A simple JS based theme toggle.
 * It works by toggling the "light" and "dark" classes on the body element, and saving the preference in localStorage.
 */
(() => {
    const storageKey = "theme";
    const toggle = document.querySelector("[data-theme-toggle]");

    /**
     * Updates the toggle button icon and aria-label based on the current theme.
     * 
     * @param {String} theme the theme name, one of "light" or "dark"
     * @returns 
     */
    const updateToggleIcon = (theme) => {
        if (!toggle) return;

        const isDark = theme === "dark";
        const iconName = isDark ? "moon" : "sun";
        toggle.innerHTML = `<i data-lucide="${iconName}" aria-hidden="true"></i>`;
        toggle.setAttribute(
            "aria-label",
            isDark ? "Switch to light theme" : "Switch to dark theme"
        );

        if (globalThis.lucide?.createIcons) {
            globalThis.lucide.createIcons({
                attrs: {
                    width: "18",
                    height: "18",
                    strokeWidth: "2",
                },
            });
        }
    };

    /**
     * Applies the given theme by setting `color-scheme`.
     * 
     * @param {String} theme the theme name, one of "light" or "dark" (or null for system prefs)
     */
    const applyTheme = (theme) => {
        // forced theme
        if (theme === "light" || theme === "dark") {
            document.documentElement.style.colorScheme = theme;
            localStorage.setItem(storageKey, theme);
            updateToggleIcon(theme);
            return;
        }

        // system prefs
        document.documentElement.style.colorScheme = '';
        localStorage.removeItem(storageKey);
        
        const systemTheme = globalThis.matchMedia("(prefers-color-scheme: dark)").matches 
            ? "dark" 
            : "light";

        updateToggleIcon(systemTheme);
    };


    // Initialize theme on page load
    const saved = localStorage.getItem(storageKey);
    applyTheme(saved); // if not valid, applyTheme will fallback to system prefs

    // Listen for clicks on the toggle button to switch themes.
    if (toggle) {
        toggle.addEventListener("click", () => {
            const current = document.documentElement.style.colorScheme;
            const next = current === "light" ? "dark" : "light";
            applyTheme(next);
        });
    }

    // Listen to system pref changes
    globalThis.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
        const saved = localStorage.getItem(storageKey);
        const isTheme = saved === "light" || saved === "dark";

        if (!isTheme) {
            applyTheme(e.matches ? "dark" : "light");
        }
    });

})();
