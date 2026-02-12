// ===== CONFIGURATION =====
const CONFIG = {
    // Replace with your OpenAI API key (get from https://platform.openai.com/api-keys)
    OPENAI_API_KEY: 'sk-your-openai-api-key-here',
    
    // Python Backend URL - Update when deployed
    PYTHON_BACKEND_URL: 'http://localhost:5000/api/contact',
    
    // reCAPTCHA Site Key (get from https://www.google.com/recaptcha/admin)
    RECAPTCHA_SITE_KEY: 'YOUR_SITE_KEY',
    
    // Performance settings
    LAZY_LOAD_THRESHOLD: 0.1,
    DEBOUNCE_DELAY: 250
};

// ===== PERFORMANCE OPTIMIZATIONS =====
// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Intersection Observer for lazy loading
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const lazyImageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('lazyloaded');
                    lazyImageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px',
            threshold: CONFIG.LAZY_LOAD_THRESHOLD
        });

        document.querySelectorAll('img.lazyload').forEach(img => {
            lazyImageObserver.observe(img);
        });
    }
}

// ===== MAIN WEBSITE FUNCTIONS =====

// Toggle mobile menu - Fixed for iPhone
function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const body = document.body;
    
    mobileNav.classList.toggle('active');
    mobileOverlay.classList.toggle('active');
    body.classList.toggle('menu-open');
    
    // Prevent body scroll when menu is open
    if (mobileNav.classList.contains('active')) {
        body.style.overflow = 'hidden';
        body.style.position = 'fixed';
        body.style.width = '100%';
        body.style.height = '100%';
    } else {
        body.style.overflow = '';
        body.style.position = '';
        body.style.width = '';
        body.style.height = '';
    }
}

// Close mobile menu when clicking on overlay
document.getElementById('mobileOverlay').addEventListener('click', toggleMobileMenu);

// Close mobile menu when clicking outside (improved for touch devices)
document.addEventListener('click', (event) => {
    const mobileNav = document.getElementById('mobileNav');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    
    if (mobileNav.classList.contains('active') && 
        !mobileNav.contains(event.target) && 
        !mobileToggle.contains(event.target)) {
        toggleMobileMenu();
    }
});

// Close mobile menu on escape key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        const mobileNav = document.getElementById('mobileNav');
        if (mobileNav.classList.contains('active')) {
            toggleMobileMenu();
        }
    }
});
// Toggle main website theme - FIXED VERSION
function toggleMainTheme() {
    console.log("🎨 Theme toggle clicked");
    
    const body = document.body;
    const themeIcon = document.querySelector('.theme-icon-main i, .theme-icon-main');
    const themeText = document.querySelector('.theme-toggle-main span');
    const mobileThemeText = document.querySelector('.mobile-theme-toggle span');
    
    // Check current state
    const isDayMode = body.classList.contains('day-mode');
    const isNightMode = body.classList.contains('night-mode');
    
    console.log("Current state - Day mode:", isDayMode, "Night mode:", isNightMode);
    
    if (isDayMode) {
        // Switch to Night Mode
        body.classList.remove('day-mode');
        body.classList.add('night-mode');
        if (themeIcon) {
            themeIcon.className = 'fas fa-moon';
        }
        if (themeText) themeText.textContent = 'Night Mode';
        if (mobileThemeText) mobileThemeText.textContent = 'Night Mode';
        localStorage.setItem('websiteTheme', 'night');
        console.log("🌙 Switched to NIGHT mode");
    } else {
        // Switch to Day Mode
        body.classList.remove('night-mode');
        body.classList.add('day-mode');
        if (themeIcon) {
            themeIcon.className = 'fas fa-sun';
        }
        if (themeText) themeText.textContent = 'Day Mode';
        if (mobileThemeText) mobileThemeText.textContent = 'Day Mode';
        localStorage.setItem('websiteTheme', 'day');
        console.log("☀️ Switched to DAY mode");
    }
    // ===== THEME TOGGLE FUNCTION =====
function toggleMainTheme() {
    console.log("🎨 Theme toggle clicked");
    
    const body = document.body;
    const themeIcon = document.querySelector('.theme-icon-main i') || document.querySelector('.theme-icon-main');
    const themeText = document.querySelector('.theme-toggle-main span');
    
    // Check current state
    if (body.classList.contains('day-mode')) {
        // Switch to NIGHT mode
        body.classList.remove('day-mode');
        body.classList.add('night-mode');
        if (themeIcon) themeIcon.className = 'fas fa-moon';
        if (themeText) themeText.textContent = 'Night Mode';
        localStorage.setItem('websiteTheme', 'night');
        console.log("🌙 Switched to NIGHT mode");
    } else {
        // Switch to DAY mode
        body.classList.remove('night-mode');
        body.classList.add('day-mode');
        if (themeIcon) themeIcon.className = 'fas fa-sun';
        if (themeText) themeText.textContent = 'Day Mode';
        localStorage.setItem('websiteTheme', 'day');
        console.log("☀️ Switched to DAY mode");
    }
}

// Initialize theme on page load
function initWebsiteTheme() {
    const savedTheme = localStorage.getItem('websiteTheme');
    const body = document.body;
    const themeIcon = document.querySelector('.theme-icon-main i') || document.querySelector('.theme-icon-main');
    const themeText = document.querySelector('.theme-toggle-main span');
    
    if (savedTheme === 'day') {
        body.classList.add('day-mode');
        if (themeIcon) themeIcon.className = 'fas fa-sun';
        if (themeText) themeText.textContent = 'Day Mode';
    } else {
        body.classList.add('night-mode');
        if (themeIcon) themeIcon.className = 'fas fa-moon';
        if (themeText) themeText.textContent = 'Night Mode';
    }
}
}

// Scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        // Close mobile menu if open
        if (window.innerWidth <= 1024) {
            toggleMobileMenu();
        }
    }
}

// Open chat from button
function openChat() {
    toggleChat();
    // Close mobile menu if open
    if (window.innerWidth <= 1024) {
        toggleMobileMenu();
    }
}

// Initialize website theme - FIXED VERSION
function initWebsiteTheme() {
    console.log("🎨 Initializing theme...");
    
    const body = document.body;
    const themeIcon = document.querySelector('.theme-icon-main i, .theme-icon-main');
    const themeText = document.querySelector('.theme-toggle-main span');
    const mobileThemeText = document.querySelector('.mobile-theme-toggle span');
    
    // Check saved theme
    const savedTheme = localStorage.getItem('websiteTheme');
    
    if (savedTheme === 'day') {
        body.classList.remove('night-mode');
        body.classList.add('day-mode');
        if (themeIcon) themeIcon.className = 'fas fa-sun';
        if (themeText) themeText.textContent = 'Day Mode';
        if (mobileThemeText) mobileThemeText.textContent = 'Day Mode';
        console.log("☀️ Loaded DAY mode from storage");
    } else if (savedTheme === 'night') {
        body.classList.remove('day-mode');
        body.classList.add('night-mode');
        if (themeIcon) themeIcon.className = 'fas fa-moon';
        if (themeText) themeText.textContent = 'Night Mode';
        if (mobileThemeText) mobileThemeText.textContent = 'Night Mode';
        console.log("🌙 Loaded NIGHT mode from storage");
    } else {
        // Auto-detect system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
            body.classList.add('day-mode');
            if (themeIcon) themeIcon.className = 'fas fa-sun';
            if (themeText) themeText.textContent = 'Day Mode';
            if (mobileThemeText) mobileThemeText.textContent = 'Day Mode';
            console.log("☀️ Auto-detected DAY mode from system");
        } else {
            body.classList.add('night-mode');
            if (themeIcon) themeIcon.className = 'fas fa-moon';
            if (themeText) themeText.textContent = 'Night Mode';
            if (mobileThemeText) mobileThemeText.textContent = 'Night Mode';
            console.log("🌙 Auto-detected NIGHT mode from system");
        }
    }
}
// ===== PROJECT FILTERING SYSTEM =====
let currentFilter = 'all';

function initProjectFiltering() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const projectCount = document.getElementById('projectCount');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            currentFilter = btn.dataset.filter;
            filterProjects(currentFilter);
            updateProjectCount();
        });
    });
    
    // Initial count
    updateProjectCount();
}

function filterProjects(filter) {
    const projects = document.querySelectorAll('.project-card');
    let visibleCount = 0;
    
    projects.forEach(project => {
        const category = project.dataset.category;
        
        if (filter === 'all' || category === filter) {
            project.style.display = 'block';
            setTimeout(() => {
                project.style.opacity = '1';
                project.style.transform = 'scale(1)';
            }, 10);
            visibleCount++;
        } else {
            project.style.opacity = '0';
            project.style.transform = 'scale(0.9)';
            setTimeout(() => {
                project.style.display = 'none';
            }, 300);
        }
    });
    
    // Animate cards
    animateCards();
}

function updateProjectCount() {
    const countElement = document.getElementById('projectCount');
    const visibleProjects = document.querySelectorAll(`.project-card${currentFilter === 'all' ? '' : `[data-category="${currentFilter}"]`}`);
    
    countElement.textContent = `Showing ${visibleProjects.length} of 120+ projects`;
}

function viewProjectDetails(projectId) {
    // In a real implementation, this would open a modal or navigate to a project page
    showNotification(`Opening project details for project #${projectId}`, 'info');
}

// ===== TESTIMONIALS CAROUSEL =====
let currentTestimonial = 0;
let testimonialInterval;

