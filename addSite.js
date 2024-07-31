window.addEventListener('load', function () {
    let backBtn = document.getElementById("backBtn");
    backBtn.addEventListener("click", function () {
        loadMainPage();
    });
});
function loadMainPage() {
    window.location.href = "main.html";
}
function loadSitePage() {
    let siteNameLabel = document.getElementById("siteNameLabel");
    let siteName;
    (async () => {
        const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
        siteName = tab.url;
    })();
    
}

function getCurrentSite() {

}
function addSite() {

}