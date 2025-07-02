document.addEventListener('DOMContentLoaded', function() {
    // Domain Search Functionality
    const domainSearchForm = document.getElementById('domainSearchForm');
    if (domainSearchForm) {
        domainSearchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchInput = this.querySelector('input').value;
            // Simulate domain search
            checkDomainAvailability(searchInput);
        });
    }
});

// Domain availability check simulation
function checkDomainAvailability(domain) {
    // Mock API call
    setTimeout(() => {
        const available = Math.random() > 0.5;
        const message = available ? 
            `Congratulations! ${domain} is available!` : 
            `Sorry, ${domain} is already taken.`;
        
        alert(message); // Replace with proper UI feedback
    }, 500);
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Initialize Bootstrap tooltips
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
});

document.addEventListener('DOMContentLoaded', function() {
    new Typed('#typed-text', {
        strings: ['Build Your Online Presence with Confidence'],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        startDelay: 1000,
        loop: true,
        showCursor: true,
        cursorChar: '|'
    });
});

// Add hover functionality for mega dropdown
document.addEventListener('DOMContentLoaded', function() {
    const megaDropdowns = document.querySelectorAll('.mega-dropdown');
    
    megaDropdowns.forEach(dropdown => {
        const dropdownMenu = dropdown.querySelector('.mega-dropdown-menu');
        let timeoutId;

        dropdown.addEventListener('mouseenter', () => {
            clearTimeout(timeoutId);
            dropdownMenu.classList.add('show');
        });

        dropdown.addEventListener('mouseleave', () => {
            timeoutId = setTimeout(() => {
                dropdownMenu.classList.remove('show');
            }, 200);
        });
    });
});

// Add scroll event for navbar
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Immediately show all service items without waiting for scroll
document.addEventListener('DOMContentLoaded', function() {
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach(item => {
        item.classList.add('fade-in');
    });
});
