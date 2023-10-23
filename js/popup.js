document.addEventListener("DOMContentLoaded", function () {
  const collectButton = document.getElementById("collect-urls");
  collectButton.addEventListener("click", function () {
    // Get the active tab to check if it's the wrong tab
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const activeTab = tabs[0];
      if (activeTab) {
        chrome.runtime.sendMessage({ action: "collectUrls", isWrongTab: false });
      } else {
        // Handle the case where the active tab cannot be determined
        chrome.runtime.sendMessage({ action: "wrongTab" });
      }
    });
  });
});
