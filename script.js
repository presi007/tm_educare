// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}));

// Smooth scrolling for navigation links
document.querySelectorAll("a[href^=\"#\"]").forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 100) {
        navbar.style.background = "rgba(255, 255, 255, 0.98)";
        navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
    } else {
        navbar.style.background = "rgba(255, 255, 255, 0.95)";
        navbar.style.boxShadow = "none";
    }
});

// Enhanced form validation
function showFormMessage(message, type = 'success') {
    // Remove existing messages
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.style.cssText = `
        padding: 1rem;
        margin: 1rem 0;
        border-radius: 8px;
        font-weight: 600;
        text-align: center;
        animation: slideDown 0.4s ease-out;
        ${type === 'success' ? 'background: #d1fae5; color: #065f46; border: 1px solid #10b981;' : 'background: #fee2e2; color: #991b1b; border: 1px solid #ef4444;'}
    `;
    messageDiv.textContent = message;
    
    // Insert message before form
    const form = document.querySelector('.contact-form form');
    form.parentNode.insertBefore(messageDiv, form);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.style.opacity = '0';
            setTimeout(() => messageDiv.remove(), 300);
        }
    }, 5000);
}

function validateField(field, value, type) {
    const fieldElement = document.getElementById(field);
    let isValid = true;
    let message = '';
    
    // Remove existing error styling
    fieldElement.style.borderColor = '#e2e8f0';
    
    switch (type) {
        case 'name':
            if (!value || value.trim().length < 2) {
                isValid = false;
                message = 'Name must be at least 2 characters long';
            }
            break;
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value || !emailRegex.test(value)) {
                isValid = false;
                message = 'Please enter a valid email address';
            }
            break;
        case 'phone':
            if (value && !/^[\+]?[0-9\s\-\(\)]{10,}$/.test(value)) {
                isValid = false;
                message = 'Please enter a valid phone number';
            }
            break;
        case 'service':
            if (!value) {
                isValid = false;
                message = 'Please select a service';
            }
            break;
        case 'message':
            if (!value || value.trim().length < 10) {
                isValid = false;
                message = 'Message must be at least 10 characters long';
            }
            break;
    }
    
    if (!isValid) {
        fieldElement.style.borderColor = '#ef4444';
        fieldElement.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
    }
    
    return { isValid, message };
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Form submission handling
    const contactForm = document.querySelector(".contact-form form");
    console.log("Contact form found:", contactForm); // Debug log
    
    // Test function to add a sample submission
    window.testSubmission = function() {
        const testData = {
            id: Date.now(),
            date: new Date().toISOString().split('T')[0],
            name: 'Test User',
            email: 'test@example.com',
            phone: '+1234567890',
            service: 'education',
            message: 'This is a test submission',
            status: 'new'
        };
        
        let submissions = JSON.parse(localStorage.getItem('tm-educare-submissions') || '[]');
        submissions.push(testData);
        localStorage.setItem('tm-educare-submissions', JSON.stringify(submissions));
        console.log("Test submission added:", testData);
        alert("Test submission added! Check admin panel.");
    };
    
    if (contactForm) {
    // Real-time validation
    const fields = ['name', 'email', 'phone', 'service', 'message'];
    fields.forEach(field => {
        const element = document.getElementById(field);
        if (element) {
            element.addEventListener('blur', function() {
                validateField(field, this.value, field);
            });
            
            element.addEventListener('input', function() {
                // Remove error styling on input
                this.style.borderColor = '#e2e8f0';
                this.style.boxShadow = 'none';
            });
        }
    });
    
    contactForm.addEventListener("submit", function(e) {
        e.preventDefault();
        console.log("Form submitted!"); // Debug log
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get("name");
        const email = formData.get("email");
        const phone = formData.get("phone");
        const service = formData.get("service");
        const message = formData.get("message");
        
        console.log("Form data:", { name, email, phone, service, message }); // Debug log
        
        // Validate all fields
        const validations = [
            validateField('name', name, 'name'),
            validateField('email', email, 'email'),
            validateField('phone', phone, 'phone'),
            validateField('service', service, 'service'),
            validateField('message', message, 'message')
        ];
        
        const invalidFields = validations.filter(v => !v.isValid);
        
        if (invalidFields.length > 0) {
            showFormMessage(invalidFields[0].message, 'error');
            return;
        }
        
        // Store form data for admin panel
        const formDataObj = {
            name: name,
            email: email,
            phone: phone,
            service: service,
            message: message
        };
        
        // Save to localStorage for admin panel
        let submissions = JSON.parse(localStorage.getItem('tm-educare-submissions') || '[]');
        console.log("Existing submissions:", submissions); // Debug log
        
        const newSubmission = {
            id: Date.now(),
            date: new Date().toISOString().split('T')[0],
            name: name,
            email: email,
            phone: phone || 'Not provided',
            service: service,
            message: message,
            status: 'new'
        };
        console.log("New submission:", newSubmission); // Debug log
        
        submissions.push(newSubmission);
        localStorage.setItem('tm-educare-submissions', JSON.stringify(submissions));
        console.log("Saved to localStorage. Total submissions:", submissions.length); // Debug log
        
        // Also trigger admin panel update if it's open in another tab
        window.dispatchEvent(new StorageEvent('storage', {
            key: 'tm-educare-submissions',
            newValue: JSON.stringify(submissions)
        }));
        
        // Show success message
        showFormMessage("Thank you for your message! We will get back to you soon.", 'success');
        
        // Reset form
        this.reset();
    });
    } // Close the if (contactForm) block
}); // Close the DOMContentLoaded event listener

