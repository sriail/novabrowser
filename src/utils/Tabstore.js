// Simple tab store with events

const tabstore = {
  tabs: [], // { id, url, title, favicon }
  activeTabId: null,
  listeners: [],

  addTab(tab) {
    this.tabs.push(tab);
    this.activeTabId = tab.id;
    this.emit();
  },

  updateTab(id, data) {
    const tab = this.tabs.find(t => t.id === id);
    if (tab) {
      Object.assign(tab, data);
      this.emit();
    }
  },

  closeTab(id) {
    this.tabs = this.tabs.filter(t => t.id !== id);
    if (this.activeTabId === id) {
      this.activeTabId = this.tabs[0]?.id ?? null;
    }
    this.emit();
  },

  setActiveTab(id) {
    this.activeTabId = id;
    this.emit();
  },

  emit() {
    this.listeners.forEach(fn => fn(this.getState()));
  },

  subscribe(fn) {
    this.listeners.push(fn);
    fn(this.getState());
    return () => {
      this.listeners = this.listeners.filter(f => f !== fn);
    };
  },

  getState() {
    return {
      tabs: [...this.tabs],
      activeTabId: this.activeTabId
    };
  }
};

export default tabstore;
