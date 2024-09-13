// Inicialización de productos
const productos = [
    { nombre: "Pez Goldfish", precio: 50, categoria: "Peces" },
    { nombre: "Pez Betta", precio: 70, categoria: "Peces" },
    { nombre: "Pez Guppy", precio: 40, categoria: "Peces" },
    { nombre: "Planta Elodea", precio: 30, categoria: "Plantas" },
    { nombre: "Planta Anubias", precio: 45, categoria: "Plantas" },
    { nombre: "Planta Musgo de Java", precio: 25, categoria: "Plantas" },
    { nombre: "Filtro de Agua", precio: 100, categoria: "Otros" },
    { nombre: "Termostato", precio: 80, categoria: "Otros" },
    { nombre: "Kit de Limpieza", precio: 60, categoria: "Otros" }
];

// Carrito de compras
let carrito = [];

// Función para mostrar productos de una categoría
const mostrarCategoria = (categoria) => {
    const productosFiltrados = filtrarProductos(categoria);
    const productosDiv = document.getElementById('products');
    productosDiv.innerHTML = '';

    productosFiltrados.forEach((producto, index) => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('product-item');
        productoDiv.innerHTML = `
            ${index + 1}. ${producto.nombre} - $${producto.precio}
            <button class="button button-primary" data-index="${index}" data-categoria="${categoria}">Agregar al carrito</button>
        `;
        productosDiv.appendChild(productoDiv);
    });

    // Asignar eventos a los botones de agregar al carrito
    document.querySelectorAll('.product-item button').forEach(button => {
        button.addEventListener('click', (event) => {
            const index = event.target.getAttribute('data-index');
            const categoria = event.target.getAttribute('data-categoria');
            agregarAlCarrito(index, categoria);
        });
    });
};

// Función para agregar un producto al carrito
const agregarAlCarrito = (index, categoria) => {
    const producto = filtrarProductos(categoria)[index];
    carrito.push(producto);
    mostrarCarrito();
};

// Función para mostrar el carrito
const mostrarCarrito = () => {
    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = '';

    carrito.forEach((producto) => {
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `
            Producto: ${producto.nombre}, Precio: $${producto.precio}
        `;
        cartItemsDiv.appendChild(itemDiv);
    });

    const totalDiv = document.createElement('div');
    totalDiv.innerHTML = `Total: $${calcularTotal()}`;
    cartItemsDiv.appendChild(totalDiv);
};

// Función para finalizar la compra
const finalizarCompra = () => {
    if (carrito.length > 0) {
        alert('Gracias por tu compra! Has finalizado la compra.');
        carrito = [];
        mostrarCarrito();
    } else {
        alert('El carrito está vacío.');
    }
};

// Función para calcular el total del carrito
const calcularTotal = () => {
    return carrito.reduce((total, producto) => total + producto.precio, 0);
};

// Función para filtrar productos por categoría
const filtrarProductos = (categoria) => {
    return productos.filter((producto) => producto.categoria === categoria);
};

// Inicialmente, mostramos la categoría "Peces"
mostrarCategoria('Peces');

// Asignar evento al botón de finalizar compra
document.getElementById('btnFinalizarCompra').addEventListener('click', finalizarCompra);

// Asignar eventos a los botones de categoría
document.getElementById('btnPeces').addEventListener('click', () => mostrarCategoria('Peces'));
document.getElementById('btnPlantas').addEventListener('click', () => mostrarCategoria('Plantas'));
document.getElementById('btnOtros').addEventListener('click', () => mostrarCategoria('Otros'));
