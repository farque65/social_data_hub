document.getElementById('scrape-thread').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.runtime.sendMessage({ action: 'scrapeTwitterThread' });
  });
});
