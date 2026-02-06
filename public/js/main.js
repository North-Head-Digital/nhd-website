/**
 * North Head Digital - Main JavaScript
 * Extracted from index.html for better maintainability
 * 
 * This file contains all interactive functionality for the NHD website including:
 * - Custom cursor effects for desktop users
 * - Particle system animations
 * - Navigation and mobile menu handling
 * - Scroll-based animations and parallax effects
 * - Case study filtering functionality
 * - Contact form handling with animations
 * - Lazy loading for performance optimization
 */

/**
 * Custom Cursor Implementation
 * Provides interactive cursor effects for desktop users
 * Disabled on mobile devices for better touch experience
 */
class CustomCursor {
    constructor() {
        this.cursor = null;
        this.cursorFollower = null;
        this.init();
    }

    init() {
        this.cursor = document.querySelector('.cursor');
        this.cursorFollower = document.querySelector('.cursor-follower');
        
        if (!this.cursor || !this.cursorFollower) return;

        const canUseCursor = window.matchMedia('(min-width: 768px) and (pointer: fine)').matches &&
            !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
            document.body.classList.contains('enable-custom-cursor');

        if (canUseCursor) {
            this.setupEventListeners();
            this.setupInteractiveElements();
        } else {
            this.cursor.style.display = 'none';
            this.cursorFollower.style.display = 'none';
        }
    }

    setupEventListeners() {
        document.addEventListener('mousemove', (e) => {
            this.cursor.style.left = e.clientX + 'px';
            this.cursor.style.top = e.clientY + 'px';
            
            setTimeout(() => {
                this.cursorFollower.style.left = e.clientX - 10 + 'px';
                this.cursorFollower.style.top = e.clientY - 10 + 'px';
            }, 50);
        });
    }

    setupInteractiveElements() {
        const interactiveElements = document.querySelectorAll('a, button, .info-item');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => this.cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => this.cursor.classList.remove('hover'));
        });
    }
}

/**
 * Particle System
 * Creates floating particle animations in the hero section
 * Generates particles with random sizes, positions, and animation durations
 */
class ParticleSystem {
    constructor() {
        this.particleCanvas = null;
        this.intervalId = null;
        this.init();
    }

    init() {
        this.particleCanvas = document.querySelector('.particle-canvas');
        const allowParticles = !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
            window.innerWidth >= 1024;

        if (this.particleCanvas && allowParticles) {
            this.startParticleGeneration();
        }
    }

    /**
     * Creates a new floating particle with random properties
     * Particles have random size, position, and animation duration for natural effect
     */
    createParticle() {
        if (!this.particleCanvas) return;
        
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random size between 2-6px for variety
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random horizontal position across the screen
        particle.style.left = Math.random() * 100 + '%';
        
        // Random animation duration (10-30 seconds) and delay (0-5 seconds)
        particle.style.animationDuration = (Math.random() * 20 + 10) + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        this.particleCanvas.appendChild(particle);
        
        // Clean up particle after animation completes (30 seconds max)
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, 30000);
    }

    startParticleGeneration() {
        if (this.intervalId) return;
        this.intervalId = setInterval(() => this.createParticle(), 1200);
    }
}

const DEFAULT_API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:5000'
    : 'https://nhd-api-production.up.railway.app';

function getNhdConfig() {
    return window.NHD_CONFIG || {};
}

function normalizeEndpoint(endpoint) {
    if (!endpoint || typeof endpoint !== 'string') return '';
    return endpoint.trim().replace(/\/+$/, '');
}

function getApiBaseUrl() {
    const config = getNhdConfig();
    return normalizeEndpoint(config.apiBaseUrl || DEFAULT_API_BASE_URL);
}

function getErrorMessage(response, fallback) {
    return response.json()
        .then(data => data.message || fallback)
        .catch(() => fallback);
}

function trackEvent(eventName, payload = {}) {
    if (window.gtag) {
        window.gtag('event', eventName, payload);
    }
}

/**
 * Navigation Controller
 * Handles mobile menu toggle, header scroll effects, and smooth scrolling
 * Manages accessibility attributes for screen readers
 */
class NavigationController {
    constructor() {
        this.hamburger = null;
        this.navMenu = null;
        this.header = null;
        this.init();
    }

    init() {
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.header = document.querySelector('.header');
        
        this.setupMobileNavigation();
        this.setupHeaderScroll();
        this.setupSmoothScroll();
    }

