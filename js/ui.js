import { buscar_productos, cargar_productos } from './productos.js';
import { agregar_al_carrito, obtener_carrito, actualizar_cantidad, eliminar_del_carrito, calcular_total, vaciar_carrito } from './carrito.js';

let productos = []; // Lista de productos

// Se inician los eventos
export function inicializar_ui() {
    cargar_productos().then(prods => {
        productos = prods;
        mostrar_productos(productos);
    });

    document.getElementById('search').addEventListener('input', filtrar_productos);
    document.getElementById('category_filter').addEventListener('change', filtrar_productos);
    document.getElementById('view_cart').addEventListener('click', toggle_carrito);
    document.getElementById('close_cart').addEventListener('click', toggle_carrito);
    document.getElementById('checkout_btn').addEventListener('click', finalizar_compra);
}

// Se muestran los productos
function mostrar_productos(productos_mostrar) {
    const contenedor = document.getElementById('productos');
    if (productos_mostrar.length === 0) {
        contenedor.innerHTML = '<div class="no-results">No se encontraron productos</div>';
        return;
    }

    contenedor.innerHTML = productos_mostrar.map(producto => `
        <div class="producto" data-id="${producto.id}">
            <img src="${producto.imagen}" alt="${producto.nombre}" class="producto_imagen">
            <div class="producto_info">
                <span class="producto_categoria">${producto.categoria}</span>
                <h3 class="producto_titulo">${producto.nombre}</h3>
                <p class="producto_descripcion">${producto.descripcion}</p>
                <div class="producto_precio">S/ ${producto.precio.toFixed(2)}</div>
                <button class="agregar_carrito" data-id="${producto.id}">
                    Añadir al carrito
                </button>
            </div>
        </div>
    `).join('');

    document.querySelectorAll('.agregar_carrito').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.currentTarget.getAttribute('data-id'));
            if (agregar_al_carrito(id)) {
                actualizar_contador_carrito();
                mostrar_notificacion('Producto agregado al carrito', 'success');
            }
        });
    });
}

// Se filtran los productos según búsqueda y categoría
function filtrar_productos() {
    const termino = document.getElementById('search').value;
    const categoria = document.getElementById('category_filter').value;
    const productos_filtrados = buscar_productos(termino, categoria);
    mostrar_productos(productos_filtrados);
}

// Se actualiza el contador de productos en el carrito
function actualizar_contador_carrito() {
    const carrito = obtener_carrito();
    const total_items = carrito.reduce((total, item) => total + item.cantidad, 0);
    document.getElementById('cart_count').textContent = total_items;
}

// Se abre o cierra el carrito
function toggle_carrito() {
    const sidebar = document.getElementById('cart_sidebar');
    const overlay = document.getElementById('overlay');
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');

    if (sidebar.classList.contains('active')) {
        renderizar_carrito();
    }
}

// Se visualizan los productos en el carrito
function renderizar_carrito() {
    const carrito = obtener_carrito();
    const contenedor = document.getElementById('cart_items');
    const total_element = document.getElementById('cart_total_amount');

    if (carrito.length === 0) {
        contenedor.innerHTML = '<div class="empty-cart">Tu carrito está vacío</div>';
        total_element.textContent = '0.00';
        return;
    }

    contenedor.innerHTML = carrito.map(item => `
        <div class="cart_item" data-id="${item.id}">
            <img src="${item.imagen}" alt="${item.nombre}" class="cart_item_img">
            <div class="cart_item_details">
                <h4 class="cart_item_title">${item.nombre}</h4>
                <span class="cart_item_price">S/ ${item.precio.toFixed(2)}</span>
                <div class="cart_item_quantity">
                    <button class="quantity_btn decrease_quantity" data-id="${item.id}">-</button>
                    <span>${item.cantidad}</span>
                    <button class="quantity_btn increase_quantity" data-id="${item.id}">+</button>
                </div>
            </div>
            <button class="remove_item" data-id="${item.id}">&times;</button>
        </div>
    `).join('');

    total_element.textContent = calcular_total().toFixed(2);

    document.querySelectorAll('.decrease_quantity').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            actualizar_cantidad(id, -1);
            renderizar_carrito();
            actualizar_contador_carrito();
        });
    });

    document.querySelectorAll('.increase_quantity').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            actualizar_cantidad(id, 1);
            renderizar_carrito();
            actualizar_contador_carrito();
        });
    });

    document.querySelectorAll('.remove_item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            eliminar_del_carrito(id);
            renderizar_carrito();
            actualizar_contador_carrito();
            mostrar_notificacion('Producto eliminado del carrito', 'info');
        });
    });
}

