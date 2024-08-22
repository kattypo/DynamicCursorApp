let site = { //dictionary to be stored 
    name: null,
    strokeSetting: "#3EE258",
    fillSetting: "#000000"
};
window.addEventListener('load', function () {
    let backBtn = document.getElementById("backBtn");
    let applyBtn = document.getElementById("applyBtn");
    let strokeColorPicker = document.getElementById("strokeColorPicker");
    let fillColorPicker = document.getElementById("fillColorPicker");
    //let darkStrokeColorPicker = document.getElementById("darkStrokeColorPicker");
    //let darkFillColorPicker = document.getElementById("darkFillColorPicker");
    //let darkModeBtn = document.getElementById("darkModeBtn");
    let customImageFile = document.getElementById("customImageFile");

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
    //revamp to be used for the hand icon
    //darkStrokeColorPicker.addEventListener("input", function (event) {
    //    let darkCursorPath = document.getElementById("darkCursorPath");
    //    darkCursorPath.style.stroke = event.target.value;
    //});
    //darkStrokeColorPicker.addEventListener("change", function (event) {
    //    darkStrokeColor = event.target.value;
    //});
    //darkFillColorPicker.addEventListener("input", function (event) {
    //    let darkCursorPath = document.getElementById("darkCursorPath");
    //    darkCursorPath.style.fill = event.target.value;
    //});
    //darkFillColorPicker.addEventListener("change", function (event) {
    //    darkFillColor = event.target.value;
    //});
    //darkModeBtn.addEventListener("click", function () {
    //    let darkModeSettings = document.getElementById("darkModeSettings");
    //    if (darkModeSettings.style.display !== 'flex') {
    //        darkModeSettings.style.display = 'flex';
    //        darkModeBtn.innerHTML = "Disable Dark Mode";
    //        darkModeEnabled = true;
    //    }
    //    else {
    //        darkModeSettings.style.display = 'none';
    //        darkModeBtn.innerHTML = "Enable Dark Mode";
    //        darkModeEnabled = false;
    //    }
    //});
    loadSitePage();
});
function loadSitePage() {
    let domain;
    let siteNameLabel = document.getElementById("siteNameLabel");
    (async () => {
        const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
        let name = tab.url;
        let parsedUrl = new URL(name);
        domain = parsedUrl.hostname;
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
        let siteSettings = result.siteSettings || [];
        siteSettings.push(site);
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
//add function to check if its already been added to the list and return a error