    setupMobileNavigation() {
        if (this.hamburger && this.navMenu) {
            this.hamburger.addEventListener('click', () => {
                this.hamburger.classList.toggle('active');
                this.navMenu.classList.toggle('active');
                const isActive = this.hamburger.classList.contains('active');
                this.hamburger.setAttribute('aria-expanded', isActive);
            });

            // Close mobile menu when clicking a link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    this.hamburger.classList.remove('active');
                    this.navMenu.classList.remove('active');
                    this.hamburger.setAttribute('aria-expanded', 'false');
                });
            });
        }
    }

    setupHeaderScroll() {
        if (!this.header) return;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                this.header.classList.add('scrolled');
            } else {
                this.header.classList.remove('scrolled');
            }
        });
    }

    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const targetId = anchor.getAttribute('href');
                if (targetId === '#') return;
                
                e.preventDefault();
                const target = document.querySelector(targetId);
                if (target) {
                    const headerHeight = 80;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

/**
 * Animation Controller
 * Manages scroll-based animations, intersection observers, and parallax effects
 * Handles staggered animations for child elements and progress step animations
 */
class AnimationController {
    constructor() {
        this.observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupProgressSteps();
        this.setupParallaxEffects();
    }

    setupScrollAnimations() {
        const observer = new IntersectionObserver(this.handleScrollAnimation.bind(this), this.observerOptions);

        document.querySelectorAll('.animate-on-scroll, .slide-left, .slide-right').forEach(el => {
            observer.observe(el);
        });
    }

    handleScrollAnimation(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                this.animateChildren(entry.target);
            }
        });
    }

    animateChildren(element) {
        const children = element.querySelectorAll('.animate-child');
        children.forEach((child, index) => {
            setTimeout(() => child.classList.add('visible'), index * 100);
        });
    }

    setupProgressSteps() {
        const progressSteps = document.querySelectorAll('.progress-step');
        const progressObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.3 });
        
        progressSteps.forEach(step => progressObserver.observe(step));
    }

    setupParallaxEffects() {
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (!scrollTimeout) {
                scrollTimeout = setTimeout(() => {
                    scrollTimeout = null;
                }, 100);
            }

            const scrolled = window.pageYOffset;
            const orbs = document.querySelectorAll('.orb');
            
            orbs.forEach((orb, index) => {
                const speed = 0.5 + (index * 0.2);
                orb.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }
}

/**
 * Filter Controller
 * Handles case study filtering functionality with smooth animations
 * Manages tab switching and keyboard navigation for accessibility
 */
class FilterController {
    constructor() {
        this.filterTabs = null;
        this.caseStudies = null;
        this.init();
    }

    init() {
        this.filterTabs = document.querySelectorAll('.filter-tab');
        this.caseStudies = document.querySelectorAll('.case-study-card');
        
        if (this.filterTabs.length > 0) {
            this.setupFilterTabs();
            this.setupKeyboardNavigation();
        }
    }

    setupFilterTabs() {
        this.filterTabs.forEach(tab => {
            tab.addEventListener('click', () => this.handleTabClick(tab));
        });
    }

    handleTabClick(clickedTab) {
        // Update active tab
        this.updateActiveTab(clickedTab);
        
        // Filter and animate case studies
        const filter = clickedTab.dataset.filter;
        this.filterCaseStudies(filter);
    }

    updateActiveTab(activeTab) {
        this.filterTabs.forEach(tab => {
            tab.classList.remove('active');
            tab.setAttribute('aria-selected', 'false');
        });
        activeTab.classList.add('active');
        activeTab.setAttribute('aria-selected', 'true');
    }

    filterCaseStudies(filter) {
        this.caseStudies.forEach((study, index) => {
            if (filter === 'all' || study.dataset.category === filter) {
                this.showCaseStudy(study, index);
            } else {
                this.hideCaseStudy(study);
            }
        });
    }

    showCaseStudy(study, index) {
        study.style.display = 'block';
        study.style.animation = 'none';
        setTimeout(() => {
            study.style.animation = `fadeInUp 800ms ${index * 100}ms forwards`;
        }, 10);
    }

    hideCaseStudy(study) {
        study.style.display = 'none';
    }

    setupKeyboardNavigation() {
        this.filterTabs.forEach((tab, index) => {
            tab.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowRight' && index < this.filterTabs.length - 1) {
                    this.filterTabs[index + 1].focus();
                    this.filterTabs[index + 1].click();
                } else if (e.key === 'ArrowLeft' && index > 0) {
                    this.filterTabs[index - 1].focus();
                    this.filterTabs[index - 1].click();
                }
            });
        });
    }
}

