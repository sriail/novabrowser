import React, { useEffect, useState } from "react";
import tabstore from "../utils/Tabstore";

export default function TabBar({ onTabSelect }) {
  const [tabs, setTabs] = useState(tabstore.tabs);
  const [activeTabId, setActiveTabId] = useState(tabstore.activeTabId);

  useEffect(() => {
    // Subscribe to tabstore updates
    const unsub = tabstore.subscribe(({ tabs, activeTabId }) => {
      setTabs(tabs);
      setActiveTabId(activeTabId);
    });
    return unsub;
  }, []);

  return (
    <nav className="tabbar">
      {tabs.map(tab => (
        <div
          className={`tab ${tab.id === activeTabId ? "active" : ""}`}
          key={tab.id}
          onClick={() => {
            tabstore.setActiveTab(tab.id);
            onTabSelect?.(tab.id);
          }}
        >
          {tab.favicon && <img src={tab.favicon} width={16} height={16} style={{marginRight: 4}} />}
          {tab.title || tab.url}
          <button onClick={e => { e.stopPropagation(); tabstore.closeTab(tab.id); }}>×</button>
        </div>
      ))}
      <button onClick={() => tabstore.addTab({ id: `tab${tabs.length+1}`, url: "about:blank", title: "New Tab", favicon: "" })}>+</button>
    </nav>
  );
}
