/*
    Wrapper for the Pokki Popup



 */

// Global variable for our core app
var Paint = false;

// Add listener for when the popup is first loaded
// Perform popup page initiation and configuration
// NOTE: DOMContentLoaded is the ideal event to listen for as it doesn't
// wait for external resources (like images) to be loaded
function load() {
	console.log('Popup page is loaded.');
	Paint = new App();
    Paint.onCreated();
}
window.addEventListener('DOMContentLoaded', load, false);

// Add listener for when the page is unloaded by the platform 
// This occurs due to inactivity or memory usage
// You have 4 seconds from this event to save/store any data
function unload() {
    console.log('Popup page is being unloaded.');
	// Time to save any state
	if (Paint) {
		Paint.onPopupUnload();
	}
}
pokki.addEventListener('popup_unload', unload);

// Add listener for when the popup window is showing
function showing() {
    console.log('Popup window is almost visible.');    
    if (Paint){
    	Paint.onPopupShowing();
    }
}
pokki.addEventListener('popup_showing', showing);

// Add listener for when the popup window is shown
function shown() {
    console.log('Popup window is visible.');
    if (Paint) {
    	Paint.onPopupShown();
    }
}
pokki.addEventListener('popup_shown', shown);

// Add listener for when the pop-up window is hidden
function hidden() {
    console.log('Popup window was hidden.');
    if (Paint) {
    	Paint.onPopupHidden();
    }
}
pokki.addEventListener('popup_hidden', hidden);