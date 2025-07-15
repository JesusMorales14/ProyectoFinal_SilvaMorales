import { obtener_producto_por_id } from './productos.js';

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

export function agregar_al_carrito(id_producto) {
    const producto = obtener_producto_por_id(id_producto);
    if (!producto) return false;

    const item_existente = carrito.find(item => item.id === id_producto);
    if (item_existente) {
        item_existente.cantidad += 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    guardar_carrito();
    return true;
}

export function eliminar_del_carrito(id_producto) {
    const index = carrito.findIndex(item => item.id === id_producto);
    if (index !== -1) {
        carrito.splice(index, 1);
        guardar_carrito();
        return true;
    }
    return false;
}

export function actualizar_cantidad(id_producto, cambio) {
    const item = carrito.find(item => item.id === id_producto);
    if (!item) return false;

    item.cantidad += cambio;
    if (item.cantidad <= 0) {
        return eliminar_del_carrito(id_producto);
    }

    guardar_carrito();
    return true;
}

export function obtener_carrito() {
    return [...carrito];
}

export function calcular_total() {
    return carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
}

function guardar_carrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

export function vaciar_carrito() {
    carrito.length = 0;
    localStorage.removeItem('carrito');
}

export function inicializar_carrito() {
    const carrito_guardado = localStorage.getItem('carrito');
    if (carrito_guardado) {
        carrito = JSON.parse(carrito_guardado);
    }
    return carrito;
}