function initTestimonials() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dotsContainer = document.getElementById('testimonialDots');
    
    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `testimonial-dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToTestimonial(index));
        dotsContainer.appendChild(dot);
    });
    
    // Auto-rotate testimonials
    startTestimonialAutoRotate();
    
    // Pause on hover
    const container = document.querySelector('.testimonial-container');
    container.addEventListener('mouseenter', () => {
        clearInterval(testimonialInterval);
    });
    
    container.addEventListener('mouseleave', () => {
        startTestimonialAutoRotate();
    });
    
    // Touch support for mobile
    let startX = 0;
    let isSwiping = false;
    
    container.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isSwiping = true;
        clearInterval(testimonialInterval);
    });
    
    container.addEventListener('touchmove', (e) => {
        if (!isSwiping) return;
        e.preventDefault();
    });
    
    container.addEventListener('touchend', (e) => {
        if (!isSwiping) return;
        isSwiping = false;
        
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextTestimonial();
            } else {
                prevTestimonial();
            }
        }
        
        startTestimonialAutoRotate();
    });
}

function goToTestimonial(index) {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.testimonial-dot');
    const track = document.getElementById('testimonialTrack');
    
    if (index >= slides.length) index = 0;
    if (index < 0) index = slides.length - 1;
    
    currentTestimonial = index;
    track.style.transform = `translateX(-${index * 100}%)`;
    
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function nextTestimonial() {
    const slides = document.querySelectorAll('.testimonial-slide');
    goToTestimonial((currentTestimonial + 1) % slides.length);
}

function prevTestimonial() {
    const slides = document.querySelectorAll('.testimonial-slide');
    goToTestimonial((currentTestimonial - 1 + slides.length) % slides.length);
}

function startTestimonialAutoRotate() {
    clearInterval(testimonialInterval);
    testimonialInterval = setInterval(() => {
        nextTestimonial();
    }, 5000);
}

// ===== ANIMATED COUNTERS =====
function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    const speed = 200;
    
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-count');
            const count = +counter.innerText.replace('+', '');
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 10);
            } else {
                counter.innerText = target + '+';
            }
        };
        
        updateCount();
    });
}

// Initialize counters when in viewport
function initCounters() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.getElementById('stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
}

// ===== CONTACT FORM WITH PYTHON BACKEND =====
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    // Form validation
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        //
      //  if (!validateRecaptcha()) {
       //     showNotification('Please complete the reCAPTCHA verification.', 'error');
      //      return;
     //   }
        //
        sendEmail();
    });
    
    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
}

function validateForm() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField({ target: input })) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    const errorElement = document.getElementById(field.id + 'Error');
    const formGroup = field.closest('.form-group');
    
    formGroup.classList.remove('error');
    errorElement.textContent = '';
    
    let error = '';
    
    switch (field.id) {
        case 'name':
            if (!value) error = 'Name is required';
            else if (value.length < 2) error = 'Name must be at least 2 characters';
            break;
        case 'email':
            if (!value) error = 'Email is required';
            else if (!isValidEmail(value)) error = 'Please enter a valid email';
            break;
        case 'phone':
            if (value && !isValidPhone(value)) error = 'Please enter a valid phone number';
            break;
        case 'service':
            if (!value) error = 'Please select a service';
            break;
        case 'message':
            if (!value) error = 'Message is required';
            else if (value.length < 10) error = 'Message must be at least 10 characters';
            break;
    }
    
    if (error) {
        formGroup.classList.add('error');
        errorElement.textContent = error;
        return false;
    }
    
    return true;
}

function clearFieldError(e) {
    const field = e.target;
    const formGroup = field.closest('.form-group');
    const errorElement = document.getElementById(field.id + 'Error');
    
    formGroup.classList.remove('error');
    errorElement.textContent = '';
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function isValidPhone(phone) {
    const re = /^[\+]?[0-9\s\-\(\)]+$/;
    return re.test(phone);
}

function validateRecaptcha() {
    // Always return true for testing
    console.log("✅ reCAPTCHA validation skipped for testing");
    return true;
}    


// ===== UPDATED: PYTHON BACKEND EMAIL FUNCTION =====
async function sendEmail() {
    console.log('📧 Python Backend Form Submission Started');
    
    const submitBtn = document.getElementById('submitBtn');
    const form = document.getElementById('contactForm');
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim() || 'Not provided',
        service: document.getElementById('service').value,
        message: document.getElementById('message').value.trim()
    };
    
    console.log('Form Data:', formData);
    
    // Use localhost for testing - CHANGE THIS WHEN DEPLOYED
    const API_URL = 'http://localhost:5000/api/contact';
    console.log('API URL:', API_URL);
    
    try {
        // Send to Python backend
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        console.log('Response Status:', response.status);
        const result = await response.json();
        console.log('Response Data:', result);
        
        if (response.ok && result.success) {
            showNotification(result.message || '✅ Message sent successfully! We will contact you soon.', 'success');
            form.reset();
            if (typeof grecaptcha !== 'undefined') {
                grecaptcha.reset();
            }
        } else {
            showNotification(result.message || '❌ Failed to send message. Please try again.', 'error');
        }
    } catch (error) {
        console.error('Contact form error:', error);
        
        if (error.toString().includes('Failed to fetch')) {
            showNotification('⚠️ Cannot connect to Python backend. Make sure it is running!', 'error');
            showNotification('Run this command: python app.py', 'info');
        } else {
            showNotification('❌ Network error. Please check your connection.', 'error');
        }
    } finally {
        // Reset button state
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        console.log('Form submission complete.');
    }
}

// ===== NEWSLETTER FORM =====
function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletterForm');
    if (!newsletterForm) return;
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        
        if (emailInput.value && isValidEmail(emailInput.value)) {
            // In a real implementation, send to your newsletter service
            console.log('Newsletter subscription:', emailInput.value);
            showNotification('Thank you for subscribing to our newsletter!', 'success');
            emailInput.value = '';
        } else {
            showNotification('Please enter a valid email address.', 'error');
        }
    });
}

// ===== AI CHAT WITH OPENAI INTEGRATION =====
let chatVisible = false;
let voiceRecognition = null;
let conversationHistory = [];
let currentChatTheme = 'night';
let isProcessingAI = false;

// Initialize chat
function initAIChat() {
    // Load saved theme preference
    const savedTheme = localStorage.getItem('chatTheme');
    if (savedTheme) {
        setChatTheme(savedTheme);
    } else {
        // Auto-detect system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
            setChatTheme('day');
        }
    }
    
    // Load chat history
    loadChatHistory();
    
    // Initialize voice recognition
    initVoiceRecognition();
    
    // Show welcome message after delay
    setTimeout(() => {
        document.getElementById('chatNotification').style.display = 'block';
    }, 3000);
}

// Toggle chat theme
function toggleChatTheme(event) {
    event.stopPropagation();
    const newTheme = currentChatTheme === 'night' ? 'day' : 'night';
    setChatTheme(newTheme);
}

// Set chat theme
function setChatTheme(theme) {
    const chatWidget = document.querySelector('.ai-chat-widget');
    if (!chatWidget) return;
    
    chatWidget.classList.remove('day-mode', 'night-mode');
    chatWidget.classList.add(theme === 'day' ? 'day-mode' : 'night-mode');
    
    const knob = document.querySelector('.theme-knob');
    if (knob) {
        knob.style.left = theme === 'day' ? 'calc(100% - 18px)' : '2px';
    }
    
    const dayIcon = document.querySelector('.day-icon');
    const nightIcon = document.querySelector('.night-icon');
    if (dayIcon && nightIcon) {
        dayIcon.style.opacity = theme === 'night' ? '1' : '0';
        nightIcon.style.opacity = theme === 'day' ? '1' : '0';
    }
    
    currentChatTheme = theme;
    localStorage.setItem('chatTheme', theme);
    updateChatIcon(theme);
}

// Update chat toggle button color
function updateChatIcon(theme) {
    const chatBtn = document.querySelector('.chat-toggle-btn');
    if (!chatBtn) return;
    
    chatBtn.style.background = '#fbbf24';
    chatBtn.style.color = '#020617';
    chatBtn.style.boxShadow = theme === 'day' 
        ? '0 5px 20px rgba(251, 191, 36, 0.4)' 
        : '0 5px 20px rgba(251, 191, 36, 0.6)';
}

// Toggle chat visibility
function toggleChat() {
    const chatWidget = document.querySelector('.ai-chat-widget');
    chatVisible = !chatVisible;
    
    if (chatVisible) {
        chatWidget.classList.add('active');
        document.getElementById('chatInput').focus();
        document.getElementById('chatNotification').style.display = 'none';
    } else {
        chatWidget.classList.remove('active');
    }
}

// Send message
function sendMessage() {
    if (isProcessingAI) return;
    
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    addMessage(message, 'user');
    input.value = '';
    
    showTypingIndicator();
    isProcessingAI = true;
    
    // Use OpenAI API if configured, otherwise use fallback
    if (CONFIG.OPENAI_API_KEY && CONFIG.OPENAI_API_KEY !== 'sk-your-openai-api-key-here') {
        callOpenAI(message);
    } else {
        // Fallback to local AI responses
        setTimeout(() => {
            processAIMessage(message);
            isProcessingAI = false;
        }, 1000);
    }
}

// Call OpenAI API
async function callOpenAI(userMessage) {
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${CONFIG.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a construction expert AI assistant specializing in Kenyan construction industry. Provide accurate, practical advice about construction costs, materials, timelines, permits, and sustainability in Kenya. Keep responses concise and focused.'
                    },
                    ...conversationHistory.slice(-10).map(msg => ({
                        role: msg.sender === 'user' ? 'user' : 'assistant',
                        content: msg.text
                    })),
                    {
                        role: 'user',
                        content: userMessage
                    }
                ],
                max_tokens: 500,
                temperature: 0.7
            })
        });
        
        if (!response.ok) {
            throw new Error(`OpenAI API error: ${response.status}`);
        }
        
        const data = await response.json();
        const aiResponse = data.choices[0].message.content;
        
        removeTypingIndicator();
        addMessage(aiResponse, 'ai');
        
    } catch (error) {
        console.error('OpenAI API Error:', error);
        removeTypingIndicator();
        // Fallback to local responses
        processAIMessage(userMessage);
    } finally {
        isProcessingAI = false;
    }
}

// Add message to chat
function addMessage(text, sender) {
    const chatBody = document.getElementById('chatBody');
    const messageId = Date.now();
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    messageDiv.id = `msg-${messageId}`;
    
    const avatar = sender === 'ai' ? 'fa-robot' : 'fa-user';
    
    messageDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas ${avatar}"></i>
        </div>
        <div class="message-content">
            <div class="message-text">${formatMessage(text)}</div>
            <div class="message-time">${getCurrentTime()}</div>
        </div>
    `;
    
    chatBody.appendChild(messageDiv);
    scrollToBottom();
    
    conversationHistory.push({
        id: messageId,
        sender,
        text,
        time: new Date().toISOString()
    });
    
    saveChatHistory();
}

