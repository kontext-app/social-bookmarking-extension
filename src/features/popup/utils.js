export async function sendMessageToActiveTab(message) {
  const activeTabs = await browser.tabs.query({
    currentWindow: true,
    active: true,
  });

  if (!activeTabs[0]) {
    return;
  }

  return browser.tabs.sendMessage(activeTabs[0].id, message);
}
