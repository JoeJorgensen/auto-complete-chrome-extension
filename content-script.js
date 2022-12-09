// Listen for form submissions
document.addEventListener('submit', event => {
    // Check if the form is a supported type
    if (event.target.tagName === 'FORM' && event.target.method === 'POST') {
      // Get the form data from storage
      chrome.storage.sync.get(['firstName', 'lastName', 'phoneNumber', 'email', 'password'], items => {
        // Check if the form fields should be auto completed
        if (items.firstName) {
          // Set the first name in the form
          event.target.elements.firstName.value = items.firstName;
        }
        if (items.lastName) {
          // Set the last name in the form
          event.target.elements.lastName.value = items.lastName;
        }
        if (items.phoneNumber) {
          // Set the phone number in the form
          event.target.elements.phoneNumber.value = items.phoneNumber;
        }
        if (items.email) {
          // Set the email in the form
          event.target.elements.email.value = items.email;
        }
        if (items.password) {
          // Set the password in the form
          event.target.elements.password.value = items.password;
        }
      });
    }
  });
  
  // Listen for form response data from the service worker
  navigator.serviceWorker.addEventListener('message', event => {
    // Handle the message
    if (event.data.type === 'form-filled') {
      // Get the form data from the message
      const formData = event.data.formData;
  
      // Save the form data in storage
      chrome.storage.sync.set({
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        password: formData.password
      });
    }
  });

  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // Check if the message is the auto complete request
    if (request.type === 'autoComplete') {
      // Get the personal information and auto complete options from the storage
      chrome.storage.sync.get(null, (data) => {
        // Check if the first name should be auto completed
        if (data.firstNameCheckbox) {
          // Find the first name form field and set its value with the saved first name
          const firstNameField = document.querySelector('#first-name-field-id');
          firstNameField.value = data.firstName;
        }
  
        // Check if the last name should be auto completed
        if (data.lastNameCheckbox) {
          // Find the last name form field and set its value with the saved last name
          const lastNameField = document.querySelector('#last-name-field-id');
          lastNameField.value = data.lastName;
        }
  
        // Check if the phone number should be auto completed
        if (data.phoneNumberCheckbox) {
          // Find the phone number form field and set its value with the saved phone number
          const phoneNumberField = document.querySelector('#phone-number-field-id');
          phoneNumberField.value = data.phoneNumber;
        }
  
        // Check if the email should be auto completed
        if (data.emailCheckbox) {
          // Find the email form field and set its value with the saved email
          const emailField = document.querySelector('#email-field-id');
          emailField.value = data.email;
        }
  
        // Check if the password should be auto completed
        if (data.passwordCheckbox) {
          // Find the password form field and set its value with the saved password
          const passwordField = document.querySelector('#password-field-id');
          passwordField.value = data.password;
        }
      });
    }
  });