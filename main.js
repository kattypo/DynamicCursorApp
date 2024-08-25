'use strict';
window.addEventListener('load', function () {
    loadMainPage();
    const addSiteBtn = document.getElementById("addSiteBtn");
    const siteSettingsBtn = document.getElementById("siteSettingsBtn");
    const changeDefaultBtn = document.getElementById("changeDefaultBtn");
    const sendFeedbackBtn = document.getElementById("sendFeedbackBtn");
    const alertMessage = document.getElementById("alertMessage");

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
    sendFeedbackBtn.addEventListener("click", function () {
        window.location.href = "sendFeedback.html";
    });
});
function loadMainPage() {
    const container = document.getElementById("container");
    getSiteList();
    getDefaultCursor();
    container.style.overflowY = 'auto';
}
function getSiteList() {
    const list = document.getElementById("siteList");
    chrome.storage.sync.get('siteSettings', function (result) {
        if (chrome.runtime.lastError) {
            console.error('Error retrieving site settings:', chrome.runtime.lastError);
            return;
        }
        const siteSettings = result.siteSettings || [];
        console.log('Retrieved array:', siteSettings);
        for (let i = 0; i < siteSettings.length; ++i) {
            const li = document.createElement('li');
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
        const defaultCursorSettings = result.defaultCursorSettings || {};
        const cursorPath = document.getElementById('cursorPath');
        cursorPath.style.stroke = defaultCursorSettings.strokeSetting;
        cursorPath.style.fill = defaultCursorSettings.fillSetting;
    });
}
async function siteSettingsExists() {

    let domain;
    let settingExists = false;

    // Gets the domain from the active tab
    try {
        const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
        domain = new URL(tab.url).hostname;
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

        const siteSettings = result.siteSettings || [];
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
    