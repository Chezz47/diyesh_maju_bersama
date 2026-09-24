// Navbar Sticky & Mobile Menu
const navbar = document.getElementById('navbar');
const mobileBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.padding = '0.5rem 0';
        navbar.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
    } else {
        navbar.style.padding = '1rem 0';
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

mobileBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Lightbox functionality
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

function openLightbox(imgSrc) {
    lightbox.style.display = 'block';
    lightboxImg.src = imgSrc;
}

function closeLightbox() {
    lightbox.style.display = 'none';
}

// Close lightbox when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// WhatsApp Form Handler
const waForm = document.getElementById('waForm');
if (waForm) {
    waForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('waName').value;
        const company = document.getElementById('waCompany').value;
        const need = document.getElementById('waNeed').value;
        const message = document.getElementById('waMessage').value;
        
        let text = `Halo PT Diyesh Maju Bersama, saya ${name}`;
        if (company) text += ` dari ${company}`;
        text += `.\n\nKebutuhan: ${need}\nPesan: ${message}`;
        
        const encodedText = encodeURIComponent(text);
        const waUrl = `https://wa.me/6287873863685?text=${encodedText}`;
        
        // Track event before opening
        trackWaClick('footer_form');
        
        window.open(waUrl, '_blank');
    });
}

// Analytics Tracking (Mock)
function trackWaClick(location) {
    console.log(`Analytics Event: whatsapp_click, location: ${location}`);
    if (typeof gtag === 'function') {
        gtag('event', 'whatsapp_click', {
            'location': location
        });
    }
}

// Attach tracking to existing WA buttons
document.querySelectorAll('a[href*="wa.me"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Exclude the form button as it's handled separately
        if (btn.classList.contains('floating-wa')) {
            trackWaClick('floating');
        } else if (btn.classList.contains('whatsapp-unit-btn')) {
            trackWaClick('unit_card');
        } else if (btn.closest('.hero')) {
            trackWaClick('hero');
        } else if (btn.closest('.navbar')) {
            trackWaClick('navbar');
        }
    });
});
