document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formMessage = document.getElementById('form-message');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.querySelector('.btn-text').textContent = 'Sending...';
            submitBtn.querySelector('.spinner').classList.remove('hidden');
            formMessage.textContent = '';
            formMessage.className = 'form-message';
            
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());
            
            try {
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
                
                // Reset form
                contactForm.reset();
            } catch (error) {
                console.error('Error sending message:', error);
                formMessage.textContent = error.message || 'Error sending message. Please try again later.';
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
        });
    }
});
