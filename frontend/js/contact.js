// Handle contact form submission
async function handleContactForm(event) {
    event.preventDefault();

    const formData = {
        name: document.getElementById('contact-name').value,
        email: document.getElementById('contact-email').value,
        subject: document.getElementById('contact-subject').value,
        message: document.getElementById('contact-message').value
    };

    // For now, just show a success message
    // In a real application, this would send to a backend API
    showNotification('Thank you for your message! We\'ll get back to you soon.');

    // Clear form
    event.target.reset();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
});
