let position = null;

let site = {
    name: null,
    strokeSetting: null,
    fillSetting: null
};
window.addEventListener('load', function () {
    const backBtn = document.getElementById("backBtn");
    const applyBtn = document.getElementById("applyBtn");
    const strokeColorPicker = document.getElementById("strokeColorPicker");
    const fillColorPicker = document.getElementById("fillColorPicker");
    backBtn.addEventListener("click", function () {
        window.location.href = "siteSettings.html";
    });
    applyBtn.addEventListener("click", function () {
        if (site.name != null) {
            updateStorage();
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
        const customCursorPath = document.getElementById("customCursorPath");
        customCursorPath.style.fill = event.target.value;
    });
    fillColorPicker.addEventListener("change", function (event) {
        site.fillSetting = event.target.value;
    });
    insertSiteData();
});
function updateStorage() {
    chrome.storage.sync.get('siteSettings', function (result) {
        if (chrome.runtime.lastError) {
            console.error('Error retrieving stored settngs:', chrome.runtime.lastError);
            return;
        }
        const siteSettings = result.siteSettings || [];
        if (position != null) {
            siteSettings[position] = site;
        }
        chrome.storage.sync.set({ siteSettings: siteSettings }, function () {
            if (chrome.runtime.lastError) {
                console.error('Error updating stored settings:', chrome.runtime.lastError);
                return;
            }
            console.log('Updated stored sites successfully.');
        });
    });
}
function insertSiteData() {
    chrome.storage.sync.get('siteDataToUpdate', function (result) {
        if (chrome.runtime.lastError) {
            console.error('Error retrieving site data to update:', chrome.runtime.lastError);
            return;
        }
        const siteDataToUpdate = result.siteDataToUpdate || {};
        const siteNameLabel = document.getElementById("siteNameLabel");
        const strokeColorPicker = document.getElementById("strokeColorPicker");
        const fillColorPicker = document.getElementById("fillColorPicker");
        const customCursorPath = document.getElementById("customCursorPath");

        site.name = siteDataToUpdate.name;
        site.strokeSetting = siteDataToUpdate.strokeSetting;
        site.fillSetting = siteDataToUpdate.fillSetting;
        position = siteDataToUpdate.position;

        siteNameLabel.innerHTML = siteDataToUpdate.name;
        strokeColorPicker.value = siteDataToUpdate.strokeSetting;
        fillColorPicker.value = siteDataToUpdate.fillSetting;
        customCursorPath.style.stroke = siteDataToUpdate.strokeSetting;
        customCursorPath.style.fill = siteDataToUpdate.fillSetting;

        siteDataToUpdate.name = null;
        siteDataToUpdate.strokeSetting = null;
        siteDataToUpdate.fillSetting = null;
        siteDataToUpdate.position = null;
        chrome.storage.sync.set({ siteDataToUpdate: siteDataToUpdate }, function () {
            if (chrome.runtime.lastError) {
                console.error('Error clearing previous site data:', chrome.runtime.lastError);
                return;
            }
            console.log('Successfully cleared previous site data');
        });
    });
}