// // Parallax Effect
// window.addEventListener('scroll', function() {
//     const parallax = document.querySelector('.parallax-bg');
//     if (parallax) {
//         let scrollPosition = window.pageYOffset;
//         parallax.style.transform = 'translateY(' + (scrollPosition * 0.5) + 'px)';
//     }
// });

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

// Service Learn More Button Handlers
document.querySelectorAll('.learn-more').forEach(button => {
    button.addEventListener('click', function() {
        const service = this.dataset.service;
        const messages = {
            hosting: 'Learn more about our Web Hosting services',
            builder: 'Learn more about our Website Builder',
            ecommerce: 'Learn more about our E-commerce solutions'
        };
        alert(messages[service]);
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

// Add hover functionality for mega dropdown
// document.addEventListener('DOMContentLoaded', function() {
//     const megaDropdowns = document.querySelectorAll('.mega-dropdown');
    
//     megaDropdowns.forEach(dropdown => {
//         const dropdownMenu = dropdown.querySelector('.mega-dropdown-menu');
//         let timeoutId;

//         dropdown.addEventListener('mouseenter', () => {
//             clearTimeout(timeoutId);
//             dropdownMenu.classList.add('show');
//         });

//         dropdown.addEventListener('mouseleave', () => {
//             timeoutId = setTimeout(() => {
//                 dropdownMenu.classList.remove('show');
//             }, 200);
//         });
//     });
// });