// Format message
function formatMessage(text) {
    text = text.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" style="color: var(--primary-color);">$1</a>');
    text = text.replace(/\n/g, '<br>');
    text = text.replace(/(\d+(?:\.\d+)?\s*(?:sq\.?m|sqm|m²|square meters?))/gi, 
        '<code style="background: rgba(251,191,36,0.2); padding: 2px 5px; border-radius: 3px; font-family: monospace; border: 1px solid rgba(251,191,36,0.3);">$1</code>');
    text = text.replace(/(KES\s?\d+(?:,\d+)*(?:\.\d+)?)/g, 
        '<strong style="color: var(--success-color);">$1</strong>');
    
    const importantWords = ['important', 'urgent', 'critical', 'emergency', 'immediately'];
    importantWords.forEach(word => {
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        text = text.replace(regex, `<strong style="color: var(--danger-color);">$&</strong>`);
    });
    
    return text;
}

// Show typing indicator
function showTypingIndicator() {
    const chatBody = document.getElementById('chatBody');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'typing-indicator';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = `
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <span>AI is thinking...</span>
    `;
    
    chatBody.appendChild(typingDiv);
    scrollToBottom();
}

// Remove typing indicator
function removeTypingIndicator() {
    const typing = document.getElementById('typingIndicator');
    if (typing) typing.remove();
}

// Process AI message (fallback when OpenAI not available)
function processAIMessage(userMessage) {
    removeTypingIndicator();
    
    const intent = analyzeIntent(userMessage);
    let response = generateAIResponse(userMessage, intent);
    
    addMessage(response, 'ai');
    showContextualQuickQuestions(intent);
    
    if (intent === 'complex_technical' || intent === 'legal_permit') {
        setTimeout(() => {
            addMessage("This seems complex. Type 'yes' to connect with our construction expert.", 'ai');
        }, 1500);
    }
}

// Analyze intent
function analyzeIntent(message) {
    const msg = message.toLowerCase();
    
    if (msg.includes('cost') || msg.includes('price') || msg.includes('budget')) return 'cost_estimation';
    if (msg.includes('material') || msg.includes('cement') || msg.includes('brick')) return 'material_advice';
    if (msg.includes('time') || msg.includes('how long') || msg.includes('duration')) return 'timeline';
    if (msg.includes('permit') || msg.includes('license') || msg.includes('approval')) return 'legal_permit';
    if (msg.includes('design') || msg.includes('plan') || msg.includes('layout')) return 'design_advice';
    if (msg.includes('sustainable') || msg.includes('green') || msg.includes('eco')) return 'sustainability';
    if (msg.includes('foundation') || msg.includes('structural')) return 'complex_technical';
    if (msg.includes('contact') || msg.includes('call') || msg.includes('meet')) return 'contact_request';
    if (msg.includes('theme') || msg.includes('dark') || msg.includes('light')) return 'theme_change';
    
    return 'general';
}

