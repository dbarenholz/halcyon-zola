(() => {
	const renderIcons = () => {
		if (globalThis.lucide && typeof globalThis.lucide.createIcons === "function") {
			globalThis.lucide.createIcons();
		}
	};

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", renderIcons, { once: true });
	} else {
		renderIcons();
	}
})();