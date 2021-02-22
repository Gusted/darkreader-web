document.addEventListener("click", (e) => {
    if (frameElement && document.activeElement && document.activeElement.href) {
        e.preventDefault();
        window.top.location.href = `${window.top.location.href.substring(0, window.top.location.href.indexOf("?") + 1)}url=${document.activeElement.href}`;
    }
});