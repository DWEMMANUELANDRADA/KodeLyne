// theme.js - Sistema de tema completo
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.themeIcon = this.themeToggle?.querySelector('i');
        this.html = document.documentElement;
        
        this.init();
    }
    
    init() {
        // Cargar tema guardado o detectar preferencia
        const savedTheme = localStorage.getItem('kodelyne-theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme) {
            this.setTheme(savedTheme);
        } else if (prefersDark) {
            this.setTheme('dark');
        } else {
            this.setTheme('light');
        }
        
        // Event listener para el botón
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
        }
        
        // Escuchar cambios del sistema
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('kodelyne-theme')) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }
    
    setTheme(theme) {
        this.html.setAttribute('data-theme', theme);
        localStorage.setItem('kodelyne-theme', theme);
        this.updateIcon(theme);
        
        // Emitir evento personalizado
        document.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme } }));
    }
    
    toggleTheme() {
        const currentTheme = this.html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Animación del botón
        this.themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            this.themeToggle.style.transform = '';
        }, 400);
        
        this.setTheme(newTheme);
    }
    
    updateIcon(theme) {
        if (!this.themeIcon) return;
        
        if (theme === 'dark') {
            this.themeIcon.className = 'fas fa-sun';
            this.themeIcon.title = 'Cambiar a tema claro';
        } else {
            this.themeIcon.className = 'fas fa-moon';
            this.themeIcon.title = 'Cambiar a tema oscuro';
        }
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
});