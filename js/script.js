const productos = [
  { id: 1, nombre: "Zapatillas", precio: 150 },
  { id: 2, nombre: "Polera", precio: 80 },
  { id: 3, nombre: "Pantalón", precio: 120 },
  { id: 4, nombre: "Gorro", precio: 40 },
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const contenedorProductos = document.getElementById("productos");
const carritoDetalle = document.getElementById("carrito-detalle");
const mensajeUsuario = document.getElementById("mensaje-usuario");

function renderizarProductos() {
  productos.forEach((producto) => {
    const div = document.createElement("div");
    div.className = "producto";

    const nombre = document.createElement("h3");
    nombre.textContent = producto.nombre;

    const precio = document.createElement("p");
    precio.textContent = `Precio: S/ ${producto.precio}`;

    const btnAgregar = document.createElement("button");
    btnAgregar.textContent = "Agregar al carrito";
    btnAgregar.addEventListener("click", () => agregarAlCarrito(producto));

    div.appendChild(nombre);
    div.appendChild(precio);
    div.appendChild(btnAgregar);

    contenedorProductos.appendChild(div);
  });
}

function agregarAlCarrito(producto) {
  carrito.push(producto);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarMensaje(`${producto.nombre} agregado al carrito.`);
}

function mostrarCarrito() {
  limpiarElemento(carritoDetalle);

  if (carrito.length === 0) {
    const vacio = document.createElement("p");
    vacio.textContent = "Tu carrito está vacío.";
    carritoDetalle.appendChild(vacio);
    return;
  }

  let total = 0;

  carrito.forEach((item, index) => {
    const p = document.createElement("p");
    p.textContent = `${index + 1}. ${item.nombre} - S/ ${item.precio}`;
    carritoDetalle.appendChild(p);
    total += item.precio;
  });

  const totalP = document.createElement("p");
  totalP.textContent = `Total: S/ ${total.toFixed(2)}`;
  carritoDetalle.appendChild(totalP);
}

function confirmarCompra() {
  if (carrito.length === 0) {
    mostrarMensaje("El carrito está vacío. Agrega productos primero.");
    return;
  }

  mostrarMensaje("¡Gracias por tu compra!");

  carrito = [];
  localStorage.removeItem("carrito");
  limpiarElemento(carritoDetalle);
}

function limpiarElemento(elemento) {
  while (elemento.firstChild) {
    elemento.removeChild(elemento.firstChild);
  }
}

function mostrarMensaje(texto) {
  mensajeUsuario.textContent = texto;
  setTimeout(() => {
    mensajeUsuario.textContent = "";
  }, 3000);
}

document.getElementById("ver-total").addEventListener("click", mostrarCarrito);
document.getElementById("confirmar-compra").addEventListener("click", confirmarCompra);

renderizarProductos();
