document.addEventListener("click", (e) => {
    if (frameElement && document.activeElement && document.activeElement.href) {
        e.preventDefault();
        window.top.location.href = `${window.top.location.href.substring(0, window.top.location.href.indexOf("?") + 1)}url=${document.activeElement.href}`;
    }
});
document.addEventListener('submit', (e) => {
    if (frameElement && document.activeElement && document.activeElement.form && document.activeElement.form.action) {
        e.preventDefault()
        if (document.activeElement.form.method === 'post') {
            // const method = {method: 'post', body: new FormData(document.activeElement.form)};
            // TO-DO
        } else {
            window.top.location.href = `${window.top.location.href.substring(0, window.top.location.href.indexOf("?") + 1)}url=${document.activeElement.form.action}?${new URLSearchParams(new FormData(document.activeElement.form))}`;
        }
    }
})