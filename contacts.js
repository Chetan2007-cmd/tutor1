// Contact Form Functionality

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const mobile = document.getElementById('mobile').value;
            const training = document.getElementById('training').value;
            
            // Basic validation
            if (!name || !email || !mobile || !training) {
                alert('Please fill in all fields');
                return;
            }
            
            // Email validation
            const emailRegex = /^[\w\+\.-]+@[^\s\.-]+\.[^\s\.]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Mobile validation (10 digits)
            const mobileRegex = /^\d{10}$/;
            if (!mobileRegex.test(mobile)) {
                alert('Please enter a valid 10-digit mobile number');
                return;
            }
            
            // If all validations pass, show success message
            alert('Thank you for your inquiry! Our team will contact you soon.');
            
            // Reset form
            contactForm.reset();
        });
        
        // Add input field focus effects
        const inputs = contactForm.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
            });
        });
    }
});