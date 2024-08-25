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
    const customCursorPath = document.getElementById("customCursorPath");
    const classicPalette = document.getElementById("classicPalette");
    const pinkPalette = document.getElementById("pinkPalette");
    const vintagePalette = document.getElementById("vintagePalette");
    const techPalette = document.getElementById("techPalette");
    const reversePalette = document.getElementById("reversePalette");
    const orchidPalette = document.getElementById("orchidPalette");
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
        customCursorPath.style.stroke = event.target.value;
    });
    strokeColorPicker.addEventListener("change", function (event) {
        site.strokeSetting = event.target.value;
    });
    fillColorPicker.addEventListener("input", function (event) {
        customCursorPath.style.fill = event.target.value;
    });
    fillColorPicker.addEventListener("change", function (event) {
        site.fillSetting = event.target.value;
    });
    classicPalette.addEventListener("click", function () {
        customCursorPath.style.stroke = '#0B0B0B';
        customCursorPath.style.fill = '#FFFFFF';
        site.strokeSetting = '#0B0B0B';
        site.fillSetting = '#FFFFFF';
        strokeColorPicker.value = '#0B0B0B';
        fillColorPicker.value = '#FFFFFF';
    });
    pinkPalette.addEventListener("click", function () {
        customCursorPath.style.stroke = '#FE7171';
        customCursorPath.style.fill = '#FFFFFF';
        site.strokeSetting = '#FE7171';
        site.fillSetting = '#FFFFFF';
        strokeColorPicker.value = '#FE7171';
        fillColorPicker.value = '#FFFFFF';
    });
    vintagePalette.addEventListener("click", function () {
        customCursorPath.style.stroke = '#B07154';
        customCursorPath.style.fill = '#F2DCC9';
        site.strokeSetting = '#B07154';
        site.fillSetting = '#F2DCC9';
        strokeColorPicker.value = '#B07154';
        fillColorPicker.value = '#F2DCC9';
    });
    techPalette.addEventListener("click", function () {
        customCursorPath.style.stroke = '#3DDE56';
        customCursorPath.style.fill = '#0B0B0B';
        site.strokeSetting = '#3DDE56';
        site.fillSetting = '#0B0B0B';
        strokeColorPicker.value = '#3DDE56';
        fillColorPicker.value = '#0B0B0B';
    });
    reversePalette.addEventListener("click", function () {
        customCursorPath.style.stroke = '#FFFFFF';
        customCursorPath.style.fill = '#0B0B0B';
        site.strokeSetting = '#FFFFFF';
        site.fillSetting = '#0B0B0B';
        strokeColorPicker.value = '#FFFFFF';
        fillColorPicker.value = '#0B0B0B';
    });
    orchidPalette.addEventListener("click", function () {
        customCursorPath.style.stroke = '#FF00D0';
        customCursorPath.style.fill = '#0B0B0B';
        site.strokeSetting = '#FF00D0';
        site.fillSetting = '#0B0B0B';
        strokeColorPicker.value = '#FF00D0';
        fillColorPicker.value = '#0B0B0B';
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
                if (chrome.runtime.lastError.message.includes('QUOTA_BYTES')) {
                    console.error('Sync storage quota exceeded.');
                    alertMessage.style.display = 'block';
                }
                else {
                    console.error('Error updating stored settings:', chrome.runtime.lastError);
                }
                return;
            }
            console.log('Updated stored sites successfully.');
            alertMessage.style.display = 'none';
        });
    });
}