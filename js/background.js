chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "collectUrls") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const activeTab = tabs[0];
      if (activeTab) {
        // Check if the active tab's URL matches the expected URL
        const expectedUrl = "https://www.vinted.fr/member/items/favourite_list";
        if (activeTab.url === expectedUrl) {
          chrome.scripting.executeScript({
            target: { tabId: activeTab.id },
            function: collectUrls,
          });
        } else {
          // Display a notification for the wrong page
          chrome.notifications.create({
            type: "basic",
            iconUrl: "../img/icon.png",
            title: "Wrong Page",
            message: "This extension is only available on the expected page.",
          });
        }
      }
    });
  }

  // Handle the URLs and create a text file for download
  if (message.action === "logUrls") {
    const urls = message.urls;
    const urlsText = urls.join('\n'); // Convert the URLs to a text string

    // Use chrome.downloads to initiate the download with overwrite
    chrome.downloads.download({
      url: "data:text/plain;base64," + btoa(urlsText), // Encode the text as base64
      filename: "You_adorable_cheapsake.txt",
      saveAs: false, // Do not prompt for a download location
      conflictAction: "overwrite", // Overwrite if the file already exists
    });
  }
});

function collectUrls() {
  const urls = [];
  const items = document.querySelectorAll('a[data-testid^="product-item-id-"]');
  for (const item of items) {
    const url = item.getAttribute("href");
    urls.push(url);
  }
  chrome.runtime.sendMessage({ action: "logUrls", urls });
}
