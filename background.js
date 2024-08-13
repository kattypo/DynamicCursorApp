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