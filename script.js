// ============ HERO SLIDER FUNCTIONALITY ============
let currentSlide = 1;
let sliderInterval;

function showSlide(n) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');

    if (n > slides.length) {
        currentSlide = 1;
    }
    if (n < 1) {
        currentSlide = slides.length;
    }

    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slides[currentSlide - 1].classList.add('active');
    dots[currentSlide - 1].classList.add('active');
}

function nextSlide() {
    clearInterval(sliderInterval);
    currentSlide++;
    showSlide(currentSlide);
    autoSlide();
}

function prevSlide() {
    clearInterval(sliderInterval);
    currentSlide--;
    showSlide(currentSlide);
    autoSlide();
}

function goToSlide(n) {
    clearInterval(sliderInterval);
    currentSlide = n;
    showSlide(currentSlide);
    autoSlide();
}

function autoSlide() {
    sliderInterval = setInterval(() => {
        currentSlide++;
        showSlide(currentSlide);
    }, 5000);
}

// Initialize slider on page load
window.addEventListener('load', () => {
    showSlide(1);
    autoSlide();
});

// ============ MOBILE MENU TOGGLE ============
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Close menu when link is clicked
const navItems = document.querySelectorAll('.nav-links a');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// ============ WHATSAPP INTEGRATION ============
const PHONE_NUMBER = '919058144532'; // Replace with actual WhatsApp number

function openWhatsAppRoom() {
    const message = encodeURIComponent('Hello Madhav Hotel! I would like to book a room. Could you please provide available options and pricing?');
    window.open(`https://wa.me/${PHONE_NUMBER}?text=${message}`, '_blank');
}

function openWhatsAppTable() {
    const message = encodeURIComponent('Hello Madhav Hotel! I want to reserve a table for dining. Can you check availability for [date, time, and number of people]?');
    window.open(`https://wa.me/${PHONE_NUMBER}?text=${message}`, '_blank');
}

function openWhatsAppEvent() {
    const message = encodeURIComponent('Hello Madhav Hotel! I am interested in booking your party hall for an event. Can you provide details about availability and pricing?');
    window.open(`https://wa.me/${PHONE_NUMBER}?text=${message}`, '_blank');
}

// ============ WAITER CALL FUNCTIONALITY ============
function callWaiterDemo() {
    const statusDiv = document.getElementById('waiterStatus');
    const button = event.target.closest('.btn-call-waiter');

    // Disable button temporarily
    button.disabled = true;
    button.style.opacity = '0.6';

    // Show processing message
    statusDiv.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Calling waiter...';
    statusDiv.style.color = '#ffd700';

    // Simulate waiter response
    setTimeout(() => {
        statusDiv.innerHTML = '<i class="fas fa-check-circle"></i> Waiter is on the way!';
        statusDiv.style.color = '#25d366';

        // Show ready message after 3 seconds
        setTimeout(() => {
            statusDiv.innerHTML = '<i class="fas fa-history"></i> Call waiter again if needed';
            statusDiv.style.color = '#ffd700';
            button.disabled = false;
            button.style.opacity = '1';
        }, 3000);
    }, 2000);
}

// ============ SCROLL TO SECTION ============
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

function scrollToBooking() {
    const element = document.querySelector('.quick-booking');
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// ============ SMOOTH SCROLL FOR ANCHOR LINKS ============
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

// ============ CONTACT FORM HANDLING ============
const contactForm = document.querySelector('.contact-form form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = {
            name: contactForm.querySelector('input[type="text"]').value,
            email: contactForm.querySelector('input[type="email"]').value,
            purpose: contactForm.querySelector('select').value,
            message: contactForm.querySelector('textarea').value
        };

        // Validate form
        if (!formData.name || !formData.email || !formData.purpose || !formData.message) {
            alert('Please fill in all fields');
            return;
        }

        // Send via WhatsApp
        const whatsappMessage = encodeURIComponent(
            `New Contact Form Submission:\n\nName: ${formData.name}\nEmail: ${formData.email}\nPurpose: ${formData.purpose}\n\nMessage:\n${formData.message}`
        );

        window.open(`https://wa.me/${PHONE_NUMBER}?text=${whatsappMessage}`, '_blank');

        // Clear form
        contactForm.reset();
        alert('Thank you! Your message has been sent via WhatsApp.');
    });
}

// ============ SCROLL TO TOP BUTTON ============
let scrollTopButton = document.createElement('button');
scrollTopButton.id = 'scrollToTop';
scrollTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopButton.style.cssText = `
    position: fixed;
    bottom: 100px;
    right: 30px;
    z-index: 999;
    background: var(--primary-color, #c41e3a);
    color: white;
    border: none;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: none;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    font-size: 18px;
`;

document.body.appendChild(scrollTopButton);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopButton.style.display = 'flex';
    } else {
        scrollTopButton.style.display = 'none';
    }
});

scrollTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopButton.addEventListener('hover', () => {
    scrollTopButton.style.transform = 'scale(1.1)';
});

// ============ LAZY LOADING FOR IMAGES ============
if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => observer.observe(img));
}

// ============ ANIMATE ON SCROLL ============
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.booking-card, .room-card, .event-card, .facility-item').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    animationObserver.observe(card);
});

// ============ NAVBAR HIDE ON SCROLL ============
let lastScrollTop = 0;
const navbar = document.querySelector('.header');

window.addEventListener('scroll', () => {
    let currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    } else if (currentScroll > lastScrollTop) {
        // Scrolling down
        navbar.style.top = '-100px';
        navbar.style.transition = 'top 0.3s ease';
    } else {
        // Scrolling up
        navbar.style.top = '0';
        navbar.style.transition = 'top 0.3s ease';
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

// ============ GOOGLE ANALYTICS / TRACKING ============
// Add your Google Analytics or tracking code here if needed
// Example:
// gtag('event', 'booking_click', {
//     'booking_type': 'room'
// });

// ============ ACCESSIBILITY ============
// Keyboard navigation for booking cards
document.querySelectorAll('.booking-card').forEach((card, index) => {
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            card.click();
        }
    });
});

// ============ NOTIFICATION/TOAST SYSTEM ============
function showNotification(message, type = 'info', duration = 3000) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${type === 'success' ? '#25d366' : type === 'error' ? '#c41e3a' : '#007bff'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 10000;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
        animation: slideIn 0.3s ease;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, duration);
}

// Add CSS animations for toast
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============ PRELOAD CRITICAL IMAGES ============
window.addEventListener('load', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
    });
});

console.log('Madhav Hotel Website - All scripts loaded successfully!');
