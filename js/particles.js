class ParticleSystem {
    constructor() {
        this.init();
    }
    
    init() {
        // Código del sistema de partículas
        console.log('Sistema de partículas iniciado');
    }
}

// Exportar para uso en otros archivos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ParticleSystem };
}