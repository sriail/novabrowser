import React, { useRef } from "react";
import tabstore from "../utils/Tabstore";

function getFavicon(doc) {
  // Try to get <link rel="icon" ...>
  const icon = doc.querySelector("link[rel~='icon']");
  return icon ? icon.href : "/favicon.png";
}

export default function BrowserView() {
  const iframeRef = useRef();
  const { activeTabId } = tabstore.getState();

  function handleLoad() {
    const iframe = iframeRef.current;
    if (iframe && iframe.contentDocument) {
      const url = iframe.contentWindow.location.href;
      const title = iframe.contentDocument.title;
      const favicon = getFavicon(iframe.contentDocument);
      tabstore.updateTab(activeTabId, { url, title, favicon });
    }
  }

  const activeTab = tabstore.tabs.find(t => t.id === activeTabId);

  return <iframe ref={iframeRef} src={activeTab?.url || "about:blank"} onLoad={handleLoad} />;
}
