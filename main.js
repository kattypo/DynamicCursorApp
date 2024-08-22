'use strict';
window.addEventListener('load', function () {
    loadMainPage();
    let addSiteBtn = document.getElementById("addSiteBtn");
    let siteSettingsBtn = document.getElementById("siteSettingsBtn");
    let changeDefaultBtn = document.getElementById("changeDefaultBtn");
    let alertMessage = document.getElementById("alertMessage");

    addSiteBtn.addEventListener("click", async function () {
        try {
            if (await siteSettingsExists()) { 
                console.log('This site already has saved settings.');
                alertMessage.style.display = 'block';
            } else {
                console.log('This site does not have saved settings.');
                alertMessage.style.display = 'none';
                window.location.href = "addSite.html";
            }
        } catch (error) {
            console.error('Error checking site settings:', error);
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
async function siteSettingsExists() {

    let domain;
    let settingExists = false;

    // Gets the domain from the active tab
    try {
        const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
        let name = tab.url;
        let parsedUrl = new URL(name);
        domain = parsedUrl.hostname;
    } catch (error) {
        console.error('Error fetching tab:', error);
        return false; 
    }

    // Retrieves site settings from storage and checks list for current domain in tab
    try {
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
                settingExists = true;
                break;
            }
        }
    } catch (error) {
        console.error('Error retrieving site settings:', error);
    }
    return settingExists;
}
    