export async function storeLastAuthenticatedDID(did) {
  return browser.storage.local.set({ lastAuthenticatedDID: did });
}

export async function getLastAuthenticatedDID() {
  const results = await browser.storage.local.get('lastAuthenticatedDID');
  return Object.values(results)[0];
}
