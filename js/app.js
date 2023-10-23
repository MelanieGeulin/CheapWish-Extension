function collectUrls() {
    const urls = [];
    const items = document.querySelectorAll('a[data-testid^="product-item-id-"]');
    for (const item of items) {
      const url = item.getAttribute("href");
      urls.push(url);
    }
    
    // Send the collected URLs to the background script
    chrome.runtime.sendMessage({ action: "logUrls", urls });
  }