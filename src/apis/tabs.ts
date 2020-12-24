// @ts-ignore
import browser from 'webextension-polyfill';

export function createTab(options: any) {
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
