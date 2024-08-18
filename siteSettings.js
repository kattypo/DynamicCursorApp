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
        for (let i = 0; i < siteSettings.length; ++i) {
            addScreenElement(siteSettings[i], i);
        }
    });
}
function addScreenElement(siteData, i) {
    const container = document.getElementById("container");
    const parentDiv = document.createElement('div');
    parentDiv.className = 'section container rounded';

    const rowDiv = document.createElement('div');
    rowDiv.className = 'row';

    const nameRowDiv = document.createElement('div');
    nameRowDiv.className = 'row';

    const nameColDiv = document.createElement('div');
    nameColDiv.className = 'col';

    const editColDiv = document.createElement('div');
    editColDiv.className = 'col';

    const removeColDiv = document.createElement('div');
    removeColDiv.className = 'col';

    const nameLabel = document.createElement('label');
    nameLabel.className = 'text-break';
    nameLabel.textContent = siteData.name;

    const editButton = document.createElement('button');
    editButton.id = `editButton` + i;
    editButton.className = 'btn editBtn';
    editButton.textContent = 'Edit'; 

    const removeButton = document.createElement('button');
    removeButton.id = `removeButton` + i;
    removeButton.className = 'btn removeBtn btn-secondary border border-0';
    removeButton.textContent = 'Remove'; 

    editButton.addEventListener('click', function () {
        chrome.storage.sync.get('siteDataToUpdate', function (result) {
            if (chrome.runtime.lastError) {
                console.error('Error retrieving site data to update:', chrome.runtime.lastError);
                return;
            }
            let siteDataToUpdate = result.siteDataToUpdate || {};
            siteDataToUpdate.name = siteData.name;
            siteDataToUpdate.strokeSetting = siteData.strokeSetting;
            siteDataToUpdate.fillSetting = siteData.fillSetting;
            siteDataToUpdate.position = i;
            chrome.storage.sync.set({ siteDataToUpdate: siteDataToUpdate }, function () {
                if (chrome.runtime.lastError) {
                    console.error('Error setting site data to update:', chrome.runtime.lastError);
                    return;
                }
                console.log('Successfully sent site data to update');
                window.location.href = "editSite.html";
            });
        });
    });
    removeButton.addEventListener('click', function () {
        chrome.storage.sync.get('siteSettings', function (result) {
            if (chrome.runtime.lastError) {
                console.error('Error retrieving stored settings:', chrome.runtime.lastError);
                return;
            }
            let siteSettings = result.siteSettings || [];
            siteSettings.splice(i, 1);
            chrome.storage.sync.set({ siteSettings: siteSettings }, function () {
                if (chrome.runtime.lastError) {
                    console.error('Error updating stored settings:', chrome.runtime.lastError);
                    return;
                }
                console.log('Updated stored sites successfully.');
                window.location.href = "main.html";
            });
        });
    });
    nameColDiv.appendChild(nameLabel);
    nameRowDiv.appendChild(nameColDiv);
    editColDiv.appendChild(editButton);
    removeColDiv.appendChild(removeButton);
    rowDiv.appendChild(editColDiv);
    rowDiv.appendChild(removeColDiv);
    parentDiv.appendChild(nameRowDiv);
    parentDiv.appendChild(rowDiv);
    container.appendChild(parentDiv);

    //this page needs a scrollbar
}
