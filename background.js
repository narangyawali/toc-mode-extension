
chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: 'OFF'
  });
});

function RemoveToc(){

	const tocContainer = document.querySelector(".toc-container");
    document.body.removeChild(tocContainer);

}

// When the user clicks on the extension action
chrome.action.onClicked.addListener(async (tab) => {
    const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
    // Next state will always be the opposite
    const nextState = prevState === 'ON' ? 'OFF' : 'ON';

    // Set the action badge to the next state
    await chrome.action.setBadgeText({
      tabId: tab.id,
      text: nextState
    });

    if (nextState === 'ON') {
		await chrome.scripting.executeScript({
			target:{tabId:tab.id},
			files:["toc_script.js"]
		});
		await chrome.scripting.insertCSS({
			target:{tabId:tab.id},
			files:["toc_style.css"]
		});
      // Insert the CSS file when the user turns the extension on
      // await chrome.scripting.insertCSS({
      //   files: ['focus-mode.css'],
      //   target: { tabId: tab.id }
      // });

    } else if (nextState === 'OFF') {
		await chrome.scripting.executeScript({
			target:{tabId:tab.id},
			func:RemoveToc,
		}).then(()=>{console.log("toc removed")});
      // Remove the CSS file when the user turns the extension off
      // await chrome.scripting.removeCSS({
      //   files: ['focus-mode.css'],
      //   target: { tabId: tab.id }
      // });
    }
});


// for search the meaning 
//

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "searchMeaning",
    title: "Search meaning of '%s'",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "searchMeaning") {
    const query = info.selectionText;
    const searchUrl = `https://www.google.com/search?q=meaning+of+${encodeURIComponent(query)}`;
    chrome.tabs.create({ url: searchUrl });
  }
});

chrome.commands.onCommand.addListener((command) => {
  if (command === "search-meaning") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: searchHighlightedText
      });
    });
  }
});

function searchHighlightedText() {
  const selection = window.getSelection().toString().trim();
  if (selection) {
    const searchUrl = `https://www.google.com/search?q=meaning+of+${encodeURIComponent(selection)}`;
    window.open(searchUrl, '_blank');
  } else {
    alert("Please highlight a word or phrase to search for its meaning.");
  }
}


