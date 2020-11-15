import browser from 'webextension-polyfill';

export function createTab(options) {
  browser.tabs.create(options);
}

export async function getActiveTab() {
  const activeTabs = await browser.tabs.query({
    currentWindow: true,
    active: true,
  });

  if (!activeTabs[0]) {
    return;
  }

  return activeTabs[0];
}
