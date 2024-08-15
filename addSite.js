let siteName = null;
let strokeColor = "#3EE258";
let fillColor = "#000000";

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
    let darkStrokeColorPicker = document.getElementById("darkStrokeColorPicker");
    let darkFillColorPicker = document.getElementById("darkFillColorPicker");
    let darkModeBtn = document.getElementById("darkModeBtn");
    let customImageFile = document.getElementById("customImageFile");

    backBtn.addEventListener("click", function () {
        window.location.href = "main.html";
    });
    applyBtn.addEventListener("click", function () {
        if (siteName != null) {
            site.name = siteName;
            site.strokeSetting = strokeColor;
            site.fillSetting = fillColor;
            addToStorage();
        }
    });
    strokeColorPicker.addEventListener("input", function (event) {
        let customCursorPath = document.getElementById("customCursorPath");
        customCursorPath.style.stroke = event.target.value;
    });
    strokeColorPicker.addEventListener("change", function (event) {
        strokeColor = event.target.value;
    });
    fillColorPicker.addEventListener("input", function (event) {
        let customCursorPath = document.getElementById("customCursorPath");
        customCursorPath.style.fill = event.target.value;
    });
    fillColorPicker.addEventListener("change", function (event) {
        fillColor = event.target.value;
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
        siteName = domain;
    })();
}
function convertToDataURL(input) {
    let encodedSvg = encodeURIComponent(input).replace(/#/g, '%23');
    let convertedData = 'data:image/svg+xml;utf8,' + encodedSvg;
    return convertedData;
}
function buildCursor(fill, stroke) {
    let svgImage = '<svg viewBox="0 0 50 50" width="32px" height="32px" version="1.1" xmlns="http://www.w3.org/2000/svg"><path style="fill: #000000; fill-opacity: 1; stroke: #3EE258; stroke-width: 1.875; stroke-dasharray: none; stroke-opacity: 1 " d="m 14.577772,6.3866376 0.07601,32.2574274 a 0.58506117,0.58506117 22.549089 0 0 0.997073,0.414002 l 7.014118,-6.957257 a 0.28235062,0.28235062 10.877941 0 1 0.457815,0.08798 l 5.884077,13.547126 a 1.0003742,1.0003742 21.076358 0 0 1.330343,0.512706 l 3.864349,-1.750506 a 0.67290989,0.67290989 110.0408 0 0 0.329453,-0.903162 L 27.98401,29.89869 a 0.27960205,0.27960205 120.55962 0 1 0.23601,-0.399715 l 10.688963,-0.622376 a 0.56064347,0.56064347 109.7984 0 0 0.349262,-0.970197 L 15.629707,5.9269948 a 0.62574521,0.62574521 156.39708 0 0 -1.051935,0.4596428 z" /></svg>';
    svgImage = svgImage.replace(/fill:.*?;/g, "fill: " + fill + ";");
    svgImage = svgImage.replace(/stroke:.*?;/g, "stroke: " + stroke + ";");
    let dataURL = convertToDataURL(svgImage);
    return dataURL;
}
function addToStorage() {
    chrome.storage.sync.get('siteSettings', function (result) {
        if (chrome.runtime.lastError) {
            console.error('Error retrieving stored settngs:', chrome.runtime.lastError);
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