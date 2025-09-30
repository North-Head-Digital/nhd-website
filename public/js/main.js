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

        if (window.matchMedia('(min-width: 768px)').matches) {
            this.setupEventListeners();
            this.setupInteractiveElements();
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
        this.init();
    }

    init() {
        this.particleCanvas = document.querySelector('.particle-canvas');
        if (this.particleCanvas) {
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
        setInterval(() => this.createParticle(), 500);
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
        this.contactForm = document.querySelector('.contact-form');
        this.init();
    }

    init() {
        if (this.contactForm) {
            this.contactForm.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    /**
     * Handles form submission with animated feedback
     * Provides visual feedback during processing and success states
     * Simulates API call with realistic timing
     */
    handleSubmit(e) {
        e.preventDefault();
        
        // Get submit button and store original state
        const submitBtn = this.contactForm.querySelector('.btn-primary');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.innerHTML = '<span class="loading"></span> Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call with realistic timing (1.5 seconds)
        setTimeout(() => {
            // Show success state
            submitBtn.innerHTML = '✓ Message Sent!';
            submitBtn.style.background = 'linear-gradient(135deg, #10B981 0%, #059669 100%)';
            
            // Reset form after 2 seconds with success animation
            setTimeout(() => {
                this.contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
                
                // Trigger success animation on form
                this.contactForm.style.animation = 'pulse-slow 1s ease';
                setTimeout(() => {
                    this.contactForm.style.animation = '';
                }, 1000);
            }, 2000);
        }, 1500);
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
        const form = document.getElementById('newsletterForm');
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const emailInput = document.getElementById('newsletterEmail');
            const submitButton = form.querySelector('button[type="submit"]');
            const email = emailInput.value.trim();

            if (!email) return;

            // Save original button content
            const originalButtonHTML = submitButton.innerHTML;

            // Show loading state
            submitButton.disabled = true;
            submitButton.innerHTML = '<svg class="spin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none" stroke-dasharray="32" stroke-dashoffset="32"><animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite"/></circle></svg>';

            try {
                // Simulate API call (replace with actual endpoint)
                await new Promise(resolve => setTimeout(resolve, 1500));

                // Success state
                submitButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';
                emailInput.value = '';
                emailInput.placeholder = 'Thanks for subscribing!';

                // Reset after 3 seconds
                setTimeout(() => {
                    submitButton.disabled = false;
                    submitButton.innerHTML = originalButtonHTML;
                    emailInput.placeholder = 'Enter your email';
                }, 3000);

            } catch (error) {
                // Error state
                submitButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg>';

                setTimeout(() => {
                    submitButton.disabled = false;
                    submitButton.innerHTML = originalButtonHTML;
                }, 2000);
            }
        });
    }
}

// Initialize footer on page load
document.addEventListener('DOMContentLoaded', () => {
    new FooterController();
});
