chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'scrapeTwitterThread') {
    chrome.scripting.executeScript(
      {
        target: { tabId: message.tabId },
        function: scrapeTwitterThread
      },
      (results) => {
        if (results && results[0] && results[0].result) {
          sendResponse({ data: results[0].result });
        }
      }
    );
    return true; // Indicate that the response is asynchronous
  }
});

function scrapeTwitterThread() {
  let tweets = [];
  let tweetElements = document.querySelectorAll('article');

  tweetElements.forEach((tweet) => {
    let tweetText = tweet.innerText;
    tweets.push(tweetText);
  });

  return tweets.join('\n\n');
}
