// Bio Toggle Functionality
function toggleBio() {
    const bioExpanded = document.getElementById('bio-expanded');
    bioExpanded.classList.toggle('hidden');
    
    // Smooth scroll to bio section
    if (!bioExpanded.classList.contains('hidden')) {
        setTimeout(() => {
            document.getElementById('bio').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    }
}

// Form Validation
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

// Validation rules
const validators = {
    name: (value) => {
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        return null;
    },
    email: (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) return 'Email is required';
        if (!emailRegex.test(value)) return 'Please enter a valid email address';
        return null;
    },
    subject: (value) => {
        if (!value.trim()) return 'Subject is required';
        if (value.trim().length < 5) return 'Subject must be at least 5 characters';
        return null;
    },
    message: (value) => {
        if (!value.trim()) return 'Message is required';
        if (value.trim().length < 10) return 'Message must be at least 10 characters';
        return null;
    }
};

// Validate individual field
function validateField(fieldName) {
    const field = document.getElementById(fieldName);
    const errorElement = document.getElementById(`${fieldName}-error`);
    const value = field.value;
    const error = validators[fieldName](value);
    
    if (error) {
        field.classList.add('error');
        errorElement.textContent = error;
        errorElement.classList.add('show');
        return false;
    } else {
        field.classList.remove('error');
        errorElement.textContent = '';
        errorElement.classList.remove('show');
        return true;
    }
}

// Validate all fields
function validateForm() {
    const fields = ['name', 'email', 'subject', 'message'];
    return fields.every(field => validateField(field));
}

// Clear field errors on input
document.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('input', function() {
        if (this.value.trim()) {
            this.classList.remove('error');
            document.getElementById(`${this.id}-error`).classList.remove('show');
        }
    });
});

// Handle form submission
contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    if (validateForm()) {
        const formData = new FormData(contactForm);
        
        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const result = await response.json();
            
            if (result.success) {
                // Ocultar formulario y mostrar mensaje de éxito
                contactForm.style.display = "none";
                successMessage.classList.remove("hidden");
                console.log("[Web3Forms] Message sent successfully");
            } else {
                console.error("[Web3Forms] Error:", result);
                alert("Hubo un error al enviar el mensaje. Intenta más tarde.");
            }
        } catch (error) {
            console.error("[Web3Forms] Network error:", error);
            alert("Error de red. Revisa tu conexión.");
        }
    } else {
        console.log("[Form] Validation failed");
    }
});

// Reset form and show form again
function resetForm() {
    contactForm.reset();
    contactForm.style.display = 'flex';
    successMessage.classList.add('hidden');
    
    // Clear all error states
    document.querySelectorAll('.form-input').forEach(input => {
        input.classList.remove('error');
    });
    document.querySelectorAll('.form-error').forEach(error => {
        error.classList.remove('show');
    });
}

// Smooth scroll animation for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll animation for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideDown 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all project cards and skill cards on scroll
document.querySelectorAll('.project-card, .skill-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Download CV function
function downloadCV() {
    // Ruta al archivo PDF del CV
    const cvPath = "./cv/Formato hoja de vida institucional 2025-2.pdf";
    
    // Crear un elemento <a> temporal para descargar el archivo
    const link = document.createElement('a');
    link.href = cvPath;
    link.download = 'CV_Juan_Ruiz.pdf'; // Nombre del archivo al descargar
    link.target = '_blank';
    
    // Agregar al DOM, hacer clic y remover
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Log initialization
console.log('[v0] Portfolio loaded successfully');
