import { inicializar_productos } from './productos.js';
import { inicializar_carrito } from './carrito.js';
import { inicializar_ui } from './ui.js';

// Se inicia el proyecto
document.addEventListener('DOMContentLoaded', () => {
    try {
        inicializar_productos();
        inicializar_carrito();
        inicializar_ui();
    } catch (error) {
        console.error('Error al inicializar la aplicación:', error);
        Swal.fire('Error', 'No se pudo cargar la aplicación correctamente', 'error');
    }
});