// Global variables
let languagesChart;

// Initialize particles.js when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize particles.js if the element exists
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#4a6bff"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#4a6bff",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // Observe stat cards
    document.querySelectorAll('.stat-card').forEach(card => {
        observer.observe(card);
    });

    // Observe timeline items
    document.querySelectorAll('.timeline-item').forEach(item => {
        observer.observe(item);
    });

    // Observe project cards
    document.querySelectorAll('.project-card').forEach(card => {
        observer.observe(card);
    });

    // Interactive skill tags
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('click', function() {
            this.classList.add('pulse');
            setTimeout(() => {
                this.classList.remove('pulse');
            }, 600);
            const skillName = this.textContent;
            showSkillInfo(skillName);
        });
    });

    // Interactive project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target.tagName === 'A' || e.target.tagName === 'I') return;
            const projectTitle = this.querySelector('h3').textContent;
            showProjectDetails(projectTitle, this);
        });

        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            this.style.transform = `translateY(-15px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
        });
    });

    // Create language chart only if canvas exists
    const languagesCtx = document.getElementById('languagesChart');
    if (languagesCtx) {
        languagesChart = new Chart(languagesCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Python', 'C++', 'JavaScript', 'Java', 'HTML', 'CSS'],
                datasets: [{
                    label: 'Usage Percentage',
                    data: [37.62, 13.01, 12.45, 10.58, 11.58, 6.41],
                    backgroundColor: ['#4a6bff', '#3d4db7', '#ff6b6b', '#4CAF50', '#FFC107', '#9C27B0'],
                    borderColor: ['#4a6bff', '#3d4db7', '#ff6b6b', '#4CAF50', '#FFC107', '#9C27B0'],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: () => getComputedStyle(document.body).getPropertyValue('--border')
                        },
                        ticks: {
                            color: () => getComputedStyle(document.body).getPropertyValue('--text')
                        }
                    },
                    x: {
                        grid: {
                            color: () => getComputedStyle(document.body).getPropertyValue('--border')
                        },
                        ticks: {
                            color: () => getComputedStyle(document.body).getPropertyValue('--text')
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${context.parsed.y}%`;
                            }
                        }
                    }
                }
            }
        });
    }

    // Form validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                validateField(this);
            });
            input.addEventListener('blur', function() {
                validateField(this);
            });
        });

        contactForm.addEventListener('submit', function(e) {
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            let isValid = true;
            if (!name || name.length < 2) {
                showFieldError('name', 'Name must be at least 2 characters');
                isValid = false;
            }
            if (!email || !isValidEmail(email)) {
                showFieldError('email', 'Please enter a valid email address');
                isValid = false;
            }
            if (!subject || subject.length < 5) {
                showFieldError('subject', 'Subject must be at least 5 characters');
                isValid = false;
            }
            if (!message || message.length < 10) {
                showFieldError('message', 'Message must be at least 10 characters');
                isValid = false;
            }

            if (!isValid) {
                e.preventDefault();
            }
        });
    }
});

// Interactive Stats Counter Animation
function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const isDecimal = element.dataset.isDecimal === 'true';
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentValue = progress * (end - start) + start;
        if (isDecimal) {
            element.textContent = currentValue.toFixed(3);
        } else {
            element.textContent = Math.floor(currentValue);
        }
        element.classList.add('counting');
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            element.classList.remove('counting');
        }
    };
    window.requestAnimationFrame(step);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            if (entry.target.classList.contains('stat-card')) {
                const statNumber = entry.target.querySelector('.stat-number');
                if (statNumber && !statNumber.dataset.animated) {
                    const text = statNumber.textContent;
                    // Check if it contains a decimal (either . or ·)
                    if (text.includes('.') || text.includes('·')) {
                        const endValue = parseFloat(text.replace(/[^\d.]/g, ''));
                        statNumber.dataset.animated = 'true';
                        statNumber.dataset.isDecimal = 'true';
                        animateCounter(statNumber, 0, endValue, 2000);
                    } else {
                        const endValue = parseInt(text.replace(/\D/g, '')) || 0;
                        statNumber.dataset.animated = 'true';
                        animateCounter(statNumber, 0, endValue, 2000);
                    }
                }
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, Math.random() * 500);
            }
        }
    });
}, observerOptions);

