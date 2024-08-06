// Copyright 2022 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

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