// Counter animation for statistics
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Intersection Observer for animations and counters
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("fade-in-up");
            
            // Animate counters when statistics section comes into view
            if (entry.target.classList.contains("stat-item")) {
                const statNumber = entry.target.querySelector(".stat-number");
                const target = parseInt(statNumber.getAttribute("data-target"));
                animateCounter(statNumber, target);
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
    const animateElements = document.querySelectorAll(".service-card, .value-item, .contact-item, .why-card, .stat-item, .feature-item, .location-item");
    animateElements.forEach(el => observer.observe(el));
});

// Add scroll progress indicator
function createScrollIndicator() {
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    document.body.appendChild(scrollIndicator);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollIndicator.style.width = scrollPercent + '%';
    });
}

// Add loading animation to page
window.addEventListener("load", () => {
    document.body.classList.add("loaded");
    createScrollIndicator();
});

// Parallax effect for hero section
window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector(".hero");
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add click-to-call functionality
document.querySelectorAll("a[href^=\"tel:\"]").forEach(link => {
    link.addEventListener("click", function(e) {
        // Track phone clicks (analytics can be added here)
        console.log("Phone number clicked:", this.href);
    });
});

// Add email click tracking
document.querySelectorAll("a[href^=\"mailto:\"]").forEach(link => {
    link.addEventListener("click", function(e) {
        // Track email clicks (analytics can be added here)
        console.log("Email clicked:", this.href);
    });
});

// Service card hover effects
document.querySelectorAll(".service-card").forEach(card => {
    card.addEventListener("mouseenter", function() {
        this.style.transform = "translateY(-10px) scale(1.02)";
    });
    
    card.addEventListener("mouseleave", function() {
        this.style.transform = "translateY(0) scale(1)";
    });
});

// Why choose us card hover effects
document.querySelectorAll(".why-card").forEach(card => {
    card.addEventListener("mouseenter", function() {
        this.style.transform = "translateY(-5px) scale(1.02)";
    });
    
    card.addEventListener("mouseleave", function() {
        this.style.transform = "translateY(0) scale(1)";
    });
});

// Add typing effect to hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = "";
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect on page load
document.addEventListener("DOMContentLoaded", () => {
    const heroTitle = document.querySelector(".hero-title");
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        // Uncomment the line below to enable typing effect
        // typeWriter(heroTitle, originalText, 50);
    }
});

// Add smooth reveal animation for sections
const revealElements = document.querySelectorAll(".section-header, .mission-text");
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    revealObserver.observe(el);
});