// Se finaliza la compra
function finalizar_compra() {
    const carrito = obtener_carrito();
    if (carrito.length === 0) {
        mostrar_notificacion('Tu carrito está vacío', 'warning');
        return;
    }

    Swal.fire({
        title: 'Datos personales',
        html:
            `<input id="swal_nombre" class="swal2-input" placeholder="Nombre">
             <input id="swal_email" class="swal2-input" placeholder="Email">
             <input id="swal_direccion" class="swal2-input" placeholder="Dirección">`,
        focusConfirm: false,
        preConfirm: () => {
            return {
                nombre: document.getElementById('swal_nombre').value,
                email: document.getElementById('swal_email').value,
                direccion: document.getElementById('swal_direccion').value
            };
        },
        showCancelButton: true,
        confirmButtonText: 'Continuar con el pago',
        cancelButtonText: 'Cancelar'
    }).then((formResult) => {
        if (formResult.isConfirmed) {
            // Método de pago
            Swal.fire({
                title: 'Modo de pago',
                html:
                    `<select id="swal_pago" class="swal2-input" style="width:90%;margin-bottom:10px;">
                        <option value="tarjeta">Tarjeta de crédito</option>
                        <option value="paypal">PayPal</option>
                        <option value="efectivo">Efectivo</option>
                    </select>
                    <div id="pago_campos"></div>`,
                focusConfirm: false,
                showCancelButton: true,
                confirmButtonText: 'Continuar',
                cancelButtonText: 'Cancelar',
                didOpen: () => {
                    const select = document.getElementById('swal_pago');
                    const camposDiv = document.getElementById('pago_campos');
                    function renderCampos() {
                        if (select.value === 'tarjeta') {
                            camposDiv.innerHTML = `
                                <input class='swal2-input' placeholder='Número de tarjeta'>
                                <input class='swal2-input' placeholder='Fecha de vencimiento'>
                                <input class='swal2-input' placeholder='CVV'>`;
                        } else if (select.value === 'paypal') {
                            camposDiv.innerHTML = `<input class='swal2-input' placeholder='Email de PayPal'>`;
                        } else {
                            camposDiv.innerHTML = `<div style='text-align:center;color:#888;'>Pagarás en tienda al recoger tu pedido.</div>`;
                        }
                    }
                    select.addEventListener('change', renderCampos);
                    renderCampos();
                },
                preConfirm: () => {
                    return {
                        metodo: document.getElementById('swal_pago').value
                    };
                }
            }).then((pagoResult) => {
                if (pagoResult.isConfirmed) {
                    Swal.fire({
                        title: '¿Confirmar compra?',
                        text: `Total: S/ ${calcular_total().toFixed(2)}`,
                        icon: 'question',
                        showCancelButton: true,
                        confirmButtonColor: '#f15b6c',
                        cancelButtonColor: '#6c757d',
                        confirmButtonText: 'Sí, pagar',
                        cancelButtonText: 'Seguir comprando'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            vaciar_carrito();
                            renderizar_carrito();
                            actualizar_contador_carrito();
                            toggle_carrito();
                            Swal.fire(
                                '¡Compra realizada!',
                                'Gracias por tu compra. Te enviaremos un correo con los detalles.',
                                'success'
                            );
                        }
                    });
                }
            });
        }
    });
}


// Se usa notificaciones al momento de agregar o eliminar productos del carrito
function mostrar_notificacion(mensaje, tipo = 'info') {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
    });

    Toast.fire({
        icon: tipo,
        title: mensaje
    });
}