/**
 * Form Handler
 * Manages contact form submission with animated feedback
 * Provides visual feedback during form processing and success states
 */
class FormHandler {
    constructor() {
        this.contactForms = document.querySelectorAll('.contact-form');
        this.init();
    }

    init() {
        this.contactForms.forEach(form => {
            this.ensureStatusElement(form, 'form-status');
            form.addEventListener('submit', (e) => this.handleSubmit(e, form));
        });
    }

    ensureStatusElement(form, className) {
        let status = form.querySelector(`.${className}`);
        if (!status) {
            status = document.createElement('p');
            status.className = className;
            status.setAttribute('aria-live', 'polite');
            form.appendChild(status);
        }
        return status;
    }

    setStatus(statusEl, type, message) {
        statusEl.textContent = message;
        statusEl.classList.remove('is-success', 'is-error', 'is-loading');
        if (type) {
            statusEl.classList.add(`is-${type}`);
        }
    }

    setButtonState(button, loadingText, isLoading) {
        if (!button) return;
        if (isLoading) {
            button.dataset.originalText = button.textContent;
            button.innerHTML = `<span class="loading"></span> ${loadingText}`;
            button.disabled = true;
            return;
        }

        button.textContent = button.dataset.originalText || button.textContent;
        button.disabled = false;
    }

    getContactEndpoints(form) {
        const config = getNhdConfig();
        const explicitEndpoint = normalizeEndpoint(form.dataset.endpoint || config.contactEndpoint);
        const apiEndpoint = `${getApiBaseUrl()}/api/contact`;

        return [explicitEndpoint, apiEndpoint].filter((endpoint, idx, arr) => endpoint && arr.indexOf(endpoint) === idx);
    }

    async submitJson(endpoint, payload) {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const message = await getErrorMessage(response, 'We could not send your message right now.');
            throw new Error(message);
        }
    }

    async submitNetlifyForm(form, payload) {
        const data = new URLSearchParams();
        data.append('form-name', form.getAttribute('name') || 'contact');

        Object.entries(payload).forEach(([key, value]) => {
            data.append(key, value || '');
        });

        const response = await fetch('/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data.toString()
        });

        if (!response.ok) {
            throw new Error('Unable to submit your message at this time.');
        }
    }

    /**
     * Handles form submission with animated feedback
     * Provides visual feedback during processing and success states
     * Simulates API call with realistic timing
     */
    async handleSubmit(e, form) {
        e.preventDefault();
        const submitBtn = form.querySelector('button[type="submit"]');
        const statusEl = this.ensureStatusElement(form, 'form-status');
        const formData = new FormData(form);

        const payload = {
            name: (formData.get('name') || '').toString().trim(),
            email: (formData.get('email') || '').toString().trim(),
            company: (formData.get('company') || '').toString().trim(),
            message: (formData.get('message') || '').toString().trim()
        };

        this.setStatus(statusEl, 'loading', 'Sending your message...');
        this.setButtonState(submitBtn, 'Sending...', true);

        try {
            const endpoints = this.getContactEndpoints(form);
            let submitted = false;

            for (const endpoint of endpoints) {
                try {
                    await this.submitJson(endpoint, payload);
                    submitted = true;
                    break;
                } catch (error) {
                    // Try the next endpoint before falling back.
                }
            }

            if (!submitted) {
                await this.submitNetlifyForm(form, payload);
            }

            this.setStatus(statusEl, 'success', 'Thanks. Your request was submitted successfully.');
            form.reset();
            trackEvent('contact_submit_success', { form: form.getAttribute('name') || 'contact' });
        } catch (error) {
            this.setStatus(statusEl, 'error', error.message || 'Unable to submit your request right now.');
            trackEvent('contact_submit_error', { form: form.getAttribute('name') || 'contact' });
        } finally {
            this.setButtonState(submitBtn, 'Sending...', false);
        }
    }
}

/**
 * Lazy Loading Controller
 * Implements image lazy loading for performance optimization
 * Uses Intersection Observer API for efficient loading detection
 */
