// Cargar productos desde el archivo JSON
let productos = [];

// Carrito de compras
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Función para cargar productos desde el archivo JSON
const fetchProductos = async () => {
    try {
        const response = await fetch('../JSON/productos.json');
        const data = await response.json();
        productos = data.productos || [];
        cargarProductos();
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
};

// Función para agregar productos al carrito
const agregarAlCarrito = (nombre, precio) => {
    const producto = carrito.find(item => item.nombre === nombre);
    producto ? incrementarCantidad(producto) : agregarNuevoProducto(nombre, precio);
    guardarCarrito();
};

const incrementarCantidad = (producto) => {
    producto.cantidad += 1;
};

const agregarNuevoProducto = (nombre, precio) => {
    carrito.push({ nombre, precio, cantidad: 1 });
};

// Función para quitar productos del carrito
const quitarDelCarrito = (nombre) => {
    const index = carrito.findIndex(item => item.nombre === nombre);
    if (index !== -1) {
        carrito[index].cantidad > 1 ? decrementarCantidad(index) : eliminarProducto(index);
        guardarCarrito();
    }
};

const decrementarCantidad = (index) => {
    carrito[index].cantidad--;
};

const eliminarProducto = (index) => {
    carrito.splice(index, 1);
};

// Función para actualizar el carrito en el DOM
const actualizarCarrito = () => {
    const carritoElement = document.getElementById("carritoContent");
    if (!carritoElement) return;

    carritoElement.innerHTML = "";

    carrito.forEach(({ nombre, cantidad, precio }) => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "item";
        itemDiv.innerHTML = `
            ${nombre} (${cantidad}) - $${precio * cantidad}
            <div>
                <button class="btn btn-success btn-carrito" onclick="agregarAlCarrito('${nombre}', ${precio})">+</button>
                <button class="btn btn-danger btn-carrito" onclick="quitarDelCarrito('${nombre}')">-</button>
            </div>
        `;
        carritoElement.appendChild(itemDiv);
    });

    const total = carrito.reduce((total, { precio, cantidad }) => total + precio * cantidad, 0);
    const totalDiv = document.createElement("div");
    totalDiv.className = "d-flex justify-content-between align-items-center mt-2";
    totalDiv.innerHTML = `<strong>Total:</strong> $${total}`;
    carritoElement.appendChild(totalDiv);

    const botonDiv = document.createElement("div");
    botonDiv.className = "d-flex justify-content-between mt-2";
    botonDiv.innerHTML = `
        <button class="btn btn-primary" onclick="comprar()">Comprar</button>
        <button class="btn btn-secondary" onclick="cancelarCompra()">Cancelar</button>
    `;
    carritoElement.appendChild(botonDiv);

    const carritoCount = document.getElementById("carritoCount");
    if (carritoCount) carritoCount.textContent = carrito.length;
};

// Función para guardar el carrito en LocalStorage
const guardarCarrito = () => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
};

// Función para mostrar u ocultar el carrito
const toggleCarrito = () => {
    const carritoContainer = document.getElementById("carritoContainer");
    if (carritoContainer) {
        carritoContainer.style.display = carritoContainer.style.display === "none" ? "block" : "none";
    }
};

// Funciones auxiliares para enviarMensaje
const mostrarMensajeExito = () => {
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Muchas gracias por contactarnos",
        showConfirmButton: false,
        timer: 1500
    });
    document.getElementById("contactForm")?.reset();
    $('#contactModal').modal('hide');
};

const mostrarMensajeError = () => {
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "complete los campos",
    });
};

// Función para enviar mensaje desde el formulario de contacto
const enviarMensaje = () => {
    const name = document.getElementById("name")?.value;
    const email = document.getElementById("email")?.value;
    const message = document.getElementById("message")?.value;

    name && email && message ? mostrarMensajeExito() : mostrarMensajeError();
};

// Función para iniciar la carga de productos
document.addEventListener("DOMContentLoaded", () => {
    fetchProductos();
    actualizarCarrito();
});

// Función para cargar productos dinámicamente en cards usando Bootstrap
const cargarProductos = (categoria) => {
    const productosContainer = document.getElementById("productosContainer");
    if (!productosContainer) return;

    productosContainer.innerHTML = "";

    const productosFiltrados = categoria ? productos.filter(p => p.categoria === categoria) : productos;

    productosFiltrados.forEach(({ imagen, nombre, precio }) => {
        const card = document.createElement("div");
        card.className = "col-md-4 mb-4";
        card.innerHTML = `
            <div class="card h-100">
                <img src="${imagen}" class="card-img-top" alt="${nombre}" title="${nombre}">
                <div class="card-body">
                    <h5 class="card-title">${nombre}</h5>
                    <p class="card-text">$${precio}</p>
                    <button class="btn btn-primary" onclick="agregarAlCarrito('${nombre}', ${precio})">Añadir al Carrito</button>
                </div>
            </div>
        `;
        productosContainer.appendChild(card);
    });
};

// Función para mostrar productos por categoría
const mostrarCategoria = (categoria) => cargarProductos(categoria);

// Funciones auxiliares para comprar
const mostrarCarritoVacio = () => {
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "¡El carrito está vacío!",
        footer: '<a href="#">¿Por qué tengo este problema?</a>'
    });
};

const realizarCompra = () => {
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Compra realizada con éxito!",
        showConfirmButton: false,
        timer: 2500
    });
    carrito = [];
    guardarCarrito();
    toggleCarrito();
};

// Función para realizar la compra
const comprar = () => { carrito.length === 0 ? mostrarCarritoVacio() : realizarCompra(); };

// Función para cancelar la compra
const cancelarCompra = () => {
    carrito = [];
    guardarCarrito();
    toggleCarrito();
};
