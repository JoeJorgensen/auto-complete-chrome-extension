document.addEventListener('focusin', function(e) {
    var field = e.target;
    
    if (field.type === 'text' || field.type === 'email' || field.type === 'password') {
    if (options.firstName && field.name.toLowerCase().includes('first')) {
    field.value = "John";
    }
    if (options.lastName && field.name.toLowerCase().includes('last')) {
    field.value = "Doe";
    }
    if (options.phoneNumber && field.name.toLowerCase().includes('phone')) {
    field.value = "123-456-7890";
    }
    if (options.email && field.name.toLowerCase().includes('email')) {
    field.value = "john.doe@gmail.com";
    }
    if (options.password && field.name.toLowerCase().includes('password')) {
    field.value = "password123";
    }
    }
    });