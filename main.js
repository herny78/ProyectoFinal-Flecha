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

// Función para iniciar el proceso de compra
const iniciarCompra = () => {
    const nombre = prompt("Bienvenido a la tienda de acuario. ¿Cuál es tu nombre?");
    alert(`Hola ${nombre}, ¡bienvenido a nuestra tienda!`);

    let opcion = "";
    while (opcion !== "4") {
        opcion = prompt("¿Qué te gustaría comprar hoy?\n1. Peces\n2. Plantas\n3. Otros\n4. Salir");

        switch (opcion) {
            case "1":
                comprarProductos("Peces");
                break;
            case "2":
                comprarProductos("Plantas");
                break;
            case "3":
                comprarProductos("Otros");
                break;
            case "4":
                alert("Gracias por visitar nuestra tienda, ¡esperamos verte pronto!");
                break;
            default:
                alert("Por favor, selecciona una opción válida.");
        }
    }
};

// Función para comprar productos según categoría
const comprarProductos = (categoria) => {
    let opcion = "";
    while (opcion !== "4") {
        const productosFiltrados = filtrarProductos(categoria);
        let mensaje = `Selecciona el ${categoria.toLowerCase()} que deseas comprar:\n`;
        productosFiltrados.forEach((producto, index) => {
            mensaje += `${index + 1}. ${producto.nombre} - $${producto.precio}\n`;
        });
        mensaje += "4. Volver al menú principal\n5. Finalizar compra";

        opcion = prompt(mensaje);

        if (opcion >= "1" && opcion <= "3") {
            const productoSeleccionado = productosFiltrados[opcion - 1];
            finalizarCompra(productoSeleccionado);
        } else if (opcion === "4") {
            return; // Volver al menú principal
        } else if (opcion === "5") {
            mostrarCarrito();
            return; // Finalizar la compra
        } else {
            alert("Opción no válida.");
        }
    }
};

// Función para finalizar la compra y confirmar
const finalizarCompra = (producto) => {
    const confirmar = confirm(`Has seleccionado ${producto.nombre}. El precio es $${producto.precio}. ¿Deseas confirmar la compra?`);
    if (confirmar) {
        agregarAlCarrito(producto);
        alert(`El producto ${producto.nombre} ha sido agregado al carrito.`);
    } else {
        alert("Compra cancelada.");
    }
};

// Función para agregar un producto al carrito
const agregarAlCarrito = (producto) => {
    carrito.push(producto);
};

// Función para mostrar el carrito
const mostrarCarrito = () => {
    let mensaje = "Carrito de Compras:\n";
    carrito.forEach((producto) => {
        mensaje += `Producto: ${producto.nombre}, Precio: $${producto.precio}\n`;
    });
    mensaje += `Total: $${calcularTotal()}`;
    alert(mensaje);
};

// Función para calcular el total del carrito
const calcularTotal = () => {
    return carrito.reduce((total, producto) => total + producto.precio, 0);
};

// Función para filtrar productos por categoría
const filtrarProductos = (categoria) => {
    return productos.filter((producto) => producto.categoria === categoria);
};

// Iniciar el proceso de compra
iniciarCompra();
