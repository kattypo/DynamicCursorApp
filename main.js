'use strict';

let defaultCursorStroke = "black";//edit
let defaultCursorFill = "white";//edit
window.addEventListener('load', function () {
    loadMainPage();
    let addSiteBtn = document.getElementById("addSiteBtn");
    let siteSettingsBtn = document.getElementById("siteSettingsBtn");
    addSiteBtn.addEventListener("click", function () {
        window.location.href = "addSite.html";
    });
    siteSettingsBtn.addEventListener("click", function () {
        window.location.href = "siteSettings.html";
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
function getDefaultCursor() { //edit
    document.getElementById('cursorPath').style.stroke = defaultCursorStroke;
    document.getElementById('cursorPath').style.fill = defaultCursorFill;
}