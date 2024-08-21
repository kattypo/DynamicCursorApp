chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason === 'install') {
        chrome.storage.sync.get('siteSettings', function (result) {
            if (result.siteSettings === undefined) {
                chrome.storage.sync.set({ siteSettings: [] }, function () {
                    console.log('Initialized siteSettings as an empty array.');
                });
            } else {
                console.log('siteSettings already initialized:', result.siteSettings);
            }
        });
        chrome.storage.sync.get('siteDataToUpdate', function (result) {
            if (result.siteDataToUpdate === undefined) {
                const initialData = {
                    name: null,
                    strokeSetting: null,
                    fillSetting: null,
                    position: null
                };
                chrome.storage.sync.set({ siteDataToUpdate: initialData }, function () {
                    console.log('Initialized siteDataToUpdate as an empty array.');
                });
            } else {
                console.log('siteDataToUpdate already initialized:');
            }
        });
        chrome.storage.sync.get('defaultCursorSettings', function (result) {
            if (result.defaultCursorSettings === undefined) {
                const defaultCursor = {
                    strokeSetting: "#000000",
                    fillSetting: "#FFFFFF"
                };
                chrome.storage.sync.set({ defaultCursorSettings: defaultCursor }, function () {
                    console.log('Initialized default cursor settings.');
                });
            } else {
                console.log('Default cursor settings already initialized:');
            }
        });
    }
});
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.command === 'getTabUrl') {
        chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
            const tab = tabs[0];
            sendResponse({ url: tab.url });
        });
        return true;
    }
});