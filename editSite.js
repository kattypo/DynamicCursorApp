let position = null;

let site = {
    name: null,
    strokeSetting: null,
    fillSetting: null
};
window.addEventListener('load', function () {
    let backBtn = document.getElementById("backBtn");
    let applyBtn = document.getElementById("applyBtn");
    let strokeColorPicker = document.getElementById("strokeColorPicker");
    let fillColorPicker = document.getElementById("fillColorPicker");
    let customImageFile = document.getElementById("customImageFile");
    backBtn.addEventListener("click", function () {
        window.location.href = "main.html";
    });
    applyBtn.addEventListener("click", function () {
        if (site.name != null) {
            updateStorage();
            window.location.href = "main.html";
        }
    });
    strokeColorPicker.addEventListener("input", function (event) {
        let customCursorPath = document.getElementById("customCursorPath");
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
    customImageFile.addEventListener("change", function (event) {
        let selectedFile;
        let customCursorImage = document.getElementById('customCursorImage');
        let imagePreview = document.getElementById("imagePreview");
        if (event.target.files.length > 0) {
            selectedFile = event.target.files[0];
            let reader = new FileReader();
            customCursorImage.title = selectedFile.name;
            reader.onload = function (event) {
                customCursorImage.src = event.target.result;
            };
            reader.readAsDataURL(selectedFile);
            imagePreview.style.display = 'flex';
            fileUploaded = true;
        }
    });
    insertSiteData();
});
function updateStorage() {
    chrome.storage.sync.get('siteSettings', function (result) {
        if (chrome.runtime.lastError) {
            console.error('Error retrieving stored settngs:', chrome.runtime.lastError);
            return;
        }
        let siteSettings = result.siteSettings || [];
        for (let i = 0; i < siteSettings.length; ++i) {
            if (i == position) {
                siteSettings.splice(i, 1);
                siteSettings.push(site);
            }
        }
        console.log('New array:', siteSettings);
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
        let siteDataToUpdate = result.siteDataToUpdate || {};
        let siteNameLabel = document.getElementById("siteNameLabel");
        let strokeColorPicker = document.getElementById("strokeColorPicker");
        let fillColorPicker = document.getElementById("fillColorPicker");
        let customCursorPath = document.getElementById("customCursorPath");

        site.name = siteDataToUpdate.name;
        site.strokeSetting = siteDataToUpdate.strokeSetting;
        site.fillSetting = siteDataToUpdate.fillSetting;
        position = siteDataToUpdate.position;

        siteNameLabel.innerHTML = siteDataToUpdate.name;
        strokeColorPicker.value = siteDataToUpdate.strokeSetting;
        customCursorPath.style.stroke = siteDataToUpdate.strokeSetting;
        fillColorPicker.value = siteDataToUpdate.fillSetting;
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