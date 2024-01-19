// Definir productos con sus precios usando un objeto
const productos = {
    cafe: { precio: 300 },
    te: { precio: 200 },
    pan: { precio: 400 }
};

// Función para agregar productos al carrito
function agregarProductoAlCarrito(carrito, producto, cantidad) {
    if (carrito.find(item => item.producto === producto)) {
        carrito.find(item => item.producto === producto).cantidad += cantidad;
    } else {
        carrito.push({ producto, cantidad, precio: productos[producto].precio });
    }
}

// Función para mostrar el contenido del carrito
function mostrarCarrito(carrito) {
    if (carrito.length === 0) {
        alert("El carrito está vacío.");
    } else {
        let productosEnCarrito = "Productos en el carrito:\n";
        carrito.forEach(item => {
            productosEnCarrito += `${item.producto}: $${item.precio} (Cantidad: ${item.cantidad})\n`;
        });
        alert(productosEnCarrito);
    }
}

// Función para calcular el total de la compra
function calcularTotalCompra(carrito) {
    return carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
}

// Función principal
function tiendaVirtual() {
    let carritoCompras = [];

    function ingresarProductoRecursivo(carrito) {
        let dataProducto = ingresarNombreProducto();
        let producto = dataProducto[0];
        let cantidad = dataProducto[1];

        if (productos[producto]) {
            agregarProductoAlCarrito(carrito, producto, cantidad);
            alert(`${cantidad} ${producto}(s) ha(n) sido agregado(s) al carrito.`);

            let agregarAlCarrito = parseInt(prompt("Desea agregar otro producto al carrito\n1. Si\n2. No"));

            if (agregarAlCarrito === 1) {
                ingresarProductoRecursivo(carrito);
            } else {
                // No es necesario volver a llamar tiendaVirtual() aquí
            }
        } else {
            alert("Producto no válido. Selecciona cafe, te o pan.");
            ingresarProductoRecursivo(carrito);
        }
    }

    while (true) {
        alert("Bienvenido a la tienda en línea");
        let opcion = prompt("Seleccione una opción:\n1. Agregar producto al carrito\n2. Ver carrito\n3. Calcular total\n4. Salir");

        switch (opcion) {
            case "1":
                ingresarProductoRecursivo(carritoCompras);
                break;
            case "2":
                mostrarCarrito(carritoCompras);
                break;

            case "3":
                if (carritoCompras.length === 0) {
                    alert("El carrito está vacío. No se puede calcular el total.");
                } else {
                    let totalCompra = calcularTotalCompra(carritoCompras);
                    alert(`El total de la compra es: $${totalCompra}`);
                }
                break;

            case "4":
                alert("Gracias por usar nuestra tiendita virtual. ¡Hasta luego!");
                break;

            default:
                alert("Opción no válida. Por favor, seleccione una opción válida.");
                break;
        }

        if (opcion === "4") {
            break;
        }
    }
}

function ingresarNombreProducto() {
    let producto = prompt("Ingrese el nombre del producto (cafe, te, pan):").toLowerCase();
    let cantidad = parseInt(prompt(`Ingrese la cantidad de ${producto}s:`));

    if (isNaN(cantidad) || cantidad <= 0) {
        alert("Por favor, ingrese una cantidad válida.");
    }
    return [producto, cantidad];
}

// Llamar a la función principal al cargar la página
tiendaVirtual();

