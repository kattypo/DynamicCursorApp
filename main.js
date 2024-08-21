'use strict';
window.addEventListener('load', function () {
    loadMainPage();
    let addSiteBtn = document.getElementById("addSiteBtn");
    let siteSettingsBtn = document.getElementById("siteSettingsBtn");
    let changeDefaultBtn = document.getElementById("changeDefaultBtn");
    addSiteBtn.addEventListener("click", function () {
        if (siteSettingsExists()) {
            console.log('This site already has saved settings.')
            //display error message
        }
        else {
            window.location.href = "addSite.html";
        }
    });
    siteSettingsBtn.addEventListener("click", function () {
        window.location.href = "siteSettings.html";
    });
    changeDefaultBtn.addEventListener("click", function () {
        window.location.href = "changeDefault.html";
    });
});
function loadMainPage() {
    getSiteList();
    getDefaultCursor();
}
function getSiteList() {
    let list = document.getElementById("siteList");
    chrome.storage.sync.get('siteSettings', function (result) {
        if (chrome.runtime.lastError) {
            console.error('Error retrieving site settings:', chrome.runtime.lastError);
            return;
        }
        let siteSettings = result.siteSettings || [];
        console.log('Retrieved array:', siteSettings);
        for (let i = 0; i < siteSettings.length; ++i) {
            let li = document.createElement('li');
            li.innerHTML = siteSettings[i].name;
            list.appendChild(li);
        }
    });
}
function getDefaultCursor() { 
    chrome.storage.sync.get('defaultCursorSettings', function (result) {
        if (chrome.runtime.lastError) {
            console.error('Error retrieving default cursor settings:', chrome.runtime.lastError);
            return;
        }
        let defaultCursorSettings = result.defaultCursorSettings || {};
        document.getElementById('cursorPath').style.stroke = defaultCursorSettings.strokeSetting;
        document.getElementById('cursorPath').style.fill = defaultCursorSettings.fillSetting;
    });
}
async function siteSettingsExists() { //checks if the site about to be added already has saved settings
    try {
        const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
        if (!tab || !tab.url) {
            throw new Error('No active tab or tab URL is missing');
        }
        let parsedUrl = new URL(tab.url);
        let domain = parsedUrl.hostname;
        const result = await new Promise((resolve, reject) => {
            chrome.storage.sync.get('siteSettings', function (result) {
                if (chrome.runtime.lastError) {
                    reject(new Error('Error retrieving stored settings: ' + chrome.runtime.lastError));
                } else {
                    resolve(result);
                }
            });
        });
        let siteSettings = result.siteSettings || [];
        for (let i = 0; i < siteSettings.length; ++i) {
            if (siteSettings[i].name === domain) {
                console.log(domain);
                return true;
            }
        }
        return false;

    } catch (error) {
        console.error(error);
        return false;
    }
}