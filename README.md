"# H&M Perú - Proyecto Final

Este proyecto es una tienda online simulada de H&M Perú, desarrollada como entrega final.

## Tecnologías y Herramientas Utilizadas

- **HTML:** Estructura semántica y accesible para toda la web.
- **CSS:** Estilos personalizados, variables CSS, diseño responsive, branding H&M (fondo blanco, botones rojos, texto negro).
- **JavaScript:**
  - `main.js`: Punto de entrada, inicializa la app.
  - `productos.js`: Carga y búsqueda de productos desde un archivo JSON local.
  - `carrito.js`: Lógica de carrito (agregar, quitar, actualizar, persistir).
  - `ui.js`: Renderizado dinámico, interacción y eventos de usuario.
- **localStorage:** Persistencia del carrito de compras entre sesiones.
- **SweetAlert:** Notificaciones y diálogos modernos para feedback al usuario.
- **Font Awesome:** Iconos.
- **Assets locales:** Imágenes generales.
- **JSON:** Archivo `productos.json` simula la base de datos de productos.

## Flujo y funcionalidades

- **Agregar productos al carrito:**
  Los usuarios pueden añadir cualquier producto al carrito desde la vista principal.

- **Vaciar el carrito:**
  El usuario puede vaciar el carrito completamente usando el botón de pago “Pagar” o eliminando productos uno por uno desde la vista del carrito.

Características
- Filtros por categoría y búsqueda en tiempo real.
- Confirmación y vaciado del carrito por cada compra.