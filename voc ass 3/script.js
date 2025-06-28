document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.getElementById('registrationForm');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const termsCheckbox = document.getElementById('terms');
    const emailInput = document.getElementById('email');
    const dobInput = document.getElementById('dob');
    const fullNameInput = document.getElementById('fullName');
    const genderInputs = document.querySelectorAll('input[name="gender"]');

    // Function to display error messages
    function displayError(inputElement, message) {
        let errorElement = inputElement.nextElementSibling;
        if (!errorElement || !errorElement.classList.contains('error-message')) {
            errorElement = document.createElement('div');
            errorElement.classList.add('error-message');
            inputElement.parentNode.insertBefore(errorElement, inputElement.nextSibling);
        }
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }

    // Function to clear error messages
    function clearError(inputElement) {
        const errorElement = inputElement.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
    }

    // Validation functions
    function validateFullName() {
        const fullName = fullNameInput.value.trim();
        if (fullName === '') {
            displayError(fullNameInput, 'Full Name is required.');
            return false;
        }
        clearError(fullNameInput);
        return true;
    }

    function validateEmail() {
        const email = emailInput.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '') {
            displayError(emailInput, 'Email Address is required.');
            return false;
        } else if (!emailPattern.test(email)) {
            displayError(emailInput, 'Please enter a valid email address.');
            return false;
        }
        clearError(emailInput);
        return true;
    }

    function validatePassword() {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        if (password.length < 8) {
            displayError(passwordInput, 'Password must be at least 8 characters long.');
            return false;
        }
        clearError(passwordInput);

        if (confirmPassword !== password) {
            displayError(confirmPasswordInput, 'Passwords do not match.');
            return false;
        }
        clearError(confirmPasswordInput);
        return true;
    }

    function validateDateOfBirth() {
        const dob = dobInput.value;
        if (dob === '') {
            displayError(dobInput, 'Date of Birth is required.');
            return false;
        }
        // Optional: Add age validation (e.g., must be over 18)
        const birthDate = new Date(dob);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        if (age < 18) {
            displayError(dobInput, 'You must be at least 18 years old.');
            return false;
        }

        clearError(dobInput);
        return true;
    }

    function validateGender() {
        const isGenderSelected = Array.from(genderInputs).some(radio => radio.checked);
        if (!isGenderSelected) {
            // Display error for one of the radio buttons or a general message
            displayError(genderInputs[0], 'Please select your Gender.');
            return false;
        }
        clearError(genderInputs[0]); // Clear error from the first radio button
        return true;
    }

    function validateTerms() {
        if (!termsCheckbox.checked) {
            displayError(termsCheckbox, 'You must agree to the Terms and Conditions.');
            return false;
        }
        clearError(termsCheckbox);
        return true;
    }

    // Event Listeners for real-time validation
    fullNameInput.addEventListener('blur', validateFullName);
    emailInput.addEventListener('blur', validateEmail);
    passwordInput.addEventListener('blur', validatePassword);
    confirmPasswordInput.addEventListener('blur', validatePassword); // Validate both on blur of either
    dobInput.addEventListener('blur', validateDateOfBirth);
    termsCheckbox.addEventListener('change', validateTerms);
    genderInputs.forEach(input => input.addEventListener('change', validateGender));


    // Form submission handler
    registrationForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        // Run all validations
        const isFullNameValid = validateFullName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isDateOfBirthValid = validateDateOfBirth();
        const isGenderValid = validateGender();
        const isTermsValid = validateTerms();

        // If all validations pass, proceed with form submission (e.g., send data to server)
        if (isFullNameValid && isEmailValid && isPasswordValid && isDateOfBirthValid && isGenderValid && isTermsValid) {
            alert('Registration Successful! (Data would be sent to server)');
            // In a real application, you would typically use fetch() or XMLHttpRequest here
            // to send the form data to a backend server.
            registrationForm.reset(); // Clear the form after successful submission
        } else {
            alert('Please correct the errors in the form.');
        }
    });
});