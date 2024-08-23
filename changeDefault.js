const defaultCursor = { //dictionary to be stored
    strokeSetting: "#000000",
    fillSetting: "#FFFFFF"
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
        updateDefault();
        window.location.href = "main.html";
    });
    strokeColorPicker.addEventListener("input", function (event) {
        const customCursorPath = document.getElementById("customCursorPath");
        customCursorPath.style.stroke = event.target.value;
    });
    strokeColorPicker.addEventListener("change", function (event) {
        defaultCursor.strokeSetting = event.target.value;
    });
    fillColorPicker.addEventListener("input", function (event) {
        const customCursorPath = document.getElementById("customCursorPath");
        customCursorPath.style.fill = event.target.value;
    });
    fillColorPicker.addEventListener("change", function (event) {
        defaultCursor.fillSetting = event.target.value;
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