// Generate AI response (fallback)
function generateAIResponse(userMessage, intent) {
    if (intent === 'theme_change') {
        const msg = userMessage.toLowerCase();
        if (msg.includes('light') || msg.includes('day')) {
            setChatTheme('day');
            return "🌞 Switched to Day Mode! Brighter interface for well-lit environments.";
        } else if (msg.includes('dark') || msg.includes('night')) {
            setChatTheme('night');
            return "🌙 Switched to Night Mode! Easier on eyes in low-light.";
        } else {
            const newTheme = currentChatTheme === 'night' ? 'day' : 'night';
            setChatTheme(newTheme);
            return `${newTheme === 'day' ? '🌞' : '🌙'} Switched to ${newTheme === 'day' ? 'Day' : 'Night'} Mode!`;
        }
    }

    const responses = {
        cost_estimation: `🏠 <strong>Residential Construction Costs in Kenya (2024)</strong>

<strong>Basic Finish:</strong> KES 25,000 - 35,000 per sq.m
<strong>Standard Finish:</strong> KES 35,000 - 50,000 per sq.m
<strong>Premium Finish:</strong> KES 50,000 - 80,000 per sq.m

<strong>Example:</strong> 200 sq.m standard house in Nairobi:
200 × KES 42,500 = KES 8.5M + Contingency (15%) = KES 9.8M

Need a detailed breakdown for your project?`,
        
        material_advice: `🧱 <strong>Construction Materials for Kenya</strong>

<strong>Foundation:</strong> 42.5 N cement, Y12/Y16 steel
<strong>Walls:</strong> Wire cut bricks (KES 25-35 each)
<strong>Blocks:</strong> 6-inch hollow for insulation
<strong>Roofing:</strong> Clay tiles (KES 850-1,200/sq.m)

What specific material are you considering?`,
        
        timeline: `⏰ <strong>Construction Timelines</strong>

<strong>Residential House (3 Bedroom):</strong>
1. Site prep: 1-2 weeks
2. Foundation: 2-3 weeks
3. Structure: 4-6 weeks
4. Roofing: 1-2 weeks
5. Finishes: 6-8 weeks
6. MEP: 2-3 weeks

<strong>Total: 4-6 months</strong>

Common delays: Permits, weather, material delivery.`,
        
        legal_permit: `📋 <strong>Building Permit Process</strong>

<strong>Required:</strong>
1. Title deed
2. Architectural drawings
3. Structural drawings
4. NEMA approval
5. Land rates clearance

<strong>Timeline:</strong> 4-12 weeks
<strong>Costs:</strong> Application fee KES 5,000 + 1-2% of project cost

We can handle permits for KES 50,000-150,000 flat fee.`,
        
        sustainability: `🌿 <strong>Sustainable Construction</strong>

<strong>Energy Efficiency:</strong>
• Solar water heating (saves 60-70% electricity)
• LED lighting
• Proper insulation
• Energy Star appliances

<strong>Water Conservation:</strong>
• Rainwater harvesting
• Greywater recycling
• Low-flow fixtures

20-30% energy savings, 30-50% water savings.`,
        
        general: `👷 <strong>Construction AI Assistant</strong>

I can help with:
💰 Cost Planning
🏗️ Technical Advice
📅 Project Management
📋 Legal & Compliance
🌱 Sustainability
🌞/🌙 Day/Night Mode toggle

Ask me anything about construction in Kenya!`
    };

    if (intent === 'cost_estimation') {
        return userMessage.toLowerCase().includes('commercial') 
            ? `🏢 <strong>Commercial Construction Costs</strong>

Office Buildings: KES 40,000 - 60,000 per sq.m
Retail Spaces: KES 35,000 - 55,000 per sq.m
Warehouses: KES 20,000 - 35,000 per sq.m

Additional: Fire systems, accessibility, security.`
            : responses.cost_estimation;
    }
    
    return responses[intent] || responses.general;
}

// Show quick questions
function showContextualQuickQuestions(intent) {
    const questions = {
        cost_estimation: ['Breakdown by phase?', 'Hidden costs?', 'Reduce costs?'],
        material_advice: ['Local vs imported?', 'Waterproofing?', 'Sustainable options?'],
        timeline: ['Accelerate timeline?', 'Rainy season?', 'Critical path?']
    }[intent] || ['Your experience?', 'View projects', 'Contact expert'];
    
    updateQuickQuestions(questions);
}

// Update quick questions
function updateQuickQuestions(questions) {
    const container = document.querySelector('.quick-questions');
    if (!container) return;
    
    container.innerHTML = '';
    
    questions.forEach(question => {
        const btn = document.createElement('button');
        btn.className = 'quick-question';
        btn.textContent = question;
        btn.onclick = () => askQuickQuestion(question);
        container.appendChild(btn);
    });
}

// Ask quick question
function askQuickQuestion(question) {
    document.getElementById('chatInput').value = question;
    sendMessage();
}

// Voice input functions
function initVoiceRecognition() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        voiceRecognition = new SpeechRecognition();
        voiceRecognition.continuous = false;
        voiceRecognition.interimResults = false;
        voiceRecognition.lang = 'en-US';
        
        voiceRecognition.onresult = function(event) {
            const transcript = event.results[0][0].transcript;
            document.getElementById('chatInput').value = transcript;
            document.getElementById('voiceStatus').textContent = `Heard: "${transcript}"`;
            
            setTimeout(() => {
                closeVoiceModal();
                sendMessage();
            }, 1000);
        };
        
        voiceRecognition.onerror = function(event) {
            console.error('Voice recognition error:', event.error);
            document.getElementById('voiceStatus').textContent = 'Error: ' + event.error;
        };
    }
}

