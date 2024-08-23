let site = { //dictionary to be stored 
    name: null,
    strokeSetting: "#3EE258",
    fillSetting: "#000000"
};
window.addEventListener('load', function () {
    const backBtn = document.getElementById("backBtn");
    const applyBtn = document.getElementById("applyBtn");
    const strokeColorPicker = document.getElementById("strokeColorPicker");
    const fillColorPicker = document.getElementById("fillColorPicker");
    backBtn.addEventListener("click", function () {
        window.location.href = "main.html";
    });
    applyBtn.addEventListener("click", function () {
        if (site.name != null) {
            addToStorage();
            window.location.href = "main.html";
        }
    });
    strokeColorPicker.addEventListener("input", function (event) {
        const customCursorPath = document.getElementById("customCursorPath");
        customCursorPath.style.stroke = event.target.value;
    });
    strokeColorPicker.addEventListener("change", function (event) {
        site.strokeSetting = event.target.value;
    });
    fillColorPicker.addEventListener("input", function (event) {
        let customCursorPath = document.getElementById("customCursorPath");
        customCursorPath.style.fill = event.target.value;
    });
    fillColorPicker.addEventListener("change", function (event) {
        site.fillSetting = event.target.value;
    });
    loadSitePage();
});
function loadSitePage() {
    let domain;
    const siteNameLabel = document.getElementById("siteNameLabel");
    (async () => {
        const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
        domain = new URL(tab.url).hostname;
        siteNameLabel.innerHTML = domain;
        site.name = domain;
    })();
}
function addToStorage() {
    chrome.storage.sync.get('siteSettings', function (result) {
        if (chrome.runtime.lastError) {
            console.error('Error retrieving stored settings:', chrome.runtime.lastError);
            return;
        }
        const siteSettings = result.siteSettings || [];
        siteSettings.push(site);
        chrome.storage.sync.set({ siteSettings: siteSettings }, function () {
            if (chrome.runtime.lastError) {
                console.error('Error updating stored settings:', chrome.runtime.lastError);
                return;
            }
            console.log('Updated stored sites successfully.');
        });
    });
}