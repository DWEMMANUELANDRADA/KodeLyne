// proyectos-slider.js
class ProyectosSlider {
    constructor() {
        this.slider = document.getElementById('proyectosSlider');
        this.dotsContainer = document.getElementById('proyectosDots');
        this.proyectos = [
            {
                id: 1,
                icon: 'fas fa-shopping-cart',
                title: 'E-commerce React Avanzado',
                desc: 'Plataforma completa de comercio electrónico con carrito inteligente, sistema de recomendaciones IA y pagos en tiempo real. Más de 10,000 productos gestionados.',
                tech: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redux'],
                tiempo: '3 meses',
                presupuesto: '$25,000',
                cliente: 'Tienda Online España',
                categoria: 'E-commerce'
            },
            {
                id: 2,
                icon: 'fas fa-mobile-alt',
                title: 'App Delivery Food Premium',
                desc: 'Aplicación móvil para pedidos de comida con seguimiento GPS en vivo, recomendaciones personalizadas y sistema de fidelización integrado.',
                tech: ['React Native', 'Firebase', 'Google Maps', 'Python', 'Stripe'],
                tiempo: '4 meses',
                presupuesto: '$35,000',
                cliente: 'Restaurant Chain Argentina',
                categoria: 'Mobile App'
            },
            {
                id: 3,
                icon: 'fas fa-chart-line',
                title: 'Dashboard Analytics Empresarial',
                desc: 'Panel de control para análisis de datos empresariales con visualizaciones interactivas, machine learning para predicciones y reportes automáticos.',
                tech: ['Next.js', 'Python', 'TensorFlow', 'D3.js', 'PostgreSQL'],
                tiempo: '2 meses',
                presupuesto: '$18,000',
                cliente: 'Corporación Financiera USA',
                categoria: 'Business Intelligence'
            },
            {
                id: 4,
                icon: 'fas fa-robot',
                title: 'Chatbot IA para Soporte',
                desc: 'Asistente virtual inteligente que resuelve el 80% de consultas de clientes automáticamente usando procesamiento de lenguaje natural avanzado.',
                tech: ['Python', 'OpenAI API', 'FastAPI', 'PostgreSQL', 'Redis'],
                tiempo: '6 semanas',
                presupuesto: '$12,000',
                cliente: 'Empresa Telecomunicaciones',
                categoria: 'Inteligencia Artificial'
            }
        ];
        
        this.currentSlide = 0;
        this.autoSlideInterval = null;
        
        this.init();
    }
    
    init() {
        if (!this.slider) return;
        
        // Generar slides
        this.proyectos.forEach((proyecto, index) => {
            const slide = document.createElement('div');
            slide.className = 'proyecto-slide';
            slide.innerHTML = this.createProyectoHTML(proyecto);
            this.slider.appendChild(slide);
            
            // Generar dots
            const dot = document.createElement('div');
            dot.className = `slider-dot-proyecto ${index === 0 ? 'active' : ''}`;
            dot.dataset.index = index;
            dot.addEventListener('click', () => this.goToSlide(index));
            this.dotsContainer.appendChild(dot);
        });
        
        // Navegación
        document.querySelectorAll('.slider-nav-proyectos').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const direction = e.target.closest('.slider-nav-proyectos').classList.contains('prev') ? -1 : 1;
                this.navigate(direction);
            });
        });
        
        // Auto slide
        this.startAutoSlide();
        
        // Pausar auto slide en hover
        this.slider.addEventListener('mouseenter', () => {
            this.stopAutoSlide();
        });
        
        this.slider.addEventListener('mouseleave', () => {
            this.startAutoSlide();
        });
    }
    
    createProyectoHTML(proyecto) {
        return `
            <div class="proyecto-card">
                <div class="proyecto-header">
                    <i class="${proyecto.icon} proyecto-icon"></i>
                    <h3>${proyecto.title}</h3>
                    <span class="proyecto-categoria">${proyecto.categoria}</span>
                </div>
                
                <div class="proyecto-content">
                    <p class="proyecto-desc">${proyecto.desc}</p>
                    
                    <div class="proyecto-tech">
                        ${proyecto.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                    
                    <div class="proyecto-stats">
                        <div class="stat-item">
                            <span class="stat-value">${proyecto.tiempo}</span>
                            <span class="stat-label">Duración</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-value">${proyecto.presupuesto}</span>
                            <span class="stat-label">Presupuesto</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-value">${proyecto.tech.length}</span>
                            <span class="stat-label">Tecnologías</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    navigate(direction) {
        const totalSlides = this.proyectos.length;
        this.currentSlide = (this.currentSlide + direction + totalSlides) % totalSlides;
        this.updateSlider();
    }
    
    goToSlide(index) {
        this.currentSlide = index;
        this.updateSlider();
    }
    
    updateSlider() {
        this.slider.style.transform = `translateX(-${this.currentSlide * 100}%)`;
        
        // Actualizar dots
        document.querySelectorAll('.slider-dot-proyecto').forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
    }
    
    startAutoSlide() {
        this.stopAutoSlide();
        this.autoSlideInterval = setInterval(() => {
            this.navigate(1);
        }, 5000);
    }
    
    stopAutoSlide() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
            this.autoSlideInterval = null;
        }
    }
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    new ProyectosSlider();
});