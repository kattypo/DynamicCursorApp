'use strict';

let sites = ["https://my.unf.edu/",
    "https://mail.google.com/", "https://getbootstrap.com/", "https://stackoverflow.com/", "https://chromewebstore.google.com/?hl=en",
    "https://www.uwgb.edu/"];

function getUserInformation() {
    getSiteList();
}
function getSiteList() {
    let list = document.getElementById("siteList");
    for (let i = 0; i < sites.length; ++i) {
        let li = document.createElement('li');
        li.innerHTML = sites[i];
        list.appendChild(li);
    }
}