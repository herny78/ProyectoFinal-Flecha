const productos = [
    { nombre: "Pez Goldfish", precio: 50, categoria: "Peces", imagen: "../media/Goldfish.png" },
    { nombre: "Pez Betta", precio: 70, categoria: "Peces", imagen: "../media/Betta.png" },
    { nombre: "Planta Elodea", precio: 30, categoria: "Plantas", imagen: "../media/Elodea.png" },
    { nombre: "Planta Anubias", precio: 45, categoria: "Plantas", imagen: "../media/Anubias.png" },
    { nombre: "Filtro de Agua", precio: 100, categoria: "Otros", imagen: "../media/Filtro.png" },
    { nombre: "Termostato", precio: 80, categoria: "Otros", imagen: "../media/calefactor.png" }
];

// Carrito de compras
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Función para agregar productos al carrito
function agregarAlCarrito(nombre, precio) {
    const producto = carrito.find(item => item.nombre === nombre);
    if (producto) {
        producto.cantidad += 1;
    } else {
        carrito.push({ nombre, precio, cantidad: 1 });
    }
    guardarCarrito();
}

// Función para quitar productos del carrito
function quitarDelCarrito(nombre) {
    const producto = carrito.find(item => item.nombre === nombre);
    if (producto) {
        producto.cantidad -= 1;
        if (producto.cantidad <= 0) {
            carrito = carrito.filter(item => item.nombre !== nombre);
        }
        guardarCarrito();
    }
}

// Función para actualizar el carrito en el DOM
function actualizarCarrito() {
    const carritoElement = document.getElementById("carritoContent");
    carritoElement.innerHTML = "";

    carrito.forEach((producto) => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "item";
        itemDiv.innerHTML = `
            ${producto.nombre} (${producto.cantidad}) - $${producto.precio * producto.cantidad}
            <div>
                <button class="btn btn-success btn-carrito" onclick="agregarAlCarrito('${producto.nombre}', ${producto.precio})">+</button>
                <button class="btn btn-danger btn-carrito" onclick="quitarDelCarrito('${producto.nombre}')">-</button>
            </div>
        `;
        carritoElement.appendChild(itemDiv);
    });

    const total = carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
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

    document.getElementById("carritoCount").textContent = carrito.length;
}

// Función para guardar el carrito en LocalStorage
function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarCarrito();
}

// Función para mostrar u ocultar el carrito
function toggleCarrito() {
    const carritoContainer = document.getElementById("carritoContainer");
    carritoContainer.style.display = carritoContainer.style.display === "none" ? "block" : "none";
}

// Función para enviar mensaje desde el formulario de contacto
function enviarMensaje() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    if (name && email && message) {
        alert("Mensaje enviado. Gracias por contactarnos.");
        document.getElementById("contactForm").reset();
        $('#contactModal').modal('hide');
    } else {
        alert("Por favor, completa todos los campos.");
    }
}

// Función para iniciar la carga de productos
document.addEventListener("DOMContentLoaded", () => {
    cargarProductos();
    actualizarCarrito();
});

// Función para cargar productos dinámicamente en cards usando Bootstrap
function cargarProductos(categoria) {
    const productosContainer = document.getElementById("productosContainer");
    productosContainer.innerHTML = "";

    const productosFiltrados = categoria ? productos.filter(p => p.categoria === categoria) : productos;

    productosFiltrados.forEach((producto) => {
        const card = document.createElement("div");
        card.className = "col-md-4 mb-4";
        card.innerHTML = `
            <div class="card h-100">
                <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">$${producto.precio}</p>
                    <button class="btn btn-primary" onclick="agregarAlCarrito('${producto.nombre}', ${producto.precio})">Añadir al Carrito</button>
                </div>
            </div>
        `;
        productosContainer.appendChild(card);
    });
}

// Función para mostrar productos por categoría
function mostrarCategoria(categoria) {
    cargarProductos(categoria);
}

// Función para realizar la compra
function comprar() {
    if (carrito.length === 0) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "¡El carrito está vacío!",
            footer: '<a href="#">¿Por qué tengo este problema?</a>'
        });
        return;
    }

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
}

// Función para cancelar la compra
function cancelarCompra() {
    carrito = [];
    guardarCarrito();
    toggleCarrito();
}
