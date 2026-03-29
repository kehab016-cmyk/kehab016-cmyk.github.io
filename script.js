// Mobile menu toggle
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('hidden');
}

// Close mobile menu when clicking on a link
document.querySelectorAll('#mobileMenu a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('mobileMenu').classList.add('hidden');
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up');
        }
    });
}, observerOptions);

// Observe sections for animation
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Back to Top Button
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Form Validation
const contactForm = document.querySelector('#contact form');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const nameInput = this.querySelector('input[type="text"]');
    const emailInput = this.querySelector('input[type="email"]');
    const messageInput = this.querySelector('textarea');

    let isValid = true;
    let errors = [];

    // Validate name
    if (!nameInput.value.trim()) {
        errors.push('Name is required');
        nameInput.style.borderColor = '#ff6b6b';
        isValid = false;
    } else {
        nameInput.style.borderColor = '#00ffaa';
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim()) {
        errors.push('Email is required');
        emailInput.style.borderColor = '#ff6b6b';
        isValid = false;
    } else if (!emailRegex.test(emailInput.value.trim())) {
        errors.push('Please enter a valid email address');
        emailInput.style.borderColor = '#ff6b6b';
        isValid = false;
    } else {
        emailInput.style.borderColor = '#00ffaa';
    }

    // Validate message
    if (!messageInput.value.trim()) {
        errors.push('Message is required');
        messageInput.style.borderColor = '#ff6b6b';
        isValid = false;
    } else {
        messageInput.style.borderColor = '#00ffaa';
    }

    // Show errors or success
    const existingErrorDiv = this.querySelector('.error-messages');
    if (existingErrorDiv) {
        existingErrorDiv.remove();
    }

    if (!isValid) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-messages text-red-400 text-sm mt-4';
        errorDiv.innerHTML = errors.map(error => `<p>• ${error}</p>`).join('');
        this.appendChild(errorDiv);
    } else {
        // Success - you could send the form data here
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message text-green-400 text-sm mt-4';
        successDiv.innerHTML = '<p> Message sent successfully!</p>';
        this.appendChild(successDiv);

        // Reset form
        this.reset();

        // Reset border colors
        [nameInput, emailInput, messageInput].forEach(input => {
            input.style.borderColor = '#2a2f3e';
        });

        // Remove success message after 3 seconds
        setTimeout(() => {
            successDiv.remove();
        }, 3000);
    }
});