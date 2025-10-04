import { useState } from 'react';

export interface Tab {
  id: string;
  title: string;
  content: string;
}

export function useTabs(initialTabs: Tab[]) {
  const [tabs, setTabs] = useState<Tab[]>(initialTabs);
  const [activeTab, setActiveTab] = useState<string>(initialTabs[0]?.id || '');

  function addTab(tab: Tab) {
    setTabs(prev => [...prev, tab]);
    setActiveTab(tab.id);
  }
  function closeTab(tabId: string) {
    setTabs(prev => prev.filter(tab => tab.id !== tabId));
    if (activeTab === tabId && tabs.length > 1) {
      setActiveTab(tabs[0].id); // fallback to first tab
    }
  }
  function switchTab(tabId: string) {
    setActiveTab(tabId);
  }

  return { tabs, activeTab, addTab, closeTab, switchTab };
}
