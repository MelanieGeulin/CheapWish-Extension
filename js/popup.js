document.addEventListener("DOMContentLoaded", function () {
    const collectButton = document.getElementById("collect-urls");
    collectButton.addEventListener("click", function () {
      chrome.runtime.sendMessage({ action: "collectUrls" });
    });
  });
  