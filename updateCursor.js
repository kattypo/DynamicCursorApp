let siteName;

if (document.readyState === 'loading') {
    // Document is still loading
    document.addEventListener('DOMContentLoaded', onPageLoad);
} else {
    // Document is already loaded
    onPageLoad();
}
function getSiteName() {
    return new Promise(async (resolve, reject) => {
        try {
            siteName = await getTabUrl();
/*            console.log('Tab URL:', siteName);*/
            resolve(siteName); // Resolve with the siteName
        } catch (error) {
            console.error('Error retrieving tab URL:', error);
            reject(error); // Reject the promise with the error
        }
    });
}
function getTabUrl() {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({ command: 'getTabUrl' }, (response) => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } else {
                resolve(response.url);
            }
        });
    });
}
function updateCursor(name) {
    chrome.storage.sync.get('siteSettings', function (result) {
        if (chrome.runtime.lastError) {
            console.error('Error retrieving siteSettings:', chrome.runtime.lastError);
            return;
        }
        let siteSettings = result.siteSettings || [];
        for (let i = 0; i < siteSettings.length; ++i) {
            if (siteSettings[i].name == name) {
                let body = document.body;
                body.style.cursor = 'url(' + siteSettings[i].lightMode + '), auto';
                console.log('Match found:', siteSettings[i].lightMode);
                return;
            }
        }
        console.log('No match found');
        console.log('Site Name after retrieval:', name);
    });
}
function onPageLoad() {
    (async () => {
        try {
            const name = await getSiteName();
            siteName = name;
            updateCursor(siteName);
        } catch (error) {
            console.error('Error handling site name:', error);
        }
    })();
}