class LazyLoadingController {
    constructor() {
        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            this.setupImageLazyLoading();
        }
    }

    setupImageLazyLoading() {
        const imageObserver = new IntersectionObserver((entries, observer) => {
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
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all controllers and store references for potential future use
    const cursor = new CustomCursor();
    const particles = new ParticleSystem();
    const navigation = new NavigationController();
    const animations = new AnimationController();
    const filters = new FilterController();
    const forms = new FormHandler();
    const lazyLoading = new LazyLoadingController();

    document.querySelectorAll('.btn.btn-primary').forEach((button) => {
        button.addEventListener('click', () => {
            trackEvent('cta_primary_click', {
                label: button.textContent.trim().slice(0, 80)
            });
        });
    });
    
    // Make controllers available globally for debugging if needed
    if (window.DEBUG) {
        window.nhdControllers = {
            cursor,
            particles,
            navigation,
            animations,
            filters,
            forms,
            lazyLoading
        };
    }
});

// Footer functionality
class FooterController {
    constructor() {
        this.init();
    }

    init() {
        this.updateYear();
        this.setupNewsletterForm();
    }

    updateYear() {
        const yearElement = document.getElementById('currentYear');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }

    setupNewsletterForm() {
        const forms = document.querySelectorAll('.newsletter-form');
        if (!forms.length) return;

        forms.forEach((form) => {
            this.ensureNewsletterStatus(form);
            form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const emailInput = form.querySelector('input[type="email"]');
            const submitButton = form.querySelector('button[type="submit"]');
            const statusEl = form.parentElement.querySelector('.newsletter-status');
            const email = emailInput.value.trim();

            if (!email) return;

            const originalButtonHTML = submitButton.innerHTML;

            submitButton.disabled = true;
            submitButton.innerHTML = '<svg class="spin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" stroke-dasharray="32" stroke-dashoffset="32"><animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite"/></circle></svg>';
            statusEl.textContent = 'Submitting...';
            statusEl.className = 'newsletter-status is-loading';

            try {
                const config = getNhdConfig();
                const explicitEndpoint = normalizeEndpoint(form.dataset.endpoint || config.newsletterEndpoint);
                const apiEndpoint = `${getApiBaseUrl()}/api/newsletter/subscribe`;
                const endpoints = [explicitEndpoint, apiEndpoint].filter((endpoint, idx, arr) => endpoint && arr.indexOf(endpoint) === idx);

                let subscribed = false;
                for (const endpoint of endpoints) {
                    try {
                        await this.submitNewsletterJson(endpoint, { email });
                        subscribed = true;
                        break;
                    } catch (error) {
                        // Try next endpoint.
                    }
                }

                if (!subscribed) {
                    await this.submitNewsletterNetlify(form, email);
                }

                submitButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';
                emailInput.value = '';
                statusEl.textContent = 'Thanks for subscribing.';
                statusEl.className = 'newsletter-status is-success';
                trackEvent('newsletter_subscribe_success');
            } catch (error) {
                submitButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg>';
                statusEl.textContent = error.message || 'Unable to subscribe right now.';
                statusEl.className = 'newsletter-status is-error';
                trackEvent('newsletter_subscribe_error');
            } finally {
                setTimeout(() => {
                    submitButton.disabled = false;
                    submitButton.innerHTML = originalButtonHTML;
                }, 1200);
            }
        });
        });
    }

    ensureNewsletterStatus(form) {
        if (!form.parentElement.querySelector('.newsletter-status')) {
            const status = document.createElement('p');
            status.className = 'newsletter-status';
            status.setAttribute('aria-live', 'polite');
            form.insertAdjacentElement('afterend', status);
        }
    }

    async submitNewsletterJson(endpoint, payload) {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const message = await getErrorMessage(response, 'Unable to subscribe right now.');
            throw new Error(message);
        }
    }

    async submitNewsletterNetlify(form, email) {
        const data = new URLSearchParams();
        data.append('form-name', form.getAttribute('name') || 'newsletter');
        data.append('email', email);

        const response = await fetch('/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: data.toString()
        });

        if (!response.ok) {
            throw new Error('Unable to subscribe right now.');
        }
    }
}

// Initialize footer on page load
document.addEventListener('DOMContentLoaded', () => {
    new FooterController();
});
