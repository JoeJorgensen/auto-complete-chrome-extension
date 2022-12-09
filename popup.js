// Get the user's ID from the storage
chrome.storage.sync.get('userId', (data) => {
    // Get the user's ID
    const userId = data.userId;
  
    // Get the personal information and auto complete options from the storage
    chrome.storage.sync.get(null, (data) => {
      // Set the values of the personal information and auto complete options in the UI
      document.querySelector(`#${userId}-first-name-input`).value = data.firstName;
      document.querySelector(`#${userId}-last-name-input`).value = data.lastName;
      document.querySelector(`#${userId}-phone-number-input`).value = data.phoneNumber;
      document.querySelector(`#${userId}-email-input`).value = data.email;
      document.querySelector(`#${userId}-password-input`).value = data.password;
      document.querySelector(`#${userId}-first-name-checkbox`).checked = data.firstNameCheckbox;
      document.querySelector(`#${userId}-last-name-checkbox`).checked = data.lastNameCheckbox;
      document.querySelector(`#${userId}-phone-number-checkbox`).checked = data.phoneNumberCheckbox;
      document.querySelector(`#${userId}-email-checkbox`).checked = data.emailCheckbox;
      document.querySelector(`#${userId}-password-checkbox`).checked = data.passwordCheckbox;
    });
  
    // Listen for the form submission in the UI
    document.querySelector('form').addEventListener('submit', (e) => {
      // Prevent the default form submission behavior
      e.preventDefault();
  
      // Get the values of the personal information and auto complete options from the UI
      const firstName = document.querySelector(`#${userId}-first-name-input`).value;
      const lastName = document.querySelector(`#${userId}-last-name-input`).value;
      const phoneNumber = document.querySelector(`#${userId}-phone-number-input`).value;
      const email = document.querySelector(`#${userId}-email-input`).value;
      const password = document.querySelector(`#${userId}-password-input`).value;
      const firstNameCheckbox = document.querySelector(`#${userId}-first-name-checkbox`).checked;
      const lastNameCheckbox = document.querySelector(`#${userId}-last-name-checkbox`).checked;
      const phoneNumberCheckbox = document.querySelector(`#${userId}-phone-number-checkbox`).checked;
      const emailCheckbox = document.querySelector(`#${userId}-email-checkbox`).checked;
      const passwordCheckbox = document.querySelector(`#${userId}-password-check`).checked;
    });

  chrome.storage.sync.set({
  firstName,
  lastName,
  phoneNumber,
  email,
  password,
  firstNameCheckbox,
  lastNameCheckbox,
  phoneNumberCheckbox,
  emailCheckbox,
  passwordCheckbox
});
})