/**
 * A simple JS based theme toggle.
 * It works by toggling the "light" and "dark" classes on the body element, and saving the preference in localStorage.
 */
(() => {
    const storageKey = "halcyon-theme";
    const body = document.body;
    const toggle = document.querySelector("[data-theme-toggle]");

    /**
     * Updates the toggle button icon and aria-label based on the current theme.
     * 
     * @param {String} theme the theme name, one of "light" or "dark"
     * @returns 
     */
    const updateToggleIcon = (theme) => {
        if (!toggle) {
            return;
        }
        const isDark = theme === "dark";
        const iconName = isDark ? "moon" : "sun";
        toggle.innerHTML = `<i data-lucide="${iconName}" aria-hidden="true"></i>`;
        toggle.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");

        if (globalThis.lucide && typeof globalThis.lucide.createIcons === "function") {
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
     * Applies the given theme by updating the body classes and data attributes, and updating the toggle button icon.
     * 
     * @param {String} theme the thene name, one of "light" or "dark"
     */
    const applyTheme = (theme) => {
        body.classList.remove("light", "dark");
        body.classList.add(theme);
        body.dataset.theme = theme;
        updateToggleIcon(theme);
    };
    // Get from local storage
    const saved = localStorage.getItem(storageKey);
    if (saved === "light" || saved === "dark") {
        // If it's a valid theme, apply it.
        applyTheme(saved);
    } else if (body.classList.contains("light")) {
        // Otherwise, try to match on body.light
        updateToggleIcon("light");
    } else {
        // Default to dark if no preference is found.
        updateToggleIcon("dark");
    }

    // Listen for clicks on the toggle button to switch themes.
    if (toggle) {
        toggle.addEventListener("click", () => {
            const next = body.classList.contains("dark") ? "light" : "dark";
            applyTheme(next);
            localStorage.setItem(storageKey, next);
        });
    }

})();
