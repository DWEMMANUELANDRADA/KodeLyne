// ==========================================
// PARTICLE SYSTEM
// ==========================================
// JavaScript básico para verificar que funciona
console.log('✅ script.js cargado correctamente');

// Theme toggle básico
const themeToggle = document.querySelector('#themeToggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const html = document.documentElement;
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', newTheme);
        console.log('🎨 Tema cambiado a:', newTheme);
    });
}

// Menú hamburguesa básico
const hamburger = document.querySelector('#hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

// Scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 0;
        `;
        
        document.querySelector('.particles-container').appendChild(this.canvas);
        this.init();
        this.animate();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        
        // Crear partículas
        for (let i = 0; i < 100; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 3 + 1,
                speedX: Math.random() * 1 - 0.5,
                speedY: Math.random() * 1 - 0.5,
                color: Math.random() > 0.5 ? '#6366f1' : '#ec4899',
                alpha: Math.random() * 0.5 + 0.1
            });
        }
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.y > this.canvas.height) particle.y = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.globalAlpha = particle.alpha;
            this.ctx.fill();
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// ==========================================
// CURSOR PERSONALIZADO
// ==========================================
class CustomCursor {
    constructor() {
        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';
        this.dot = document.createElement('div');
        this.dot.className = 'cursor-dot';
        
        document.body.appendChild(this.cursor);
        document.body.appendChild(this.dot);
        
        this.x = 0;
        this.y = 0;
        this.dotX = 0;
        this.dotY = 0;
        
        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            this.x = e.clientX;
            this.y = e.clientY;
        });

        this.animate();
    }

    animate() {
        this.dotX += (this.x - this.dotX) * 0.2;
        this.dotY += (this.y - this.dotY) * 0.2;
        
        this.cursor.style.transform = `translate(${this.x - 10}px, ${this.y - 10}px)`;
        this.dot.style.transform = `translate(${this.dotX - 2}px, ${this.dotY - 2}px)`;
        
        requestAnimationFrame(() => this.animate());
    }
}

// ==========================================
// SCROLL ANIMATIONS CON INTERSECTION OBSERVER
// ==========================================
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Animaciones específicas por tipo
                    if (entry.target.classList.contains('stat-number')) {
                        this.animateCounter(entry.target);
                    }
                    
                    if (entry.target.classList.contains('skill-progress')) {
                        this.animateProgressBar(entry.target);
                    }
                }
            });
        }, this.observerOptions);

        // Observar todos los elementos animables
        document.querySelectorAll('.scroll-animate, .stat-number, .skill-progress').forEach(el => {
            observer.observe(el);
        });
    }

    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        if (!target) return;

        let count = 0;
        const increment = target / 100;
        const interval = setInterval(() => {
            count += increment;
            if (count >= target) {
                count = target;
                clearInterval(interval);
            }
            element.textContent = Math.floor(count) + (target > 100 ? '+' : '%');
        }, 20);
    }

    animateProgressBar(element) {
        const width = element.getAttribute('data-width') || '100%';
        element.style.width = width;
    }
}

// ==========================================
// TYPEWRITER EFFECT
// ==========================================
class Typewriter {
    constructor(element, texts, speed = 100) {
        this.element = element;
        this.texts = texts;
        this.speed = speed;
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        
        this.type();
    }

    type() {
        const currentText = this.texts[this.textIndex];
        
        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.element.textContent = currentText.substring(0, this.charIndex + 1);
            this.charIndex++;
        }

        if (!this.isDeleting && this.charIndex === currentText.length) {
            setTimeout(() => this.isDeleting = true, 2000);
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.textIndex = (this.textIndex + 1) % this.texts.length;
        }

        setTimeout(() => this.type(), this.isDeleting ? this.speed / 2 : this.speed);
    }
}

// ==========================================
// FORM ANIMATIONS
// ==========================================
class FormAnimations {
    constructor() {
        this.init();
    }

    init() {
        const inputs = document.querySelectorAll('.input-field');
        
        inputs.forEach(input => {
            // Efecto de focus
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });

            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });

            // Validación en tiempo real
            input.addEventListener('input', () => {
                this.validateInput(input);
            });
        });
    }

    validateInput(input) {
        const type = input.type;
        const value = input.value.trim();
        
        if (type === 'email') {
            const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            input.style.borderColor = isValid ? '#10b981' : '#ef4444';
        }
        
        if (type === 'tel') {
            const isValid = /^[\+]?[0-9\s\-\(\)]+$/.test(value);
            input.style.borderColor = isValid ? '#10b981' : '#ef4444';
        }
    }
}

// ==========================================
// GLITCH EFFECT
// ==========================================
class GlitchEffect {
    constructor(element) {
        this.element = element;
        this.originalText = element.textContent;
        this.init();
    }

    init() {
        this.element.addEventListener('mouseenter', () => {
            this.startGlitch();
        });

        this.element.addEventListener('mouseleave', () => {
            this.stopGlitch();
            this.element.textContent = this.originalText;
        });
    }

    startGlitch() {
        const chars = '!<>-_\\/[]{}—=+*^?#________';
        let interval;
        let iterations = 0;

        const glitch = () => {
            let newText = '';
            
            for (let i = 0; i < this.originalText.length; i++) {
                if (i < iterations) {
                    newText += this.originalText[i];
                } else {
                    newText += chars[Math.floor(Math.random() * chars.length)];
                }
            }

            this.element.textContent = newText;

            if (iterations >= this.originalText.length) {
                clearInterval(interval);
            }

            iterations += 1 / 3;
        };

        interval = setInterval(glitch, 30);
        this.stopGlitch = () => clearInterval(interval);
    }
}

// ==========================================
// INITIALIZE EVERYTHING
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Sistema de partículas
    new ParticleSystem();

    // Cursor personalizado
    if (window.innerWidth > 768) {
        new CustomCursor();
    }

    // Animaciones de scroll
    new ScrollAnimations();

    // Formularios animados
    new FormAnimations();

    // Efecto typewriter en el hero
    const heroTitle = document.querySelector('.gradient-text');
    if (heroTitle) {
        new Typewriter(heroTitle, [
            'DIGITAL',
            'TECNOLÓGICA',
            'INNOVADORA',
            'INTELIGENTE'
        ]);
    }

    // Efecto glitch en el logo
    const logo = document.querySelector('.logo span');
    if (logo) {
        new GlitchEffect(logo);
    }

    // Contadores animados
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = counter.getAttribute('data-count');
        if (target) {
            counter.textContent = '0' + (target > 100 ? '+' : '%');
        }
    });

    // Audio effects
    const buttons = document.querySelectorAll('button, .servicio-card');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            this.playSound('click');
        });
    });
});

// ==========================================
// SOUND SYSTEM
// ==========================================
const SoundSystem = {
    init() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    },

    playSound(type) {
        if (!this.audioContext) this.init();

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.type = 'sine';
        oscillator.frequency.value = type === 'click' ? 800 : 400;
        
        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);

        oscillator.start();
        oscillator.stop(this.audioContext.currentTime + 0.1);
    }
};
// Para más proyectos, puedes usar datos reales de APIs:
const githubProjects = [
    {
        name: "E-commerce MERN",
        url: "https://github.com/tu-usuario/ecommerce-mern",
        description: "Tienda online completa",
        languages: ["JavaScript", "React", "Node.js", "MongoDB"]
    },
    {
        name: "App de Tareas IA",
        url: "https://github.com/tu-usuario/todo-ai",
        description: "Gestor de tareas con inteligencia artificial",
        languages: ["Python", "FastAPI", "React", "PostgreSQL"]
    }
];
// marcas-tabs.js
class MarcasTabs {
    constructor() {
        this.tabButtons = document.querySelectorAll('.marcas-tabs .tab-btn');
        this.marcasGrids = document.querySelectorAll('.marcas-grid');
        
        this.init();
    }
    
    init() {
        if (this.tabButtons.length === 0) return;
        
        // Agregar event listeners
        this.tabButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const country = e.currentTarget.dataset.country;
                this.switchTab(country);
                
                // Animación del botón
                e.currentTarget.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    e.currentTarget.style.transform = '';
                }, 150);
            });
        });
        
        // Activar primera pestaña por defecto
        if (this.tabButtons[0]) {
            this.switchTab(this.tabButtons[0].dataset.country);
        }
    }
    
    switchTab(country) {
        // Actualizar botones
        this.tabButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.country === country);
        });
        
        // Actualizar contenido
        this.marcasGrids.forEach(grid => {
            grid.classList.toggle('active', grid.id === country);
        });
        
        // Animación
        const activeGrid = document.getElementById(country);
        if (activeGrid) {
            activeGrid.style.opacity = '0';
            activeGrid.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                activeGrid.style.opacity = '1';
                activeGrid.style.transform = 'translateY(0)';
            }, 10);
        }
    }
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    new MarcasTabs();
});
// Inicializar sistema de sonido
SoundSystem.init();