// Register the service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('service-worker.js')
      .then(registration => {
        console.log('Service worker registered:', registration);
      })
      .catch(error => {
        console.log('Service worker registration failed:', error);
      });
    });
  }
  
  // Listen for messages from the service worker
  navigator.serviceWorker.addEventListener('message', event => {
    // Handle the message
    if (event.data.type === 'form-filled') {
      // Do something with the filled form data
      console.log(event.data.formData);
    }
  });
 // Listen for the form submission event on all websites
document.addEventListener('submit', (e) => {
    // Send an auto complete request to the content script
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {type: 'autoComplete'});
    });
  });
