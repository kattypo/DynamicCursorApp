const defaultCursor = { //dictionary to be stored
    strokeSetting: "#000000",
    fillSetting: "#FFFFFF"
};
window.addEventListener('load', function () {
    const backBtn = document.getElementById("backBtn");
    const applyBtn = document.getElementById("applyBtn");
    const strokeColorPicker = document.getElementById("strokeColorPicker");
    const fillColorPicker = document.getElementById("fillColorPicker");
    const customCursorPath = document.getElementById("customCursorPath");
    const pinkPalette = document.getElementById("pinkPalette");
    const techPalette = document.getElementById("techPalette");
    const reversePalette = document.getElementById("reversePalette");
    const magentaPalette = document.getElementById("magentaPalette");
    backBtn.addEventListener("click", function () {
        window.location.href = "main.html";
    });
    applyBtn.addEventListener("click", function () {
        updateDefault();
        window.location.href = "main.html";
    });
    strokeColorPicker.addEventListener("input", function (event) {
        customCursorPath.style.stroke = event.target.value;
    });
    strokeColorPicker.addEventListener("change", function (event) {
        defaultCursor.strokeSetting = event.target.value;
    });
    fillColorPicker.addEventListener("input", function (event) {
        customCursorPath.style.fill = event.target.value;
    });
    fillColorPicker.addEventListener("change", function (event) {
        defaultCursor.fillSetting = event.target.value;
    });
    pinkPalette.addEventListener("click", function () {
        customCursorPath.style.stroke = '#FE7171';
        customCursorPath.style.fill = '#FFFFFF';
        defaultCursor.strokeSetting = '#FE7171';
        defaultCursor.fillSetting = '#FFFFFF';
        strokeColorPicker.value = '#FE7171';
        fillColorPicker.value = '#FFFFFF';
    });
    techPalette.addEventListener("click", function () {
        customCursorPath.style.stroke = '#3DDE56';
        customCursorPath.style.fill = '#0B0B0B';
        defaultCursor.strokeSetting = '#3DDE56';
        defaultCursor.fillSetting = '#0B0B0B';
        strokeColorPicker.value = '#3DDE56';
        fillColorPicker.value = '#0B0B0B';
    });
    reversePalette.addEventListener("click", function () {
        customCursorPath.style.stroke = '#FFFFFF';
        customCursorPath.style.fill = '#0B0B0B';
        defaultCursor.strokeSetting = '#FFFFFF';
        defaultCursor.fillSetting = '#0B0B0B';
        strokeColorPicker.value = '#FFFFFF';
        fillColorPicker.value = '#0B0B0B';
    });
    magentaPalette.addEventListener("click", function () {
        customCursorPath.style.stroke = '#FF00D0';
        customCursorPath.style.fill = '#0B0B0B';
        defaultCursor.strokeSetting = '#FF00D0';
        defaultCursor.fillSetting = '#0B0B0B';
        strokeColorPicker.value = '#FF00D0';
        fillColorPicker.value = '#0B0B0B';
    });
    getCurrentDefault();
});
function updateDefault() {
    chrome.storage.sync.get('defaultCursorSettings', function (result) {
        if (chrome.runtime.lastError) {
            console.error('Error retrieving stored settings:', chrome.runtime.lastError);
            return;
        }
        const defaultCursorSettings = result.defaultCursorSettings || {};
        defaultCursorSettings.strokeSetting = defaultCursor.strokeSetting;
        defaultCursorSettings.fillSetting = defaultCursor.fillSetting;
        chrome.storage.sync.set({ defaultCursorSettings: defaultCursorSettings }, function () {
            if (chrome.runtime.lastError) {
                console.error('Error updating default cursor settings:', chrome.runtime.lastError);
                return;
            }
            console.log('Updated default cursor settings successfully.');
        });
    });
}
function getCurrentDefault() {
    chrome.storage.sync.get('defaultCursorSettings', function (result) {
        if (chrome.runtime.lastError) {
            console.error('Error retrieving stored settings:', chrome.runtime.lastError);
            return;
        }
        const defaultCursorSettings = result.defaultCursorSettings || {};
        const strokeColorPicker = document.getElementById("strokeColorPicker");
        const fillColorPicker = document.getElementById("fillColorPicker");
        const customCursorPath = document.getElementById("customCursorPath");

        defaultCursor.strokeSetting = defaultCursorSettings.strokeSetting;
        defaultCursor.fillSetting = defaultCursorSettings.fillSetting;
        strokeColorPicker.value = defaultCursorSettings.strokeSetting;
        fillColorPicker.value = defaultCursorSettings.fillSetting;
        customCursorPath.style.stroke = defaultCursorSettings.strokeSetting;
        customCursorPath.style.fill = defaultCursorSettings.fillSetting;
    });
}