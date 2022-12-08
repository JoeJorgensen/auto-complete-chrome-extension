const storageKey = 'personalInfo';

// Set up listener for form inputs
document.addEventListener('input', (event) => {
// Check if input is a form field
if (event.target.tagName === 'INPUT') {
// Get stored personal information
chrome.storage.sync.get([storageKey], (result) => {
const personalInfo = result[storageKey];
// Check if personal information exists and if field should be auto completed
if (personalInfo && personalInfo[event.target.name] && personalInfo[event.target.name].autoComplete) {
// Set input value to stored personal information
event.target.value = personalInfo[event.target.name].value;
}
});
}
});