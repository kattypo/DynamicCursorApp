'use strict';

let defaultCursorStroke = "black";
let defaultCursorFill = "white";
let sites = ["https://my.unf.edu/",
    "https://mail.google.com/", "https://getbootstrap.com/", "https://stackoverflow.com/", "https://chromewebstore.google.com/?hl=en",
    "https://www.uwgb.edu/", "pbs.com"];


window.addEventListener('load', function () {
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
    for (let i = 0; i < sites.length; ++i) {
        let li = document.createElement('li');
        li.innerHTML = sites[i];
        list.appendChild(li);
    }
}
function getDefaultCursor() {

    document.getElementById('cursorPath').style.stroke = defaultCursorStroke;
    document.getElementById('cursorPath').style.fill = defaultCursorFill;
}