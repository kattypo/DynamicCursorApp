window.addEventListener('load', function () {
    loadPage();
    let backBtn = document.getElementById("backBtn");
    backBtn.addEventListener("click", function () {
        window.location.href = "main.html";
    });
});

function loadPage() {
    let list = document.getElementById("siteList");
    chrome.storage.sync.get('siteSettings', function (result) {
        if (chrome.runtime.lastError) {
            console.error('Error retrieving siteSettings:', chrome.runtime.lastError);
            return;
        }
        let siteSettings = result.siteSettings || [];
        //for (let i = 0; i < siteSettings.length; ++i) {
        //    let li = document.createElement('li');
        //    li.innerHTML = siteSettings[i].name;
        //    list.appendChild(li);
        //}
    });
}
