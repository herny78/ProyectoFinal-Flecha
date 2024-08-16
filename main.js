// Función principal para iniciar la interacción con el usuario
function iniciarCompra() {
    let nombre = prompt("Bienvenido a la tienda de acuario. ¿Cuál es tu nombre?");
    alert("Hola " + nombre + ", ¡bienvenido a nuestra tienda!");

    let opcion = "";
    while (opcion !== "4") {
        opcion = prompt("¿Qué te gustaría comprar hoy?\n1. Peces\n2. Plantas\n3. Otros\n4. Salir");
        
        if (opcion === "1") {
            comprarPeces();
        } else if (opcion === "2") {
            comprarPlantas();
        } else if (opcion === "3") {
            comprarOtros();
        } else if (opcion !== "4") {
            alert("Por favor, selecciona una opción válida.");
        }
    }

    alert("Gracias por visitar nuestra tienda, ¡esperamos verte pronto!");
}

// Función para la opción de compra de peces
function comprarPeces() {
    let opcionPez = "";
    while (opcionPez !== "4") {
        opcionPez = prompt("Selecciona el pez que deseas comprar:\n1. Pez Goldfish - $50\n2. Pez Betta - $70\n3. Pez Guppy - $40\n4. Volver al menú principal");
        
        if (opcionPez === "1") {
            finalizarCompra("Pez Goldfish", 50);
        } else if (opcionPez === "2") {
            finalizarCompra("Pez Betta", 70);
        } else if (opcionPez === "3") {
            finalizarCompra("Pez Guppy", 40);
        } else if (opcionPez === "4") {
            return; // Volver al menú principal
        } else {
            alert("Opción no válida.");
        }
    }
}

// Función para la opción de compra de plantas
function comprarPlantas() {
    let opcionPlanta = "";
    while (opcionPlanta !== "4") {
        opcionPlanta = prompt("Selecciona la planta que deseas comprar:\n1. Planta Elodea - $30\n2. Planta Anubias - $45\n3. Planta Musgo de Java - $25\n4. Volver al menú principal");
        
        if (opcionPlanta === "1") {
            finalizarCompra("Planta Elodea", 30);
        } else if (opcionPlanta === "2") {
            finalizarCompra("Planta Anubias", 45);
        } else if (opcionPlanta === "3") {
            finalizarCompra("Planta Musgo de Java", 25);
        } else if (opcionPlanta === "4") {
            return; // Volver al menú principal
        } else {
            alert("Opción no válida.");
        }
    }
}

// Función para la opción de compra de otros productos
function comprarOtros() {
    let opcionOtro = "";
    while (opcionOtro !== "4") {
        opcionOtro = prompt("Selecciona el artículo que deseas comprar:\n1. Filtro de Agua - $100\n2. Termostato - $80\n3. Kit de Limpieza - $60\n4. Volver al menú principal");
        
        if (opcionOtro === "1") {
            finalizarCompra("Filtro de Agua", 100);
        } else if (opcionOtro === "2") {
            finalizarCompra("Termostato", 80);
        } else if (opcionOtro === "3") {
            finalizarCompra("Kit de Limpieza", 60);
        } else if (opcionOtro === "4") {
            return; // Volver al menú principal
        } else {
            alert("Opción no válida.");
        }
    }
}

// Función para finalizar la compra y confirmar
function finalizarCompra(item, precio) {
    let confirmar = confirm("Has seleccionado " + item + ". El precio es $" + precio + ". ¿Deseas confirmar la compra?");
    if (confirmar) {
        alert("Compra confirmada. Gracias por tu compra de " + item + "!");
    } else {
        alert("Compra cancelada.");
    }
}

// Iniciar el proceso de compra
iniciarCompra();