// Add scroll-to-top functionality
const scrollToTopBtn = document.createElement("button");
scrollToTopBtn.innerHTML = "";
scrollToTopBtn.className = "scroll-to-top";
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #059669;
    color: white;
    border: none;
    font-size: 20px;
    cursor: pointer;
    opacity: 0;
    transition: all 0.3s ease;
    z-index: 1000;
`;

document.body.appendChild(scrollToTopBtn);

// Show/hide scroll to top button
window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.opacity = "1";
    } else {
        scrollToTopBtn.style.opacity = "0";
    }
});

// Scroll to top functionality
scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// Add hover effect to scroll to top button
scrollToTopBtn.addEventListener("mouseenter", function() {
    this.style.background = "#047857";
    this.style.transform = "scale(1.1)";
});

scrollToTopBtn.addEventListener("mouseleave", function() {
    this.style.background = "#059669";
    this.style.transform = "scale(1)";
});

// Language toggle functionality
const translations = {
    en: {
        // Navigation
        "nav-home": "Home",
        "nav-about": "About Us",
        "nav-services": "Services",
        "nav-why-choose": "Why Choose Us",
        "nav-statistics": "Our Statistics",
        "nav-mission": "Mission",
        "nav-location": "Location",
        "nav-contact": "Contact",
        
        // Hero Section
        "hero-title": "Welcome to TM Educare",
        "hero-subtitle": "Guiding students to academic dreams abroad and supporting patients in accessing world-class medical care in India",
        "hero-btn-services": "Our Services",
        "hero-btn-contact": "Get in Touch",
        
        // About Section
        "about-title": "About TM Educare",
        "about-subtitle": "Your trusted partner in education and healthcare excellence",
        "about-story": "Our Story",
        "about-text-1": "Founded with a vision to bridge the gap between dreams and reality, TM Educare has been at the forefront of transforming lives through quality education and healthcare services. We understand that every student has unique aspirations and every patient deserves the best care.",
        "about-text-2": "Our journey began with a simple yet powerful belief: everyone deserves access to world-class education and healthcare, regardless of their location or circumstances. Today, we proudly serve clients across multiple countries, helping them achieve their academic and health goals.",
        "about-feature-1-title": "Experienced Team",
        "about-feature-1-desc": "Our dedicated professionals bring years of expertise in education and healthcare consulting.",
        "about-feature-2-title": "Global Network",
        "about-feature-2-desc": "We have established partnerships with top universities and hospitals worldwide.",
        "about-feature-3-title": "Personalized Approach",
        "about-feature-3-desc": "Every client receives customized guidance tailored to their specific needs and goals.",
        
        // Services Section
        "services-title": "Our Services",
        "services-subtitle": "With a focus on trust, simplicity, and safety, we strive to make education and healthcare more accessible than ever.",
        "service-1-title": "Education Abroad",
        "service-1-desc": "Comprehensive guidance for students pursuing their academic dreams in international universities. From application support to visa assistance, we are here every step of the way.",
        "service-1-feature-1": "University Selection",
        "service-1-feature-2": "Application Support",
        "service-1-feature-3": "Visa Assistance",
        "service-1-feature-4": "Scholarship Guidance",
        "service-2-title": "Medical Care in India",
        "service-2-desc": "Connecting patients with world-class medical facilities and healthcare professionals across India. Access to top-tier hospitals and specialized treatments.",
        "service-2-feature-1": "Hospital Coordination",
        "service-2-feature-2": "Specialist Consultations",
        "service-2-feature-3": "Treatment Planning",
        "service-2-feature-4": "Medical Tourism Support",
        
        // Why Choose Us Section
        "why-choose-title": "Why Choose TM Educare?",
        "why-choose-subtitle": "Discover what sets us apart in the education and healthcare consulting industry",
        "why-1-title": "Proven Track Record",
        "why-1-desc": "Years of successful placements and satisfied clients with a high success rate in achieving their goals.",
        "why-2-title": "24/7 Support",
        "why-2-desc": "Round-the-clock assistance to address your queries and concerns, ensuring you never feel alone in your journey.",
        "why-3-title": "Secure & Reliable",
        "why-3-desc": "Your data and personal information are protected with industry-standard security measures and confidentiality protocols.",
        "why-4-title": "Transparent Pricing",
        "why-4-desc": "No hidden fees or surprise charges. Clear, upfront pricing with no compromise on service quality.",
        "why-5-title": "Expert Guidance",
        "why-5-desc": "Access to experienced counselors and medical professionals who understand the complexities of international education and healthcare.",
        "why-6-title": "Personalized Care",
        "why-6-desc": "Every client receives individual attention and customized solutions tailored to their specific needs and circumstances.",
        
        // Statistics Section
        "statistics-title": "Our Impact in Numbers",
        "statistics-subtitle": "Measurable results that speak to our commitment to excellence",
        "stat-1-label": "Students Placed",
        "stat-2-label": "Medical Cases Handled",
        "stat-3-label": "Partner Universities",
        "stat-4-label": "Partner Hospitals",
        "stat-5-label": "Success Rate (%)",
        "stat-6-label": "Years of Experience",
        
        // Mission Section
        "mission-title": "Our Mission",
        "mission-statement": "To open doors to quality education and healthcare by providing personalized guidance, reliable support, and seamless solutions.",
        "mission-value-1-title": "Trust",
        "mission-value-1-desc": "Building lasting relationships through transparency and reliability.",
        "mission-value-2-title": "Simplicity",
        "mission-value-2-desc": "Making complex processes easy to understand and navigate",
        "mission-value-3-title": "Safety",
        "mission-value-3-desc": "Ensuring secure and protected experiences for all our clients",
        
        // Location Section
        "location-title": "Visit Our Office",
        "location-subtitle": "Located in the heart of Lubumbashi, we are easily accessible for in-person consultations",
        "location-address-title": "Our Address",
        "location-address": "Ville de Lubumbashi<br>Hewa Bora<br>Democratic Republic of Congo",
        "location-hours-title": "Office Hours",
        "location-hours": "Monday - Friday: 8:00 AM - 6:00 PM<br>Saturday: 9:00 AM - 4:00 PM<br>Sunday: Closed",
        "location-parking-title": "Parking",
        "location-parking": "Free parking available for all visitors",
        "location-directions": "Get Directions",
        
        // Contact Section
        "contact-title": "Get in Touch",
        "contact-subtitle": "Ready to start your journey? Contact us today for personalized assistance.",
        "contact-phone-title": "Phone Numbers",
        "contact-phone-1": "+91 9205940911",
        "contact-phone-2": "+243 840695390",
        "contact-email-title": "Email Address",
        "contact-email": "tm.educare00@gmail.com",
        "contact-location-title": "Office Location",
        "contact-location": "Ville de Lubumbashi, Hewa Bora<br>Democratic Republic of Congo",
        "contact-form-name": "Your Name",
        "contact-form-email": "Your Email",
        "contact-form-phone": "Your Phone",
        "contact-form-service": "Service Interested In",
        "contact-form-message": "Your Message",
        "contact-form-submit": "Send Message",
        "contact-form-education": "Education Consulting",
        "contact-form-medical": "Medical Tourism",
        
        // Footer
        "footer-about": "About TM Educare",
        "footer-about-desc": "Your trusted partner in education and healthcare excellence, helping you achieve your dreams and access world-class medical care.",
        "footer-services": "Our Services",
        "footer-contact": "Contact Info",
        "footer-copyright": "© 2024 TM Educare. All rights reserved."
    },
    fr: {
        // Navigation
        "nav-home": "Accueil",
        "nav-about": "À Propos",
        "nav-services": "Services",
        "nav-why-choose": "Pourquoi Nous Choisir",
        "nav-statistics": "Nos Statistiques",
        "nav-mission": "Mission",
        "nav-location": "Localisation",
        "nav-contact": "Contact",
        
        // Hero Section
        "hero-title": "Bienvenue chez TM Educare",
        "hero-subtitle": "Orienter les étudiants vers leurs rêves académiques à l'étranger et soutenir les patients dans l'accès aux soins médicaux de classe mondiale en Inde",
        "hero-btn-services": "Nos Services",
        "hero-btn-contact": "Contactez-nous",
        
        // About Section
        "about-title": "À Propos de TM Educare",
        "about-subtitle": "Votre partenaire de confiance dans l'excellence en éducation et soins de santé",
        "about-story": "Notre Histoire",
        "about-text-1": "Fondée avec une vision de combler le fossé entre les rêves et la réalité, TM Educare est à l'avant-garde de la transformation des vies grâce à des services d'éducation et de soins de santé de qualité. Nous comprenons que chaque étudiant a des aspirations uniques et que chaque patient mérite les meilleurs soins.",
        "about-text-2": "Notre parcours a commencé avec une croyance simple mais puissante : tout le monde mérite l'accès à une éducation et des soins de santé de classe mondiale, quel que soit son emplacement ou ses circonstances. Aujourd'hui, nous servons fièrement des clients dans plusieurs pays, les aidant à atteindre leurs objectifs académiques et de santé.",
        "about-feature-1-title": "Équipe Expérimentée",
        "about-feature-1-desc": "Nos professionnels dévoués apportent des années d'expertise en conseil en éducation et soins de santé.",
        "about-feature-2-title": "Réseau Mondial",
        "about-feature-2-desc": "Nous avons établi des partenariats avec les meilleures universités et hôpitaux du monde.",
        "about-feature-3-title": "Approche Personnalisée",
        "about-feature-3-desc": "Chaque client reçoit des conseils personnalisés adaptés à ses besoins et objectifs spécifiques.",
        
        // Services Section
        "services-title": "Nos Services",
        "services-subtitle": "Avec un accent sur la confiance, la simplicité et la sécurité, nous nous efforçons de rendre l'éducation et les soins de santé plus accessibles que jamais.",
        "service-1-title": "Éducation à l'Étranger",
        "service-1-desc": "Conseils complets pour les étudiants poursuivant leurs rêves académiques dans les universités internationales. Du support de candidature à l'assistance visa, nous sommes là à chaque étape.",
        "service-1-feature-1": "Sélection d'Université",
        "service-1-feature-2": "Support de Candidature",
        "service-1-feature-3": "Assistance Visa",
        "service-1-feature-4": "Orientation Bourses",
        "service-2-title": "Soins Médicaux en Inde",
        "service-2-desc": "Connecter les patients avec des installations médicales de classe mondiale et des professionnels de la santé à travers l'Inde. Accès aux hôpitaux de premier plan et aux traitements spécialisés.",
        "service-2-feature-1": "Coordination Hospitalière",
        "service-2-feature-2": "Consultations Spécialisées",
        "service-2-feature-3": "Planification de Traitement",
        "service-2-feature-4": "Support Tourisme Médical",
        
        // Why Choose Us Section
        "why-choose-title": "Pourquoi Choisir TM Educare?",
        "why-choose-subtitle": "Découvrez ce qui nous distingue dans l'industrie du conseil en éducation et soins de santé",
        "why-1-title": "Antécédents Prouvés",
        "why-1-desc": "Des années de placements réussis et de clients satisfaits avec un taux de réussite élevé dans l'atteinte de leurs objectifs.",
        "why-2-title": "Support 24/7",
        "why-2-desc": "Assistance 24h/24 pour répondre à vos questions et préoccupations, vous assurant de ne jamais vous sentir seul dans votre parcours.",
        "why-3-title": "Sécurisé et Fiable",
        "why-3-desc": "Vos données et informations personnelles sont protégées avec des mesures de sécurité standard de l'industrie et des protocoles de confidentialité.",
        "why-4-title": "Tarification Transparente",
        "why-4-desc": "Aucun frais caché ou charges surprises. Tarification claire et préalable sans compromis sur la qualité du service.",
        "why-5-title": "Conseils d'Experts",
        "why-5-desc": "Accès à des conseillers expérimentés et des professionnels médicaux qui comprennent les complexités de l'éducation internationale et des soins de santé.",
        "why-6-title": "Soins Personnalisés",
        "why-6-desc": "Chaque client reçoit une attention individuelle et des solutions personnalisées adaptées à ses besoins et circonstances spécifiques.",
        
        // Statistics Section
        "statistics-title": "Notre Impact en Chiffres",
        "statistics-subtitle": "Des résultats mesurables qui témoignent de notre engagement envers l'excellence",
        "stat-1-label": "Étudiants Placés",
        "stat-2-label": "Cas Médicaux Traités",
        "stat-3-label": "Universités Partenaires",
        "stat-4-label": "Hôpitaux Partenaires",
        "stat-5-label": "Taux de Réussite (%)",
        "stat-6-label": "Années d'Expérience",
        
        // Mission Section
        "mission-title": "Notre Mission",
        "mission-statement": "Ouvrir les portes à une éducation et des soins de santé de qualité en fournissant des conseils personnalisés, un support fiable et des solutions transparentes.",
        "mission-value-1-title": "Confiance",
        "mission-value-1-desc": "Construire des relations durables grâce à la transparence et la fiabilité",
        "mission-value-2-title": "Simplicité",
        "mission-value-2-desc": "Rendre les processus complexes faciles à comprendre et à naviguer",
        "mission-value-3-title": "Sécurité",
        "mission-value-3-desc": "Assurer des expériences sécurisées et protégées pour tous nos clients",
        
        // Location Section
        "location-title": "Visitez Notre Bureau",
        "location-subtitle": "Situé au cœur de Lubumbashi, nous sommes facilement accessibles pour des consultations en personne",
        "location-address-title": "Notre Adresse",
        "location-address": "Ville de Lubumbashi<br>Hewa Bora<br>République Démocratique du Congo",
        "location-hours-title": "Heures de Bureau",
        "location-hours": "Lundi - Vendredi: 8h00 - 18h00<br>Samedi: 9h00 - 16h00<br>Dimanche: Fermé",
        "location-parking-title": "Stationnement",
        "location-parking": "Stationnement gratuit disponible pour tous les visiteurs",
        "location-directions": "Obtenir les Directions",
        
        // Contact Section
        "contact-title": "Contactez-nous",
        "contact-subtitle": "Prêt à commencer votre voyage? Contactez-nous aujourd'hui pour une assistance personnalisée.",
        "contact-phone-title": "Numéros de Téléphone",
        "contact-phone-1": "+91 9205940911",
        "contact-phone-2": "+243 840695390",
        "contact-email-title": "Adresse Email",
        "contact-email": "tm.educare00@gmail.com",
        "contact-location-title": "Localisation du Bureau",
        "contact-location": "Ville de Lubumbashi, Hewa Bora<br>République Démocratique du Congo",
        "contact-form-name": "Votre Nom",
        "contact-form-email": "Votre Email",
        "contact-form-phone": "Votre Téléphone",
        "contact-form-service": "Service d'Intérêt",
        "contact-form-message": "Votre Message",
        "contact-form-submit": "Envoyer le Message",
        "contact-form-education": "Éducation à l'Étranger",
        "contact-form-medical": "Soins Médicaux en Inde",
        
        // Footer
        "footer-about": "À Propos de TM Educare",
        "footer-about-desc": "Votre partenaire de confiance dans l'excellence en éducation et soins de santé, vous aidant à réaliser vos rêves et accéder aux soins médicaux de classe mondiale.",
        "footer-services": "Nos Services",
        "footer-contact": "Informations de Contact",
        "footer-copyright": "© 2024 TM Educare. Tous droits réservés."
    }
};

function updateContent(lang) {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });
}

// Language toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll(".lang-btn").forEach(button => {
        button.addEventListener("click", () => {
            const lang = button.dataset.lang;
            updateContent(lang);
            localStorage.setItem("preferredLang", lang);
            
            // Update active state
            document.querySelectorAll(".lang-btn").forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
        });
    });

    // Load preferred language on page load
    const savedLang = localStorage.getItem("preferredLang") || "en";
    updateContent(savedLang);

    // Set initial active state
    document.querySelectorAll(".lang-btn").forEach(btn => {
        if (btn.dataset.lang === savedLang) {
            btn.classList.add("active");
        }
    });
    
    // Enhanced accessibility and keyboard navigation
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Add focus management for mobile menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    }
    
    // Add smooth focus indicators for keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
});
