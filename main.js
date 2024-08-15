'use strict';

let defaultCursorStroke = "black";
let defaultCursorFill = "white";
window.addEventListener('load', function () {
    loadMainPage();
    let addSiteBtn = document.getElementById("addSiteBtn");
    let siteSettingsBtn = document.getElementById("siteSettingsBtn");
    addSiteBtn.addEventListener("click", function () {
        loadAddSitePage();
    });
    siteSettingsBtn.addEventListener("click", function () {
        loadSiteSettingsPage();
    });
});
function loadMainPage() {
    getSiteList();
    getDefaultCursor();
}
function loadAddSitePage() {
    window.location.href = "addSite.html";
}
function loadSiteSettingsPage() {
    window.location.href = "siteSettings.html";
}
function getSiteList() {
    let list = document.getElementById("siteList");
    chrome.storage.sync.get('siteSettings', function (result) {
        if (chrome.runtime.lastError) {
            console.error('Error retrieving siteSettings:', chrome.runtime.lastError);
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

    document.getElementById('cursorPath').style.stroke = defaultCursorStroke;
    document.getElementById('cursorPath').style.fill = defaultCursorFill;
}