function collectUrls() {
    // Get the current tab's URL
    chrome.scripting.executeScript({
      target: { tabId: chrome.tabs.TAB_ID },
      func: (tab) => {
        const currentTabURL = tab.url;
        if (currentTabURL === "https://www.vinted.fr/member/items/favourite_list") {
          // Continue with URL collection
          const urls = [];
          const items = document.querySelectorAll('a[data-testid^="product-item-id-"]');
          for (const item of items) {
            const url = item.getAttribute("href");
            urls.push(url);
          }
          chrome.runtime.sendMessage({ action: "logUrls", urls });
        } else {
          // Send a notification for the wrong tab
          chrome.runtime.sendMessage({ action: "wrongTab" });
        }
      },
    });
  }
  