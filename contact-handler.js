async function handleSubmit(event) {
    event.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    const formMessage = document.getElementById('form-message');
    const contactForm = event.target;
    
    try {
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.querySelector('.btn-text').textContent = 'Sending...';
        formMessage.textContent = '';
        formMessage.className = 'form-message';
        
        // Get form data
        const formData = new FormData(contactForm);
        const recaptchaResponse = grecaptcha.getResponse();
        
        if (!recaptchaResponse) {
            throw new Error('Please complete the reCAPTCHA');
        }
        
        // Add reCAPTCHA token to form data
        formData.append('g-recaptcha-response', recaptchaResponse);
        
        // Convert FormData to object
        const data = Object.fromEntries(formData.entries());
        
        const response = await fetch('/api/submit-form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || 'Failed to send message');
        }
        
        // Show success message
        formMessage.textContent = 'Message sent successfully!';
        formMessage.className = 'form-message success';
        
        // Reset form and reCAPTCHA
        contactForm.reset();
        grecaptcha.reset();
        
    } catch (error) {
        console.error('Error:', error);
        formMessage.textContent = error.message || 'Error sending message. Please try again.';
        formMessage.className = 'form-message error';
    } finally {
        // Reset button state
        submitBtn.disabled = false;
        submitBtn.querySelector('.btn-text').textContent = 'Send Message';
        submitBtn.querySelector('.spinner').classList.add('hidden');
        
        // Hide message after 5 seconds
        const message = formMessage.textContent;
        if (message) {
            setTimeout(() => {
                if (formMessage.textContent === message) {
                    formMessage.textContent = '';
                    formMessage.className = 'form-message';
                }
            }, 5000);
        }
    }
    
    return false;
}

// Initialize form when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.onsubmit = handleSubmit;
    }
});