function startVoiceInput() {
    const modal = document.getElementById('voiceModal');
    modal.classList.add('active');
    
    if (voiceRecognition) {
        voiceRecognition.start();
        document.getElementById('voiceStatus').textContent = 'Listening... Speak now!';
    } else {
        document.getElementById('voiceStatus').textContent = 'Voice recognition not supported';
    }
}

function stopVoiceInput() {
    if (voiceRecognition) voiceRecognition.stop();
    closeVoiceModal();
}

function closeVoiceModal() {
    document.getElementById('voiceModal').classList.remove('active');
}

// File analysis
function analyzeImage() {
    const fileInput = document.getElementById('fileUpload');
    if (fileInput.files.length === 0) {
        addMessage("Upload an image first via paperclip icon", 'ai');
        return;
    }
    
    showTypingIndicator();
    
    setTimeout(() => {
        removeTypingIndicator();
        addMessage(`🖼️ <strong>Image Analysis</strong>

Detected: Construction site
Area: ~500 sq.m
Progress: Foundation stage
Materials: Cement, steel
Quality: Good formwork

Recommendations:
1. Check soil compaction
2. Proper concrete curing
3. Verify reinforcement

Foundation: 2-3 weeks
Materials: 80 bags cement, 2 tons steel

Need detailed report?`, 'ai');
    }, 2000);
}

// Cost estimation
function estimateCost() {
    showTypingIndicator();
    
    setTimeout(() => {
        removeTypingIndicator();
        addMessage(`💰 <strong>Cost Estimator</strong>

1. <strong>Property Type:</strong> □ House □ Apartment □ Office □ Retail
2. <strong>Size:</strong> _______ sq.m
3. <strong>Location:</strong> Nairobi / Mombasa / Other
4. <strong>Finish:</strong> □ Basic □ Standard □ Premium
5. <strong>Special:</strong> □ Basement □ Pool □ Solar □ Smart Home

<strong>Example:</strong> 200 sq.m, Standard, Nairobi
<strong>Total: KES 8.5M - 10M</strong>

Generate detailed breakdown?`, 'ai');
    }, 1500);
}

// Schedule call
function scheduleCall() {
    addMessage(`📞 <strong>Expert Consultation</strong>

Available slots:
• Today: 2:00 PM - 4:00 PM
• Tomorrow: 9:00 AM - 12:00 PM
• Wednesday: 10:00 AM - 3:00 PM

Select a time or provide availability:`, 'ai');
}

// Utility functions
function getCurrentTime() {
    return new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
}

function scrollToBottom() {
    const chatBody = document.getElementById('chatBody');
    if (chatBody) {
        chatBody.scrollTop = chatBody.scrollHeight;
    }
}

function saveChatHistory() {
    localStorage.setItem('constructionChatHistory', JSON.stringify(conversationHistory));
}

function loadChatHistory() {
    const saved = localStorage.getItem('constructionChatHistory');
    if (saved) {
        conversationHistory = JSON.parse(saved);
        const recent = conversationHistory.slice(-5);
        recent.forEach(msg => addMessage(msg.text, msg.sender));
    }
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentElement) notification.remove();
    }, 5000);
}

// Card animations
function animateCards() {
    const cards = document.querySelectorAll('.card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    cards.forEach(card => {
        observer.observe(card);
    });
}

// Update current year in footer
function updateCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// ===== PROJECT PHOTO GALLERY SYSTEM =====
const projectImages = {
    1: {
        title: "Meru Greenwood Park",
        description: "A 6 floor shopping mall in Meru ",
        images: [
            { src: "WhatsApp Image 2026-01-29 at 10.28.39 AM (1).jpeg", alt: "Night view" },
            { src: "WhatsApp Image 2026-01-29 at 10.28.38 AM (2).jpeg", alt: "Lobby interior" },
            { src: "WhatsApp Image 2026-01-29 at 10.28.35 AM.jpeg", alt: "Construction work" },
            { src: "WhatsApp Image 2026-01-29 at 10.28.38 AM.jpeg", alt: "site view" },
            { src: "WhatsApp Image 2026-01-29 at 10.28.35 AM (1).jpeg", alt: "side view" },

        ]
    },
    2: {
        title: "Karen Residential Estate",
        description: "Luxury residential development",
        images: [
            { src: "WhatsApp Image 2026-01-29 at 10.28.47 AM.jpeg", alt: "Main entrance" },
            { src: "WhatsApp Image 2026-01-29 at 10.28.44 AM (1).jpeg", alt: "Living room" },
            { src: "WhatsApp Image 2026-01-29 at 10.28.46 AM.jpeg", alt: "Kitchen" },
            { src: "WhatsApp Image 2026-01-29 at 10.28.45 AM.jpeg", alt: "Verandah" },
            { src: "WhatsApp Image 2026-01-29 at 10.29.05 AM.jpeg", alt: "Verandah" },
            
        ]
    },
    3: {
        title: "Modern Villa Runda",
        description: "Restoration of modern to Exquisite",
        images: [
            { src: "WhatsApp Image 2026-01-29 at 10.28.57 AM (1).jpeg", alt: "Renovated villa" },
            { src: "WhatsApp Image 2026-01-29 at 10.28.55 AM.jpeg", alt: "Construction work" },
            { src: "WhatsApp Image 2026-01-29 at 10.28.55 AM (1).jpeg", alt: "Construction modification" },
            { src: "WhatsApp Image 2026-01-29 at 10.28.40 AM.jpeg", alt: "Old gate" },
            { src: "WhatsApp Image 2026-01-29 at 10.28.39 AM (2).jpeg", alt: "New gate" },
        ]
    },
    4: {
        title: "Civil Construction",
        description: "Dam lining",
        images: [
            { src: "WhatsApp Image 2026-01-29 at 10.28.40 AM (1).jpeg", alt: "Civil works" },
            { src: "WhatsApp Image 2026-01-29 at 10.28.43 AM (2).jpeg", alt: "Civil Team" },
            { src: "images.jpg", alt: "Dam lining" },
        ]
    },
    
};

