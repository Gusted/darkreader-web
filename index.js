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
    IFrameSiteWrapper.src = `http://127.0.0.1:8080/${parsedURL.searchParams.get("url")}`;
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjL2RvbS50cyIsICJzcmMvaW5kZXgudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImV4cG9ydCBmdW5jdGlvbiBpc0RPTVJlYWR5KCkge1xuICAgIHJldHVybiBkb2N1bWVudC5yZWFkeVN0YXRlID09PSAnY29tcGxldGUnIHx8IGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdpbnRlcmFjdGl2ZSc7XG59XG5cbmNvbnN0IHJlYWR5U3RhdGVMaXN0ZW5lcnMgPSBuZXcgU2V0PCgpID0+IHZvaWQ+KCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBhZGRET01SZWFkeUxpc3RlbmVyKGxpc3RlbmVyOiAoKSA9PiB2b2lkKSB7XG4gICAgcmVhZHlTdGF0ZUxpc3RlbmVycy5hZGQobGlzdGVuZXIpO1xufVxuXG5cbmlmICghaXNET01SZWFkeSgpKSB7XG4gICAgY29uc3Qgb25SZWFkeVN0YXRlQ2hhbmdlID0gKCkgPT4ge1xuICAgICAgICBpZiAoaXNET01SZWFkeSgpKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdyZWFkeXN0YXRlY2hhbmdlJywgb25SZWFkeVN0YXRlQ2hhbmdlKTtcbiAgICAgICAgICAgIHJlYWR5U3RhdGVMaXN0ZW5lcnMuZm9yRWFjaCgobGlzdGVuZXIpID0+IGxpc3RlbmVyKCkpO1xuICAgICAgICAgICAgcmVhZHlTdGF0ZUxpc3RlbmVycy5jbGVhcigpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdyZWFkeXN0YXRlY2hhbmdlJywgb25SZWFkeVN0YXRlQ2hhbmdlKTtcbn1cbiIsICJpbXBvcnQge2RlZmluZUlGcmFtZX0gZnJvbSAnLi9pZnJhbWUtYnlwYXNzJztcbmltcG9ydCB7YWRkRE9NUmVhZHlMaXN0ZW5lciwgaXNET01SZWFkeX0gZnJvbSAnLi9kb20nO1xuXG5hc3luYyBmdW5jdGlvbiBzZXR1cCgpIHtcbiAgICAvLyBjb25zdCBzaGFkb3dSb290RGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpdGUtd3JhcHBlcicpO1xuICAgIC8vIHNoYWRvd1Jvb3REaXYuYXR0YWNoU2hhZG93KHttb2RlOiAnb3Blbid9KTtcbiAgICBjb25zdCBwYXJzZWRVUkwgPSBuZXcgVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcbiAgICBpZiAoIXBhcnNlZFVSTC5zZWFyY2hQYXJhbXMuZ2V0KCd1cmwnKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VSTCBub3QgZm91bmQnKTtcbiAgICB9XG4gICAgY29uc3QgSUZyYW1lU2l0ZVdyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2l0ZS13cmFwcGVyJykgYXMgSFRNTElGcmFtZUVsZW1lbnQ7XG4gICAgSUZyYW1lU2l0ZVdyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ2FhYWEnKTtcbiAgICB9KTtcbiAgICBJRnJhbWVTaXRlV3JhcHBlci5zcmMgPSBgaHR0cDovLzEyNy4wLjAuMTo4MDgwLyR7cGFyc2VkVVJMLnNlYXJjaFBhcmFtcy5nZXQoJ3VybCcpfWA7XG4gICAgLy8gZGVmaW5lSUZyYW1lKCk7XG4gICAgKHdpbmRvdyBhcyBhbnkpLkRhcmtSZWFkZXIuZW5hYmxlKCk7XG4gICAgKHdpbmRvdyBhcyBhbnkpLkRhcmtSZWFkZXIuc2V0dXBJRnJhbWVMaXN0ZW5lcigoSUZyYW1lRG9jdW1lbnQ6IERvY3VtZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld1NjcmlwdCA9IElGcmFtZURvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuICAgICAgICBuZXdTY3JpcHQuc3JjID0gYCR7d2luZG93LmxvY2F0aW9uLm9yaWdpbn0vZGFya3JlYWRlci5qc2A7XG4gICAgICAgIG5ld1NjcmlwdC50ZXh0Q29udGVudCA9ICcnO1xuICAgICAgICBJRnJhbWVEb2N1bWVudC5oZWFkLmFwcGVuZChuZXdTY3JpcHQpO1xuICAgIH0pO1xufVxuXG5pZiAoaXNET01SZWFkeSgpKSB7XG4gICAgc2V0dXAoKTtcbn0gZWxzZSB7XG4gICAgYWRkRE9NUmVhZHlMaXN0ZW5lcihhc3luYyAoKSA9PiBzZXR1cCgpKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7OztBQUFPO0FBQ0gsV0FBTyxTQUFTLGVBQWUsY0FBYyxTQUFTLGVBQWU7QUFBQTtBQUd6RSxNQUFNLHNCQUFzQixJQUFJO0FBRXpCLCtCQUE2QjtBQUNoQyx3QkFBb0IsSUFBSTtBQUFBO0FBSTVCLE1BQUksQ0FBQztBQUNELFVBQU0scUJBQXFCO0FBQ3ZCLFVBQUk7QUFDQSxpQkFBUyxvQkFBb0Isb0JBQW9CO0FBQ2pELDRCQUFvQixRQUFRLENBQUMsYUFBYTtBQUMxQyw0QkFBb0I7QUFBQTtBQUFBO0FBRzVCLGFBQVMsaUJBQWlCLG9CQUFvQjtBQUFBOzs7QUNoQmxEO0FBR0ksVUFBTSxZQUFZLElBQUksSUFBSSxPQUFPLFNBQVM7QUFDMUMsUUFBSSxDQUFDLFVBQVUsYUFBYSxJQUFJO0FBQzVCLFlBQU0sSUFBSSxNQUFNO0FBQUE7QUFFcEIsVUFBTSxvQkFBb0IsU0FBUyxjQUFjO0FBQ2pELHNCQUFrQixpQkFBaUIsUUFBUTtBQUN2QyxjQUFRLElBQUk7QUFBQTtBQUVoQixzQkFBa0IsTUFBTSx5QkFBeUIsVUFBVSxhQUFhLElBQUk7QUFFNUUsSUFBQyxPQUFlLFdBQVc7QUFDM0IsSUFBQyxPQUFlLFdBQVcsb0JBQW9CLENBQUM7QUFDNUMsWUFBTSxZQUFZLGVBQWUsY0FBYztBQUMvQyxnQkFBVSxNQUFNLEdBQUcsT0FBTyxTQUFTO0FBQ25DLGdCQUFVLGNBQWM7QUFDeEIscUJBQWUsS0FBSyxPQUFPO0FBQUE7QUFBQTtBQUluQyxNQUFJO0FBQ0E7QUFBQTtBQUVBLHdCQUFvQixZQUFZO0FBQUE7IiwKICAibmFtZXMiOiBbXQp9Cg==
