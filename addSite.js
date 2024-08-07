
window.addEventListener('load', function () {
    let backBtn = document.getElementById("backBtn");
    let strokeColorPicker = document.getElementById("strokeColorPicker");
    let fillColorPicker = document.getElementById("fillColorPicker");
    let darkStrokeColorPicker = document.getElementById("darkStrokeColorPicker");
    let darkFillColorPicker = document.getElementById("darkFillColorPicker");
    let darkModeBtn = document.getElementById("darkModeBtn");
    let customImageFile = document.getElementById("customImageFile");

    backBtn.addEventListener("click", function () {
        window.location.href = "main.html";
    });
    strokeColorPicker.addEventListener("input", function (event) {
        let customCursorPath = document.getElementById("customCursorPath");
        customCursorPath.style.stroke = event.target.value;
    });
    fillColorPicker.addEventListener("input", function (event) {
        let customCursorPath = document.getElementById("customCursorPath");
        customCursorPath.style.fill = event.target.value;
    });
    darkStrokeColorPicker.addEventListener("input", function (event) {
        let darkCursorPath = document.getElementById("darkCursorPath");
        darkCursorPath.style.stroke = event.target.value;
    });
    darkFillColorPicker.addEventListener("input", function (event) {
        let darkCursorPath = document.getElementById("darkCursorPath");
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