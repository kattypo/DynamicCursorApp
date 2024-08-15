let siteName;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onPageLoad);
}
else {
    onPageLoad();
}
function getSiteName() {
    return new Promise(async (resolve, reject) => {
        try {
            siteName = await getTabUrl();
            resolve(siteName); 
        } catch (error) {
            console.error('Error retrieving tab URL:', error);
            reject(error); 
        }
    });
}
function getTabUrl() {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({ command: 'getTabUrl' }, (response) => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError);
            } else {
                const modifiedUrl = modifyUrl(response.url);
                resolve(modifiedUrl);
            }
        });
    });
}
function updateCursor(domain) { //done
    chrome.storage.sync.get('siteSettings', function (result) {
        if (chrome.runtime.lastError) {
            console.error('Error retrieving siteSettings:', chrome.runtime.lastError);
            return;
        }
        let siteSettings = result.siteSettings || [];
        for (let i = 0; i < siteSettings.length; ++i) {
            if (siteSettings[i].name == domain) {
                let body = document.body;
                let cursorUrl = buildCursor(siteSettings[i].fillSetting, siteSettings[i].strokeSetting);
                body.style.cursor = 'url(' + cursorUrl + '), auto';
                console.log('Match found:', domain);
                return;
            }
        }
        console.log('No settings found for this domain.');
    });
}

function modifyUrl(tabUrl) { //gets the domain name from the URL
    const parsedUrl = new URL(tabUrl);
    let domain = parsedUrl.hostname;
    console.log('This is the domain: ' + domain);
    return domain;

}
function onPageLoad() {
    (async () => {
        try {
            const name = await getSiteName();
            siteName = name;
            updateCursor(siteName);
        } catch (error) {
            console.error('Error handling site name:', error);
        }
    })();
}
function buildCursor(fill, stroke) {
    let svgImage = '<svg viewBox="0 0 50 50" width="32px" height="32px" version="1.1" xmlns="http://www.w3.org/2000/svg"><path style="fill: #000000; fill-opacity: 1; stroke: #3EE258; stroke-width: 1.875; stroke-dasharray: none; stroke-opacity: 1 " d="m 14.577772,6.3866376 0.07601,32.2574274 a 0.58506117,0.58506117 22.549089 0 0 0.997073,0.414002 l 7.014118,-6.957257 a 0.28235062,0.28235062 10.877941 0 1 0.457815,0.08798 l 5.884077,13.547126 a 1.0003742,1.0003742 21.076358 0 0 1.330343,0.512706 l 3.864349,-1.750506 a 0.67290989,0.67290989 110.0408 0 0 0.329453,-0.903162 L 27.98401,29.89869 a 0.27960205,0.27960205 120.55962 0 1 0.23601,-0.399715 l 10.688963,-0.622376 a 0.56064347,0.56064347 109.7984 0 0 0.349262,-0.970197 L 15.629707,5.9269948 a 0.62574521,0.62574521 156.39708 0 0 -1.051935,0.4596428 z" /></svg>';
    svgImage = svgImage.replace(/fill:.*?;/g, "fill: " + fill + ";");
    svgImage = svgImage.replace(/stroke:.*?;/g, "stroke: " + stroke + ";");
    let encodedSvg = encodeURIComponent(svgImage).replace(/#/g, '%23');
    let convertedData = 'data:image/svg+xml;utf8,' + encodedSvg;
    return convertedData;
}
//function convertToDataURL(input) {
//    let encodedSvg = encodeURIComponent(input).replace(/#/g, '%23');
//    let convertedData = 'data:image/svg+xml;utf8,' + encodedSvg;
//    return convertedData;
//}
