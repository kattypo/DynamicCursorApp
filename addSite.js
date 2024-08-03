
window.addEventListener('load', function () {
    let backBtn = document.getElementById("backBtn");
    let strokeColorPicker = document.getElementById("strokeColorPicker");
    let fillColorPicker = document.getElementById("fillColorPicker");
    let darkModeBtn = document.getElementById("darkModeBtn");

    backBtn.addEventListener("click", function () {
        window.location.href = "main.html";
    });
    strokeColorPicker.addEventListener("input", function (event) {
        let customCursor = document.getElementById("cursorPath");
        cursorPath.style.stroke = event.target.value;
    });
    fillColorPicker.addEventListener("input", function (event) {
        let customCursor = document.getElementById("cursorPath");
        cursorPath.style.fill = event.target.value;
    });
    darkStrokeColorPicker.addEventListener("input", function (event) {
        let darkCustomCursor = document.getElementById("darkCursorPath");
        darkCursorPath.style.stroke = event.target.value;
    });
    darkFillColorPicker.addEventListener("input", function (event) {
        let darkCustomCursor = document.getElementById("darkCursorPath");
        darkCursorPath.style.fill = event.target.value;
    });
    darkModeBtn.addEventListener("click", function () {
        let darkModeSettings = document.getElementById("darkModeSettings");
        if (darkModeSettings.style.display !== 'flex') {
            darkModeSettings.style.display = 'flex';
            darkModeBtn.innerHTML = "Disable Dark Mode";
        }
        else {
            darkModeSettings.style.display = 'none';
            darkModeBtn.innerHTML = "Enable Dark Mode";
        }
    });
    loadSitePage();
});
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