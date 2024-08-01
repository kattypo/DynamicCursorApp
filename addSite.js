window.addEventListener('load', function () {
    let backBtn = document.getElementById("backBtn");
    backBtn.addEventListener("click", function () {
        loadMainPage();
    });
    loadSitePage();
});
function loadMainPage() {
    window.location.href = "main.html";
}
function loadSitePage() {
    let siteName;
    let siteNameLabel = document.getElementById("siteNameLabel");
    (async () => {
        const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
        siteName = tab.url;
        siteNameLabel.innerHTML = siteName;
    })();
    
}
function addSite() {

}