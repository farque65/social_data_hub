chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'scrapeTwitterThread') {
    scrapeAndDownloadThread();
  }
});

function scrapeAndDownloadThread() {
  let tweets = [];
  let tweetElements = document.querySelectorAll('article');

  tweetElements.forEach((tweet) => {
    let tweetText = tweet.innerText;
    tweets.push(tweetText);
  });

  let threadText = tweets.join('\n\n');
  downloadTextFile(threadText, 'twitter_thread.txt');
}

function downloadTextFile(text, filename) {
  let blob = new Blob([text], { type: 'text/plain' });
  let url = URL.createObjectURL(blob);
  let a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
