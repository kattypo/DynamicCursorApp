chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason === 'install') {
        chrome.storage.sync.get('siteSettings', function (result) {
            if (result.siteSettings === undefined) {
                // Array has not been initialized, so set it to an empty array
                chrome.storage.sync.set({ siteSettings: [] }, function () {
                    console.log('Initialized siteSettings as an empty array.');
                });
            } else {
                console.log('siteSettings already initialized:', result.siteSettings);
            }
        });
    }
});
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.command === 'getTabUrl') {
        // Query the active tab in the current window
        chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
            const tab = tabs[0];
            sendResponse({ url: tab.url });
        });
        // Indicate that you want to send a response asynchronously
        return true;
    }
});