let currentProject = 1;
let currentImageIndex = 1;
let lightboxOpen = false;

// Change image in gallery
function changeImage(projectId, imageIndex) {
    const project = projectImages[projectId];
    if (!project || !project.images[imageIndex - 1]) return;
    
    // Update main image
    const mainImg = document.getElementById(`project${projectId}-main`);
    const counter = document.getElementById(`project${projectId}-counter`);
    
    if (mainImg) {
        mainImg.src = project.images[imageIndex - 1].src;
        mainImg.alt = project.images[imageIndex - 1].alt;
    }
    
    if (counter) {
        counter.textContent = `${imageIndex}/${project.images.length}`;
    }
    
    // Update active thumbnail
    const thumbnails = document.querySelectorAll(`[data-project="${projectId}"] .thumbnail`);
    thumbnails.forEach((thumb, index) => {
        thumb.classList.toggle('active', index === imageIndex - 1);
    });
    
    // Store current state
    currentProject = projectId;
    currentImageIndex = imageIndex;
}

// Next image
function nextImage(projectId) {
    const project = projectImages[projectId];
    if (!project) return;
    
    let nextIndex = currentImageIndex + 1;
    if (nextIndex > project.images.length) {
        nextIndex = 1;
    }
    
    changeImage(projectId, nextIndex);
}

// Previous image
function prevImage(projectId) {
    const project = projectImages[projectId];
    if (!project) return;
    
    let prevIndex = currentImageIndex - 1;
    if (prevIndex < 1) {
        prevIndex = project.images.length;
    }
    
    changeImage(projectId, prevIndex);
}

// Open lightbox
function openLightbox(projectId, imageIndex = 1) {
    const project = projectImages[projectId];
    if (!project) return;
    
    currentProject = projectId;
    currentImageIndex = imageIndex;
    lightboxOpen = true;
    
    // Update lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-image');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDesc = document.getElementById('lightbox-description');
    const lightboxCounter = document.getElementById('lightbox-counter');
    const lightboxThumbnails = document.getElementById('lightbox-thumbnails');
    
    if (!lightboxImg || !lightbox) return;
    
    // Set main image
    lightboxImg.src = project.images[imageIndex - 1].src;
    lightboxImg.alt = project.images[imageIndex - 1].alt;
    if (lightboxTitle) lightboxTitle.textContent = project.title;
    if (lightboxDesc) lightboxDesc.textContent = project.images[imageIndex - 1].alt;
    if (lightboxCounter) lightboxCounter.textContent = `${imageIndex}/${project.images.length}`;
    
    // Clear and create thumbnails
    if (lightboxThumbnails) {
        lightboxThumbnails.innerHTML = '';
        project.images.forEach((image, index) => {
            const thumb = document.createElement('div');
            thumb.className = `lightbox-thumbnail ${index === imageIndex - 1 ? 'active' : ''}`;
            thumb.onclick = () => changeLightboxImage(index + 1);
            
            const img = document.createElement('img');
            img.src = image.src;
            img.alt = image.alt;
            img.className = 'lazyload';
            
            thumb.appendChild(img);
            lightboxThumbnails.appendChild(thumb);
        });
    }
    
    // Show lightbox
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close lightbox
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
    }
    document.body.style.overflow = '';
    lightboxOpen = false;
}

// Change image in lightbox
function changeLightboxImage(imageIndex) {
    const project = projectImages[currentProject];
    if (!project || !project.images[imageIndex - 1]) return;
    
    currentImageIndex = imageIndex;
    
    const lightboxImg = document.getElementById('lightbox-image');
    const lightboxDesc = document.getElementById('lightbox-description');
    const lightboxCounter = document.getElementById('lightbox-counter');
    const lightboxThumbnails = document.querySelectorAll('.lightbox-thumbnail');
    
    if (lightboxImg) {
        lightboxImg.src = project.images[imageIndex - 1].src;
        lightboxImg.alt = project.images[imageIndex - 1].alt;
    }
    if (lightboxDesc) lightboxDesc.textContent = project.images[imageIndex - 1].alt;
    if (lightboxCounter) lightboxCounter.textContent = `${imageIndex}/${project.images.length}`;
    
    // Update active thumbnail
    lightboxThumbnails.forEach((thumb, index) => {
        thumb.classList.toggle('active', index === imageIndex - 1);
    });
}

// Lightbox navigation
function lightboxNext() {
    const project = projectImages[currentProject];
    if (!project) return;
    
    let nextIndex = currentImageIndex + 1;
    if (nextIndex > project.images.length) {
        nextIndex = 1;
    }
    
    changeLightboxImage(nextIndex);
}

function lightboxPrev() {
    const project = projectImages[currentProject];
    if (!project) return;
    
    let prevIndex = currentImageIndex - 1;
    if (prevIndex < 1) {
        prevIndex = project.images.length;
    }
    
    changeLightboxImage(prevIndex);
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!lightboxOpen) return;
    
    switch(e.key) {
        case 'Escape':
            closeLightbox();
            break;
        case 'ArrowRight':
            lightboxNext();
            break;
        case 'ArrowLeft':
            lightboxPrev();
            break;
    }
});

