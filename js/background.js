chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log("Message received:", message);
  
    if (message.action === "collectUrls") {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        console.log("Tabs found:", tabs);
        const activeTab = tabs[0];
        if (activeTab) {
          console.log("Active tab:", activeTab);
          chrome.scripting.executeScript({
            target: { tabId: activeTab.id },
            function: collectUrls,
          });
        }
      });
    }
  });
  
  
  function collectUrls() {
    console.log("Function entered: Yes");
    const urls = [];
    const items = document.querySelectorAll('a[data-testid^="product-item-id-"]');
    for (const item of items) {
      const url = item.getAttribute("href");
      urls.push(url);
    }
    console.log(urls);
  }
  