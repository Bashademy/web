document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Toggle icon between bars and X
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Add mobile menu styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .nav-links.active {
                display: flex;
                flex-direction: column;
                position: absolute;
                top: 70px;
                left: 0;
                right: 0;
                background-color: white;
                padding: 20px;
                box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
                z-index: 100;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Chatbot functionality
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');
    
    // Sample responses for the chatbot
    const botResponses = {
        default: "I'm Bashadmey's AI assistant. I can help answer questions about our software solutions, AI integration, and CCTV systems.",
        software: "Our custom software development services include enterprise applications, web platforms, mobile apps, and business intelligence solutions. We use modern technologies and agile methodologies to deliver scalable, secure, and user-friendly software tailored to your specific needs.",
        ai: "We specialize in AI integration across various systems and applications. Our AI solutions include machine learning models, natural language processing, computer vision, predictive analytics, and intelligent automation to enhance your existing systems and processes.",
        cctv: "Our AI-powered CCTV systems go beyond traditional surveillance with intelligent video analytics. Features include facial recognition, object detection, behavior analysis, anomaly detection, and automated alerts. These systems provide enhanced security and valuable business insights.",
        chatbots: "Our intelligent chatbots use natural language processing to provide 24/7 customer support, automate routine tasks, and gather valuable insights. They can be integrated with your website, mobile apps, and messaging platforms.",
        analytics: "Our predictive analytics solutions leverage AI and machine learning to analyze data patterns, forecast trends, and provide actionable insights. This helps you make data-driven decisions and optimize your operations.",
        cloud: "We offer comprehensive cloud solutions including infrastructure setup, migration services, and cloud-native application development. Our expertise spans AWS, Azure, and Google Cloud platforms.",
        pricing: "Our pricing is customized based on your specific project requirements and scope. We offer flexible engagement models including fixed-price projects, time and materials, and dedicated teams. Contact us for a detailed quote.",
        implementation: "Implementation timelines vary based on project complexity. Typically, software development projects range from 3-6 months, AI integration 2-4 months, and CCTV system installations 4-12 weeks. We provide detailed timelines during the consultation phase.",
        contact: "You can reach our team at info@bashadmey.com or call us at +1 (555) 123-4567. Alternatively, you can fill out the contact form on our website, and we'll get back to you within 24 hours.",
        about: "Bashadmey is a technology company specializing in custom software development, AI integration, and advanced CCTV systems. We help businesses enhance their operations, security, and decision-making through innovative technology solutions."
    };
    
    if (chatForm) {
        chatForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const message = userInput.value.trim();
            if (message === '') return;
            
            // Add user message
            addMessage('user', message);
            userInput.value = '';
            
            // Show typing indicator
            showTypingIndicator();
            
            // Generate bot response after a delay
            setTimeout(() => {
                removeTypingIndicator();
                const response = generateResponse(message.toLowerCase());
                addMessage('assistant', response);
                
                // Scroll to bottom
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1000);
        });
    }
    
    function addMessage(role, content) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${role}`;
        
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';
        
        const icon = document.createElement('i');
        icon.className = role === 'user' ? 'fas fa-user' : 'fas fa-robot';
        avatarDiv.appendChild(icon);
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.textContent = content;
        
        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(contentDiv);
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message assistant typing-indicator';
        typingDiv.id = 'typing-indicator';
        
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';
        
        const icon = document.createElement('i');
        icon.className = 'fas fa-robot';
        avatarDiv.appendChild(icon);
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        const dotsDiv = document.createElement('div');
        dotsDiv.className = 'typing-dots';
        dotsDiv.innerHTML = '<span></span><span></span><span></span>';
        
        contentDiv.appendChild(dotsDiv);
        typingDiv.appendChild(avatarDiv);
        typingDiv.appendChild(contentDiv);
        
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Add typing dots animation
        const typingStyle = document.createElement('style');
        typingStyle.textContent = `
            .typing-dots {
                display: flex;
                gap: 4px;
            }
            
            .typing-dots span {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background-color: var(--text-light);
                animation: typing-animation 1.4s infinite ease-in-out;
            }
            
            .typing-dots span:nth-child(1) {
                animation-delay: 0s;
            }
            
            .typing-dots span:nth-child(2) {
                animation-delay: 0.2s;
            }
            
            .typing-dots span:nth-child(3) {
                animation-delay: 0.4s;
            }
            
            @keyframes typing-animation {
                0%, 60%, 100% {
                    transform: translateY(0);
                }
                30% {
                    transform: translateY(-6px);
                }
            }
        `;
        document.head.appendChild(typingStyle);
    }
    
    function removeTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    function generateResponse(query) {
        // Simple keyword matching for demo purposes
        if (query.includes('software') || query.includes('development') || query.includes('application') || query.includes('app')) {
            return botResponses.software;
        } else if (query.includes('ai') || query.includes('artificial intelligence') || query.includes('machine learning') || query.includes('integration')) {
            return botResponses.ai;
        } else if (query.includes('cctv') || query.includes('camera') || query.includes('surveillance') || query.includes('security')) {
            return botResponses.cctv;
        } else if (query.includes('chatbot') || query.includes('chat bot') || query.includes('assistant')) {
            return botResponses.chatbots;
        } else if (query.includes('analytics') || query.includes('data') || query.includes('insights') || query.includes('prediction')) {
            return botResponses.analytics;
        } else if (query.includes('cloud') || query.includes('aws') || query.includes('azure') || query.includes('google cloud'))  || query.includes('aws') || query.includes('azure') || query.includes('google cloud')) {
            return botResponses.cloud;
        } else if (query.includes('price') || query.includes('cost') || query.includes('pricing') || query.includes('quote')) {
            return botResponses.pricing;
        } else if (query.includes('implementation') || query.includes('timeline') || query.includes('deploy') || query.includes('install')) {
            return botResponses.implementation;
        } else if (query.includes('contact') || query.includes('reach') || query.includes('email') || query.includes('phone')) {
            return botResponses.contact;
        } else if (query.includes('about') || query.includes('company') || query.includes('who')) {
            return botResponses.about;
        } else {
            return botResponses.default;
        }
    }
    
    // Testimonial Slider
    const testimonialSlider = document.getElementById('testimonials-slider');
    const testimonials = testimonialSlider ? testimonialSlider.querySelectorAll('.testimonial-card') : [];
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');
    
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.remove('active');
            if (dots[i]) dots[i].classList.remove('active');
        });
        
        testimonials[index].classList.add('active');
        if (dots[index]) dots[index].classList.add('active');
        currentTestimonial = index;
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
            showTestimonial(currentTestimonial);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        });
    }
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showTestimonial(index);
        });
    });
    
    // Auto-rotate testimonials
    setInterval(() => {
        if (testimonials.length > 0) {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }
    }, 5000);
    
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
    
    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;
            
            // In a real implementation, you would send this data to a server
            // For demo purposes, we'll just show an alert
            alert(`Thank you for your message, ${name}! We'll get back to you soon about our ${service.replace('-', ' ')} services.`);
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    const icon = mobileMenuBtn.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });
});

