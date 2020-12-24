// @ts-ignore
import browser from 'webextension-polyfill';

export async function storeLastAuthenticatedDID(did: string) {
  return browser.storage.local.set({ lastAuthenticatedDID: did });
}

export async function getLastAuthenticatedDID() {
  const results: { [key: string]: string } = await browser.storage.local.get(
    'lastAuthenticatedDID'
  );
  return Object.values(results)[0];
}