// Initialize galleries
function initProjectGalleries() {
    // Set initial images for all projects
    Object.keys(projectImages).forEach(projectId => {
        changeImage(parseInt(projectId), 1);
    });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', function() {
    // Initialize main website features
    initWebsiteTheme();
    initCounters();
    initContactForm();
    initNewsletterForm();
    updateCurrentYear();
    
    // Initialize project filtering
    initProjectFiltering();

    // Initialize project galleries
    initProjectGalleries(); 
 
    // Initialize testimonials carousel
    initTestimonials();
    
    // Initialize lazy loading
    initLazyLoading();
    
    // Animate cards
    animateCards();
    
    // Initialize chat if elements exist
    if (document.querySelector('.ai-chat-widget')) {
        initAIChat();
        // Initialize everything
document.addEventListener('DOMContentLoaded', function() {
    console.log("🚀 Initializing website...");
    
    // Initialize theme
    initWebsiteTheme();
    
    // Initialize contact form (your existing function)
    initContactForm();
    
    // Initialize testimonials
    initTestimonials();
    
    // Initialize project filtering
    initProjectFiltering();
    
    // Initialize AI chat (if exists)
    if (document.querySelector('.ai-chat-widget')) {
        initAIChat();
    }
    
    // Initialize lazy loading
    initLazyLoading();
    
    // Animate cards
    animateCards();
    
    // Update current year
    updateCurrentYear();
    
    console.log("✅ Website initialized successfully!");
});
        
        // Chat input enter key
        document.getElementById('chatInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') sendMessage();
        });
        
        // File upload
        document.getElementById('fileUpload').addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                document.getElementById('fileInfo').textContent = file.name;
                addMessage(`📎 Uploaded: ${file.name} (${(file.size/1024).toFixed(1)} KB)`, 'user');
                
                if (file.type.startsWith('image/')) {
                    setTimeout(() => {
                        addMessage("Analyze this image for construction progress?", 'ai');
                    }, 1000);
                }
            }
        });
    }
    
    // System theme changes
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', e => {
            if (!localStorage.getItem('websiteTheme')) {
                const body = document.body;
                const themeIcon = document.querySelector('.theme-icon-main');
                const themeText = document.querySelector('.theme-toggle-main span');
                const mobileThemeText = document.querySelector('.mobile-theme-toggle span');
                
                if (e.matches) {
                    body.classList.remove('night-mode');
                    body.classList.add('day-mode');
                    themeIcon.className = 'fas fa-sun theme-icon-main';
                    themeText.textContent = 'Day Mode';
                    if (mobileThemeText) mobileThemeText.textContent = 'Day Mode';
                } else {
                    body.classList.remove('day-mode');
                    body.classList.add('night-mode');
                    themeIcon.className = 'fas fa-moon theme-icon-main';
                    themeText.textContent = 'Night Mode';
                    if (mobileThemeText) mobileThemeText.textContent = 'Night Mode';
                }
            }
            
            if (!localStorage.getItem('chatTheme')) {
                setChatTheme(e.matches ? 'day' : 'night');
            }
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#home') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
                
                // Close mobile menu if open
                if (window.innerWidth <= 1024) {
                    toggleMobileMenu();
                }
            }
        });
    });
    
    // Performance: Preload critical images
    window.addEventListener('load', () => {
        const criticalImages = ['hero'];
        criticalImages.forEach(imgId => {
            const img = document.getElementById(imgId);
            if (img && img.dataset.src) {
                img.src = img.dataset.src;
            }
        });
    });
});

// Service Worker for offline support (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(error => {
            console.log('Service Worker registration failed:', error);
        });
    });

}
// ===== QUICK COUNTER FIX =====
window.addEventListener('load', function() {
    console.log("🔄 Loading counters...");
    
    // Set counter values directly
    const counterData = {
        'projects': 120,
        'years': 20,
        'clients': 85,
        'awards': 15
    };
    
    // Find all counter elements
    const statElements = document.querySelectorAll('.stat-item h3');
    statElements.forEach((el, index) => {
        const values = [120, 20, 85, 15];
        if (index < values.length) {
            el.textContent = values[index] + '+';
        }
    });
    
    console.log("✅ Counters fixed!");
});
// ===== SOCIAL MEDIA TRACKING =====
function initSocialMediaTracking() {
    const socialLinks = document.querySelectorAll('.social-links a');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const platform = this.title;
            const url = this.href;
            
            console.log(`🌐 Social media click: ${platform}`);
            
            // You can track this with Google Analytics or your own analytics
            trackSocialClick(platform, url);
            
            // Open in new tab (already handled by target="_blank")
            // Optional: Add a slight delay for better UX
            setTimeout(() => {
                // You could show a notification
                showNotification(`Opening ${platform}...`, 'info');
            }, 100);
        });
    });
}

// Track social clicks (for analytics)
function trackSocialClick(platform, url) {
    // Example: Send to Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'social_click', {
            'event_category': 'Social Media',
            'event_label': platform,
            'value': 1
        });
    }
    
    // Or log to console for now
    console.log(`📊 Social click tracked: ${platform} - ${url}`);
    
    // Save to localStorage for simple tracking
    const socialClicks = JSON.parse(localStorage.getItem('socialClicks') || '{}');
    socialClicks[platform] = (socialClicks[platform] || 0) + 1;
    localStorage.setItem('socialClicks', JSON.stringify(socialClicks));
}

// Show social media stats (optional admin feature)
function showSocialStats() {
    const stats = JSON.parse(localStorage.getItem('socialClicks') || '{}');
    console.log('📊 Social Media Clicks:', stats);
    
    let message = '📱 Social Media Clicks:\n';
    for (const [platform, count] of Object.entries(stats)) {
        message += `${platform}: ${count} clicks\n`;
    }
    
    alert(message);
}