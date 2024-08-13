'use strict';

let defaultCursorStroke = "black";
let defaultCursorFill = "white";
window.addEventListener('load', function () {
    loadMainPage();
    let addSiteBtn = document.getElementById("addSiteBtn");
    addSiteBtn.addEventListener("click", function () {
        loadSitePage();
    });
});
function loadMainPage() {
    getSiteList();
    getDefaultCursor();
}
function loadSitePage() {
    window.location.href = "addSite.html";
}
function getSiteList() {
    let list = document.getElementById("siteList");
    chrome.storage.sync.get('siteSettings', function (result) {
        if (chrome.runtime.lastError) {
            console.error('Error retrieving siteSettings:', chrome.runtime.lastError);
            return;
        }
        let siteSettings = result.siteSettings || [];
/*        console.log('Retrieved array:', siteSettings);*/
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