document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.dropdown > a').forEach(dropdown => {
        dropdown.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const parent = dropdown.parentElement;
                parent.classList.toggle('active');
            }
        });
    });
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const desktopNav = document.querySelector('.desktop-nav');

    if (mobileMenuToggle && desktopNav) {
        mobileMenuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            desktopNav.style.display = desktopNav.style.display === 'block' ? 'none' : 'block';
        });
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('header') && desktopNav && window.innerWidth <= 768) {
            desktopNav.style.display = 'none';
        }
    });

    // Form validation
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            if (!contactForm.checkValidity()) {
                e.preventDefault();
                alert('Please fill out all required fields correctly.');
            }
        });
    }

    // Initialize page-specific features
    initHomeServices();
    initServicePage();
});

function initHomeServices() {
    const serviceItems = document.querySelectorAll('.service-item');
    const serviceContents = document.querySelectorAll('.service-content');

    if (serviceItems.length > 0) {
        serviceItems.forEach(item => {
            item.addEventListener('click', () => {
                // Remove active classes
                serviceItems.forEach(s => s.classList.remove('active'));
                serviceContents.forEach(c => c.classList.remove('active'));

                // Add active class to clicked item
                item.classList.add('active');
                
                // Show corresponding content
                const serviceType = item.dataset.service;
                const targetContent = document.getElementById(`${serviceType}-details`);
                if (targetContent) {
                    targetContent.classList.add('active');
                    targetContent.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

function initServicePage() {
    const serviceButtons = document.querySelectorAll('.service-btn');
    const serviceContents = document.querySelectorAll('.service-content');

    if (serviceButtons.length > 0) {
        serviceButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons and contents
                serviceButtons.forEach(btn => btn.classList.remove('active'));
                serviceContents.forEach(content => content.classList.remove('active'));

                // Add active class to clicked button
                button.classList.add('active');

                // Show corresponding content
                const serviceId = button.dataset.service;
                const targetContent = document.getElementById(serviceId);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
        
        // Activate first service by default
        if (serviceButtons[0] && serviceContents[0]) {
            serviceButtons[0].classList.add('active');
            serviceContents[0].classList.add('active');
        }
    }
}