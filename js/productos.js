export let productos = []; // Lista de productos

// Se cargan los productos del archivo JSON
export async function cargar_productos() {
    try {
        const response = await fetch('../productos.json');
        if (!response.ok) throw new Error('Error al cargar productos');
        productos = await response.json();
        return productos;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// Se buscan los productos por nombre o categoría del archivo JSON
export function buscar_productos(termino = '', categoria = '') {
    return productos.filter(producto => {
        const coincide_nombre = producto.nombre.toLowerCase().includes(termino.toLowerCase());
        const coincide_categoria = !categoria || producto.categoria === categoria;
        return coincide_nombre && coincide_categoria;
    });
}

// Se selecciona el producto por su ID
export function obtener_producto_por_id(id) {
    return productos.find(p => p.id === id);
}

// Lista de productos
export function inicializar_productos() {
    return cargar_productos();
}