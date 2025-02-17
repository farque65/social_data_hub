document.getElementById('scrape-thread').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.runtime.sendMessage(
      { action: 'scrapeTwitterThread', tabId: tabs[0].id },
      (response) => {
        if (response && response.data) {
          displayScrapedData(response.data);
        }
      }
    );
  });
});

function displayScrapedData(data) {
  const outputElement = document.getElementById('output');
  outputElement.textContent = data;

  // Enable the download button
  const downloadButton = document.getElementById('download-thread');
  downloadButton.disabled = false;
  downloadButton.addEventListener('click', () => {
    let date = new Date().toJSON();
    downloadTextFile(data, date+'_twitter_thread.txt');
  });
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

//function to adjust popup to display output
function displayOutput(output) {
	document.body.innerHTML = "<b>List<B><br>";
	for(var i = 0; i < output.length; i++){
		document.body.innerHTML +=  output[i]+"<br>";
	}
	document.body.style.height = "300px";
	document.body.style.width = "300px";
}

document.getElementById('take-screenshot').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.captureVisibleTab(tabs[0].windowId, { format: 'png' }, (dataUrl) => {
      document.getElementById('screenshot').src = dataUrl;
    });
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'scrapedData') {
    displayScrapedData(message.data);
  }
});

// Load scraped data from local storage when the popup is opened
// document.addEventListener('DOMContentLoaded', () => {
//   chrome.storage.local.get('scrapedData', (result) => {
//     if (result.scrapedData) {
//       displayScrapedData(result.scrapedData);
//     }
//   });
// });
