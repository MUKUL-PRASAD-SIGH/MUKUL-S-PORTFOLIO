// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', async () => {
    // Add Google Fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Fira+Code:wght@400;500&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Add Font Awesome
    const fontAwesome = document.createElement('link');
    fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
    fontAwesome.rel = 'stylesheet';
    document.head.appendChild(fontAwesome);

    // Neural Network Animation
    const createNeuralNetwork = () => {
        const container = document.querySelector('.neural-network');
        if (!container) return;
        
        // Create nodes
        for (let i = 0; i < 15; i++) {
            const node = document.createElement('div');
            node.className = 'neural-node';
            node.style.left = `${Math.random() * 100}%`;
            node.style.top = `${Math.random() * 100}%`;
            node.style.animationDelay = `${Math.random() * 2}s`;
            container.appendChild(node);
        }
        
        // Create connections
        const nodes = document.querySelectorAll('.neural-node');
        nodes.forEach(node1 => {
            nodes.forEach(node2 => {
                if (Math.random() > 0.7) {
                    const line = document.createElement('div');
                    line.className = 'neural-connection';
                    container.appendChild(line);
                    
                    const updateLine = () => {
                        const rect1 = node1.getBoundingClientRect();
                        const rect2 = node2.getBoundingClientRect();
                        const containerRect = container.getBoundingClientRect();
                        
                        const x1 = rect1.left + rect1.width/2 - containerRect.left + window.scrollX;
                        const y1 = rect1.top + rect1.height/2 - containerRect.top + window.scrollY;
                        const x2 = rect2.left + rect2.width/2 - containerRect.left + window.scrollX;
                        const y2 = rect2.top + rect2.height/2 - containerRect.top + window.scrollY;
                        
                        const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                        const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
                        
                        line.style.width = `${length}px`;
                        line.style.left = `${x1}px`;
                        line.style.top = `${y1}px`;
                        line.style.transform = `rotate(${angle}deg)`;
                        line.style.opacity = 0.1 + Math.random() * 0.2;
                    };
                    
                    window.addEventListener('resize', updateLine);
                    updateLine();
                }
            });
        });
    };
    
    // Typewriter Effect
    const typeWriter = () => {
        const texts = [
            "Hello, I'm Mukul Prasad",
            "AI/ML Engineer & Data Scientist",
            "Building intelligent systems"
        ];
        const element = document.querySelector('.typing');
        if (!element) return;
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100; // milliseconds per character
        let pause = 2000; // pause between texts
        
        function type() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                // Delete character
                element.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                // Type character
                element.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }
            
            if (!isDeleting && charIndex === currentText.length) {
                // Pause at end of text
                typingSpeed = pause;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                // Move to next text
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typingSpeed = 500;
            }
            
            setTimeout(type, typingSpeed);
        }
        
        // Start typing after a short delay
        setTimeout(type, 1000);
        
        // Show the CTA after first text is typed
        setTimeout(() => {
            const aiCta = document.querySelector('.ai-cta');
            const aiElements = document.querySelector('.ai-elements');
            if (aiCta) aiCta.style.opacity = '1';
            if (aiElements) aiElements.style.opacity = '1';
        }, 2000);
    };
    
    // Unlock Portfolio
    const unlockPortfolio = () => {
        const unlockBtn = document.getElementById('unlockBtn');
        const contentWrapper = document.getElementById('contentWrapper');
        const hero = document.querySelector('.hero');
        
        if (!unlockBtn || !contentWrapper || !hero) return;
        
        unlockBtn.addEventListener('click', () => {
            // Add transition class
            hero.classList.add('transitioning');
            
            // Play subtle sound effect (optional)
            const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2087/2087-preview.mp3');
            audio.volume = 0.2;
            audio.play().catch(e => console.log('Audio play failed:', e));
            
            // Animate AI elements
            const aiElements = document.querySelectorAll('.ai-element');
            aiElements.forEach((el, index) => {
                setTimeout(() => {
                    el.style.transform = 'scale(1.2)';
                    el.style.opacity = '0.5';
                }, index * 100);
            });
            
            // Show content with animation
            setTimeout(() => {
                contentWrapper.classList.add('visible');
                
                // Scroll to content
                setTimeout(() => {
                    window.scrollTo({
                        top: contentWrapper.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }, 500);
                
                // Hide hero elements
                const aiTerminal = document.querySelector('.ai-terminal');
                const aiCta = document.querySelector('.ai-cta');
                const aiElements = document.querySelector('.ai-elements');
                
                if (aiTerminal) aiTerminal.style.opacity = '0';
                if (aiCta) aiCta.style.opacity = '0';
                if (aiElements) aiElements.style.opacity = '0';
                
                // Remove hero section from flow after animation
                setTimeout(() => {
                    hero.style.position = 'absolute';
                    hero.style.pointerEvents = 'none';
                    hero.style.opacity = '0.3';
                    
                    // Add particles to content
                    createContentParticles();
                }, 1000);
            }, 800);
        });
    };
    
    // Create particles for content section
    const createContentParticles = () => {
        const contentWrapper = document.querySelector('.content-wrapper');
        if (!contentWrapper) return;
        
        const particles = document.createElement('div');
        particles.className = 'content-particles';
        
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            particle.style.width = `${Math.random() * 6 + 2}px`;
            particle.style.height = particle.style.width;
            particle.style.animationDelay = `${Math.random() * 5}s`;
            particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
            
            particles.appendChild(particle);
        }
        
        contentWrapper.appendChild(particles);
    };
    
    // Initialize tooltips
    const initTooltips = () => {
        const elements = document.querySelectorAll('[data-tooltip]');
        elements.forEach(el => {
            el.addEventListener('mouseenter', (e) => {
                const tooltip = document.createElement('div');
                tooltip.className = 'tooltip';
                tooltip.textContent = e.target.dataset.tooltip;
                document.body.appendChild(tooltip);
                
                const rect = e.target.getBoundingClientRect();
                tooltip.style.top = `${rect.top + window.scrollY - 30}px`;
                tooltip.style.left = `${rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2)}px`;
                
                e.target.addEventListener('mouseleave', () => {
                    document.body.removeChild(tooltip);
                }, { once: true });
            });
        });
    };
    
    // Initialize AOS after a short delay to ensure all elements are loaded
    setTimeout(() => {
        AOS.init({
            duration: 800,
            once: true,
            easing: 'ease-out-quad'
        });
    }, 100);
    
    // Initialize all effects
    createNeuralNetwork();
    typeWriter();
    unlockPortfolio();
    initTooltips();
    
    // Initialize skill animations
    const skillCategories = document.querySelectorAll('.skill-category');
    const progressBars = document.querySelectorAll('.progress');
    
    // Add hover effects to skill items
    document.querySelectorAll('.skill-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateX(5px)';
            item.style.background = 'rgba(0, 255, 0, 0.1)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateX(0)';
            item.style.background = 'rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Add smooth progress bar animations
    progressBars.forEach(bar => {
        const targetWidth = bar.style.width;
        bar.style.width = '0%';
        
        // Create a smooth fill animation
        const fillAnimation = () => {
            let currentWidth = 0;
            const interval = setInterval(() => {
                currentWidth += 1;
                bar.style.width = `${currentWidth}%`;
                
                if (currentWidth >= parseInt(targetWidth)) {
                    clearInterval(interval);
                    // Add a pulse effect when complete
                    bar.style.animation = 'pulse 1s infinite';
                }
            }, 10); // 10ms interval for smooth animation
        };
        
        // Start the animation after a small delay
        setTimeout(fillAnimation, 100);
    });
    
    // Add hover effect to progress bars
    progressBars.forEach(bar => {
        bar.addEventListener('mouseenter', () => {
            bar.style.animation = 'none';
            const pulse = document.createElement('div');
            pulse.className = 'pulse-effect';
            bar.appendChild(pulse);
            
            setTimeout(() => {
                pulse.remove();
            }, 1000);
        });
        
        bar.addEventListener('mouseleave', () => {
            bar.style.animation = 'pulse 1s infinite';
        });
    });
    
    // Add category hover effects
    skillCategories.forEach(category => {
        category.addEventListener('mouseenter', () => {
            const icon = category.querySelector('i');
            icon.style.transform = 'scale(1.2)';
        });
        
        category.addEventListener('mouseleave', () => {
            const icon = category.querySelector('i');
            icon.style.transform = 'scale(1)';
        });
    });
    
    // Initialize 3D lab scene after all resources are loaded
    let cleanupLab = null;
    
    function initLab() {
        console.log('Initializing lab...');
        if (window.THREE) {
            console.log('Three.js is loaded');
            if (window.initLabScene) {
                console.log('initLabScene found, calling...');
                try {
                    cleanupLab = window.initLabScene();
                    console.log('Lab scene initialized successfully');
                } catch (e) {
                    console.error('Error initializing lab scene:', e);
                }
            } else {
                console.error('initLabScene function not found');
            }
        } else {
            console.error('Three.js not loaded');
        }
    }
    
    // Initialize when everything is ready
    if (document.readyState === 'complete') {
        initLab();
    } else {
        window.addEventListener('load', initLab);
    }
    
    // Initialize smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add scroll event for parallax effect
    window.addEventListener('scroll', () => {
        const hero = document.querySelector('.hero');
        if (hero) {
            const scrolled = window.pageYOffset;
            hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
            
            const elements = document.querySelectorAll('.floating-element');
            elements.forEach((element, index) => {
                const speed = 0.1 * (index + 1);
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        }
    });
    
    // Scroll reveal effect
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    if (revealElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1
        });

        revealElements.forEach(el => observer.observe(el));
    }

    // Form submission handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            // Show loading state
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            
            // Simulate form submission
            setTimeout(() => {
                // Reset form
                this.reset();
                submitButton.textContent = 'Message Sent!';
                
                // Reset button after delay
                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                }, 2000);
            }, 1500);
        });
    }

    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('.btn, .skill-card, .project-card, .social-icon');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.transform = 'translateY(-5px)';
            element.style.transition = 'transform 0.3s ease';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translateY(0)';
        });
    });

    // Add scroll indicator animation
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.visibility = 'hidden';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.visibility = 'visible';
            }
        });
    }
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
        
        // Parallax effect for floating elements
        const elements = document.querySelectorAll('.floating-element');
        elements.forEach((element, index) => {
            const speed = 0.1 * (index + 1);
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }
});
// Add parallax effect to project section
window.addEventListener('scroll', () => {
    const projects = document.querySelectorAll('.project');
    if (projects) {
        const scrolled = window.pageYOffset;
        projects.forEach((project, index) => {
            const speed = 0.1 * (index + 1);
            project.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }
});
            