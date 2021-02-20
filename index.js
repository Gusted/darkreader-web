"use strict";
(() => {
  // src/dom.ts
  function isDOMReady() {
    return document.readyState === "complete" || document.readyState === "interactive";
  }
  var readyStateListeners = new Set();
  function addDOMReadyListener(listener) {
    readyStateListeners.add(listener);
  }
  if (!isDOMReady()) {
    const onReadyStateChange = () => {
      if (isDOMReady()) {
        document.removeEventListener("readystatechange", onReadyStateChange);
        readyStateListeners.forEach((listener) => listener());
        readyStateListeners.clear();
      }
    };
    document.addEventListener("readystatechange", onReadyStateChange);
  }

  // src/index.ts
  async function setup() {
    const parsedURL = new URL(window.location.href);
    if (!parsedURL.searchParams.get("url")) {
      throw new Error("URL not found");
    }
    const IFrameSiteWrapper = document.querySelector(".site-wrapper");
    IFrameSiteWrapper.addEventListener("load", () => {
      console.log("aaaa");
    });
    IFrameSiteWrapper.src = `${window.location.origin}/proxy/${parsedURL.searchParams.get("url")}`;
    window.DarkReader.enable();
    window.DarkReader.setupIFrameListener((IFrameDocument) => {
      const newScript = IFrameDocument.createElement("script");
      newScript.src = `${window.location.origin}/darkreader.js`;
      newScript.textContent = "";
      IFrameDocument.head.append(newScript);
    });
  }
  if (isDOMReady()) {
    setup();
  } else {
    addDOMReadyListener(async () => setup());
  }
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjL2RvbS50cyIsICIuLi9zcmMvaW5kZXgudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImV4cG9ydCBmdW5jdGlvbiBpc0RPTVJlYWR5KCkge1xuICAgIHJldHVybiBkb2N1bWVudC5yZWFkeVN0YXRlID09PSAnY29tcGxldGUnIHx8IGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdpbnRlcmFjdGl2ZSc7XG59XG5cbmNvbnN0IHJlYWR5U3RhdGVMaXN0ZW5lcnMgPSBuZXcgU2V0PCgpID0+IHZvaWQ+KCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRET01SZWFkeUxpc3RlbmVyKGxpc3RlbmVyOiAoKSA9PiB2b2lkKSB7XG4gICAgcmVhZHlTdGF0ZUxpc3RlbmVycy5hZGQobGlzdGVuZXIpO1xufVxuXG5pZiAoIWlzRE9NUmVhZHkoKSkge1xuICAgIGNvbnN0IG9uUmVhZHlTdGF0ZUNoYW5nZSA9ICgpID0+IHtcbiAgICAgICAgaWYgKGlzRE9NUmVhZHkoKSkge1xuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVhZHlzdGF0ZWNoYW5nZScsIG9uUmVhZHlTdGF0ZUNoYW5nZSk7XG4gICAgICAgICAgICByZWFkeVN0YXRlTGlzdGVuZXJzLmZvckVhY2goKGxpc3RlbmVyKSA9PiBsaXN0ZW5lcigpKTtcbiAgICAgICAgICAgIHJlYWR5U3RhdGVMaXN0ZW5lcnMuY2xlYXIoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigncmVhZHlzdGF0ZWNoYW5nZScsIG9uUmVhZHlTdGF0ZUNoYW5nZSk7XG59XG4iLCAiaW1wb3J0IHthZGRET01SZWFkeUxpc3RlbmVyLCBpc0RPTVJlYWR5fSBmcm9tICcuL2RvbSc7XG5cbmFzeW5jIGZ1bmN0aW9uIHNldHVwKCkge1xuICAgIGNvbnN0IHBhcnNlZFVSTCA9IG5ldyBVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xuICAgIGlmICghcGFyc2VkVVJMLnNlYXJjaFBhcmFtcy5nZXQoJ3VybCcpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVVJMIG5vdCBmb3VuZCcpO1xuICAgIH1cbiAgICBjb25zdCBJRnJhbWVTaXRlV3JhcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaXRlLXdyYXBwZXInKSBhcyBIVE1MSUZyYW1lRWxlbWVudDtcbiAgICBJRnJhbWVTaXRlV3JhcHBlci5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnYWFhYScpO1xuICAgIH0pO1xuICAgIElGcmFtZVNpdGVXcmFwcGVyLnNyYyA9IGAke3dpbmRvdy5sb2NhdGlvbi5vcmlnaW59L3Byb3h5LyR7cGFyc2VkVVJMLnNlYXJjaFBhcmFtcy5nZXQoJ3VybCcpfWA7XG4gICAgKHdpbmRvdyBhcyBhbnkpLkRhcmtSZWFkZXIuZW5hYmxlKCk7XG4gICAgKHdpbmRvdyBhcyBhbnkpLkRhcmtSZWFkZXIuc2V0dXBJRnJhbWVMaXN0ZW5lcigoSUZyYW1lRG9jdW1lbnQ6IERvY3VtZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld1NjcmlwdCA9IElGcmFtZURvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgICBuZXdTY3JpcHQuc3JjID0gYCR7d2luZG93LmxvY2F0aW9uLm9yaWdpbn0vZGFya3JlYWRlci5qc2A7XG4gICAgICAgIG5ld1NjcmlwdC50ZXh0Q29udGVudCA9ICcnO1xuICAgICAgICBJRnJhbWVEb2N1bWVudC5oZWFkLmFwcGVuZChuZXdTY3JpcHQpO1xuICAgIH0pO1xufVxuXG5pZiAoaXNET01SZWFkeSgpKSB7XG4gICAgc2V0dXAoKTtcbn0gZWxzZSB7XG4gICAgYWRkRE9NUmVhZHlMaXN0ZW5lcihhc3luYyAoKSA9PiBzZXR1cCgpKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7OztBQUFPO0FBQ0gsV0FBTyxTQUFTLGVBQWUsY0FBYyxTQUFTLGVBQWU7QUFBQTtBQUd6RSxNQUFNLHNCQUFzQixJQUFJO0FBRXpCLCtCQUE2QjtBQUNoQyx3QkFBb0IsSUFBSTtBQUFBO0FBRzVCLE1BQUksQ0FBQztBQUNELFVBQU0scUJBQXFCO0FBQ3ZCLFVBQUk7QUFDQSxpQkFBUyxvQkFBb0Isb0JBQW9CO0FBQ2pELDRCQUFvQixRQUFRLENBQUMsYUFBYTtBQUMxQyw0QkFBb0I7QUFBQTtBQUFBO0FBRzVCLGFBQVMsaUJBQWlCLG9CQUFvQjtBQUFBOzs7QUNoQmxEO0FBQ0ksVUFBTSxZQUFZLElBQUksSUFBSSxPQUFPLFNBQVM7QUFDMUMsUUFBSSxDQUFDLFVBQVUsYUFBYSxJQUFJO0FBQzVCLFlBQU0sSUFBSSxNQUFNO0FBQUE7QUFFcEIsVUFBTSxvQkFBb0IsU0FBUyxjQUFjO0FBQ2pELHNCQUFrQixpQkFBaUIsUUFBUTtBQUN2QyxjQUFRLElBQUk7QUFBQTtBQUVoQixzQkFBa0IsTUFBTSxHQUFHLE9BQU8sU0FBUyxnQkFBZ0IsVUFBVSxhQUFhLElBQUk7QUFDdEYsSUFBQyxPQUFlLFdBQVc7QUFDM0IsSUFBQyxPQUFlLFdBQVcsb0JBQW9CLENBQUM7QUFDNUMsWUFBTSxZQUFZLGVBQWUsY0FBYztBQUMvQyxnQkFBVSxNQUFNLEdBQUcsT0FBTyxTQUFTO0FBQ25DLGdCQUFVLGNBQWM7QUFDeEIscUJBQWUsS0FBSyxPQUFPO0FBQUE7QUFBQTtBQUluQyxNQUFJO0FBQ0E7QUFBQTtBQUVBLHdCQUFvQixZQUFZO0FBQUE7IiwKICAibmFtZXMiOiBbXQp9Cg==
