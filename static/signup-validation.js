document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signup-form');
    const fullnameInput = document.getElementById('fullname');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    
    const fullnameError = document.getElementById('fullname-error');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const confirmPasswordError = document.getElementById('confirm-password-error');

    form.addEventListener('submit', function (event) {
        let isValid = true;
        
        // Reset errors
        fullnameError.textContent = '';
        emailError.textContent = '';
        passwordError.textContent = '';
        confirmPasswordError.textContent = '';

        // Full Name Validation
        if (fullnameInput.value.trim() === '') {
            fullnameError.textContent = 'Full Name is required.';
            isValid = false;
        }

        // Email Validation
        if (!validateEmail(emailInput.value)) {
            emailError.textContent = 'Please enter a valid email address.';
            isValid = false;
        }

        // Password Validation
        if (passwordInput.value.length < 6) {
            passwordError.textContent = 'Password must be at least 6 characters long.';
            isValid = false;
        }
        if(!validatePass(passwordInput.value)) {
            passwordError.textContent = 'Password must contain uppercase and lowercase letters, special characters(@,!,#) and digits(0-9).'
            isValid = false;
        }

        // Confirm Password Validation
        if (confirmPasswordInput.value !== passwordInput.value) {
            confirmPasswordError.textContent = 'Passwords do not match.';
            isValid = false;
        }

        // Prevent form submission if validation fails
        if (!isValid) {
            event.preventDefault();
        }
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
    function validatePass(password) {
        const pass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,}$/;
    
    return pass.test(password);
    }
    let selectedOption = null;

        function selectOption(element) {
            // Clear previous selection
            if (selectedOption) {
                selectedOption.classList.remove('active');
            }
            // Set new selection
            element.classList.add('active');
            selectedOption = element;
        }

        function submitSelection() {
            if (selectedOption) {
                const selectedType = selectedOption.getAttribute('data-type');
                alert('You selected: ' + selectedType);
                // You can use AJAX here to send the selectedType to the server or handle it as needed
                // Example: sendPreferredContentType(selectedType);
            } else {
                alert('Please select a content type.');
            }
        }
});
