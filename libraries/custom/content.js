console.log("Content.js says Hi :)");

chrome.browserAction.onClicked.addListener(buttonClicked);

function buttonClicked(tab){
    console.log("Button clicked")
    console.log(tab)
}

// chrome.runtime.omMessage.addListener