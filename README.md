"# H&M Perú - Proyecto Final

Este proyecto es una tienda online simulada para H&M Perú, desarrollada como entrega final.

## Tecnologías y Herramientas Utilizadas

- **HTML5:** Estructura semántica y accesible para toda la web.
- **CSS3:** Estilos personalizados, variables CSS, diseño responsive, branding H&M (fondo blanco, botones rojos, texto negro).
- **JavaScript Modular (ES Modules):**
  - `main.js`: Punto de entrada, inicializa la app.
  - `productos.js`: Carga y búsqueda de productos desde un archivo JSON local.
  - `carrito.js`: Lógica de carrito (agregar, quitar, actualizar, persistir).
  - `ui.js`: Renderizado dinámico, interacción y eventos de usuario.
- **localStorage:** Persistencia del carrito de compras entre sesiones.
- **SweetAlert2:** Notificaciones y diálogos modernos para feedback al usuario.
- **Font Awesome:** Iconos vectoriales (ej: carrito de compras).
- **Assets locales:** Imágenes de productos y logo de la marca en la carpeta `/assets`.
- **JSON local:** Archivo `productos.json` simula una base de datos de productos.

## Estructura de Carpetas

```
/ (raíz)
├── assets/            # Imágenes del logo y productos
├── css/
│   └── styles.css     # Estilos principales
├── js/
│   ├── main.js
│   ├── productos.js
│   ├── carrito.js
│   └── ui.js
├── productos.json     # Datos de productos
├── index.html         # Página principal
└── README.md
```

## Características Principales
- Filtros por categoría y búsqueda en tiempo real.
- Carrito de compras persistente y animado.
- Confirmación y vaciado del carrito tras la compra.
- Diseño adaptado a dispositivos móviles.