function showSkillInfo(skillName) {
    const tooltip = document.createElement('div');
    tooltip.className = 'skill-tooltip';
    tooltip.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--card-bg);
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 2000;
        animation: fadeIn 0.3s ease;
        border: 2px solid var(--primary);
        max-width: 300px;
        text-align: center;
    `;

    const skillInfo = {
        'Python': 'Advanced proficiency in Python with experience in data science, automation, and web development.',
        'C++': 'Strong foundation in C++ for competitive programming and system-level development.',
        'JavaScript': 'Modern JavaScript (ES6+) for web development and interactive applications.',
        'HTML/CSS': 'Expert in semantic HTML5 and advanced CSS3 including animations and responsive design.',
        'Git/GitHub': 'Version control expert with collaborative development experience.',
        'Data Science': 'Machine learning, data analysis, and visualization using Python libraries.',
        'AI/ML': 'Artificial Intelligence and Machine Learning algorithms and frameworks.',
        'Web Dev': 'Full-stack web development with modern frameworks and tools.'
    };

    tooltip.innerHTML = `
        <h3>${skillName}</h3>
        <p>${skillInfo[skillName] || 'Proficient in ' + skillName}</p>
        <button onclick="this.parentElement.remove()" style="margin-top: 15px; padding: 8px 16px; background: var(--primary); color: white; border: none; border-radius: 5px; cursor: pointer;">Close</button>
    `;
    
    document.body.appendChild(tooltip);
    setTimeout(() => {
        if (tooltip.parentElement) {
            tooltip.remove();
        }
    }, 5000);
}

function showProjectDetails(projectTitle, cardElement) {
    const projectDetails = {
        'To-Do List Application': {
            description: 'A comprehensive task management system built with Python featuring priority levels, due dates, categories, and data persistence.',
            features: ['Task prioritization', 'Due date tracking', 'Category organization', 'Data persistence', 'User-friendly GUI'],
            technologies: ['Python', 'Tkinter', 'File I/O', 'Data Structures'],
            github: 'https://github.com/Aryan-B-Parikh/Python/blob/main/Projects/To_Do_List_App.py'
        },
        'Hospital Management System': {
            description: 'A complete hospital management solution with patient records, appointment scheduling, and staff management.',
            features: ['Patient record management', 'Appointment scheduling', 'Staff management', 'Medical history tracking', 'Report generation'],
            technologies: ['Python', 'OOP', 'Data Structures', 'File Management'],
            github: 'https://github.com/Aryan-B-Parikh/Python/blob/main/Projects/hospital_management.py'
        },
        'Interactive Quiz Application': {
            description: 'An engaging quiz system with multiple categories, scoring, and performance tracking built in C++.',
            features: ['Multiple quiz categories', 'Real-time scoring', 'Performance analytics', 'Time tracking', 'Result history'],
            technologies: ['C++', 'Arrays', 'Functions', 'File Handling'],
            github: 'https://github.com/Aryan-B-Parikh/Cpp/blob/main/Projects/quiz.cpp'
        }
    };

    const project = projectDetails[projectTitle];
    if (!project) return;

    const modal = document.createElement('div');
    modal.className = 'project-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
        animation: fadeIn 0.3s ease;
    `;
    
    modal.innerHTML = `
        <div style="background: var(--card-bg); padding: 40px; border-radius: 20px; max-width: 600px; max-height: 80vh; overflow-y: auto; position: relative;">
            <button onclick="this.closest('.project-modal').remove()" style="position: absolute; top: 20px; right: 20px; background: none; border: none; font-size: 24px; cursor: pointer; color: var(--text);">×</button>
            <h2 style="color: var(--primary); margin-bottom: 20px;">${projectTitle}</h2>
            <p style="margin-bottom: 20px; color: var(--text-light);">${project.description}</p>
            <h4 style="color: var(--text); margin-bottom: 10px;">Key Features:</h4>
            <ul style="margin-bottom: 20px; color: var(--text-light);">
                ${project.features.map(feature => `<li style="margin-bottom: 8px;">${feature}</li>`).join('')}
            </ul>
            <h4 style="color: var(--text); margin-bottom: 10px;">Technologies Used:</h4>
            <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 20px;">
                ${project.technologies.map(tech => `<span style="background: var(--primary); color: white; padding: 5px 15px; border-radius: 20px; font-size: 0.9rem;">${tech}</span>`).join('')}
            </div>
            <a href="${project.github}" target="_blank" style="display: inline-block; background: var(--gradient); color: white; padding: 12px 30px; border-radius: 25px; text-decoration: none; font-weight: 600;">View Source Code</a>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 5px 20px var(--shadow)';
        } else {
            header.style.boxShadow = '0 2px 10px var(--shadow)';
        }
    }
});

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;

const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark' && document.body) {
    document.body.classList.add('dark-mode');
    if (themeIcon) {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
}

if (themeToggle && themeIcon) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });
}

// Form validation functions
function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    clearFieldError(field.id);

    switch(fieldName) {
        case 'name':
            if (value.length > 0 && value.length < 2) {
                showFieldError(field.id, 'Name must be at least 2 characters');
                return false;
            }
            break;
        case 'email':
        case '_replyto':
            if (value.length > 0 && !isValidEmail(value)) {
                showFieldError(field.id, 'Please enter a valid email address');
                return false;
            }
            break;
        case 'subject':
            if (value.length > 0 && value.length < 5) {
                showFieldError(field.id, 'Subject must be at least 5 characters');
                return false;
            }
            break;
        case 'message':
            if (value.length > 0 && value.length < 10) {
                showFieldError(field.id, 'Message must be at least 10 characters');
                return false;
            }
            break;
    }
    if (value.length > 0) {
        showFieldSuccess(field.id);
    }
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    const formGroup = field.closest('.form-group');
    if (!formGroup) return;
    
    formGroup.classList.remove('success');
    formGroup.classList.add('error');
    
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.cssText = `
        color: #e74c3c;
        font-size: 0.8rem;
        margin-top: 5px;
    `;
    errorDiv.textContent = message;
    formGroup.appendChild(errorDiv);
    
    field.style.borderColor = '#e74c3c';
    field.style.boxShadow = '0 0 0 3px rgba(231, 76, 60, 0.1)';
}

function showFieldSuccess(fieldId) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    const formGroup = field.closest('.form-group');
    if (!formGroup) return;
    
    formGroup.classList.remove('error');
    formGroup.classList.add('success');
    field.style.borderColor = '#27ae60';
    field.style.boxShadow = '0 0 0 3px rgba(39, 174, 96, 0.1)';
}

function clearFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    const formGroup = field.closest('.form-group');
    if (!formGroup) return;
    
    formGroup.classList.remove('error', 'success');
    const errorMessage = formGroup.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
    field.style.borderColor = '';
    field.style.boxShadow = '';
}

// Update chart colors when theme changes
document.body.addEventListener('transitionend', function(e) {
    if (e.propertyName === 'background-color' && languagesChart) {
        setTimeout(() => {
            if (languagesChart) {
                languagesChart.update();
            }
        }, 100);
    }
});
