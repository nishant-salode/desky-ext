console.log("Backgroundr js says Ahoy!");
chrome.browserAction.onClicked.addListener(buttonClicked);

function buttonClicked(tab){
    console.log("Button clicked")
    console.log(tab)
}