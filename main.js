// Función para obtener el nombre del usuario
function obtenerNombre() {
    return document.getElementById("nombreUsuario").value || "Usuario";
}

// Función para obtener una cantidad válida
function obtenerCantidad() {
    const monto = parseFloat(document.getElementById("montoDeuda").value);
    return isNaN(monto) ? 0 : monto;
}

// Función para calcular impuestos
function calcularImpuestos(deudaTotal) {
    let impuestos = 0;
    const aplicarImpuestos = document.getElementById("aplicarImpuestos").checked;
    if (aplicarImpuestos) {
        const porcentajeImpuestos = parseFloat(document.getElementById("porcentajeImpuestos").value);
        impuestos = deudaTotal * (porcentajeImpuestos / 100);
    }
    return impuestos;
}

// Objeto Deuda
function Deuda(monto, tipo) {
    this.monto = monto;
    this.tipo = tipo;
}

// Array para almacenar deudas
let deudas = [];

// Método para agregar una nueva deuda al array
function agregarDeuda(monto, tipo) {
    let nuevaDeuda = new Deuda(monto, tipo);
    deudas.push(nuevaDeuda);
}

// Método para buscar deudas por tipo utilizando filter
function buscarDeudasPorTipo(tipo) {
    return deudas.filter(deuda => deuda.tipo === tipo);
}

// Mostrar mensaje en el DOM
function mostrarMensaje(mensaje) {
    const mensajeDiv = document.getElementById("mensaje");
    mensajeDiv.textContent = mensaje;
}

// Capturar evento de envío de nombre
document.getElementById("enviarNombre").addEventListener("click", function(event) {
    event.preventDefault(); // Evitar comportamiento predeterminado del formulario
    const nombreUsuario = obtenerNombre();
    mostrarMensaje(`Hola, ${nombreUsuario}! Bienvenido al sistema de gestión de deudas.`);
});

// Capturar evento de envío de deudas
document.getElementById("agregarDeuda").addEventListener("click", function(event) {
    event.preventDefault(); // Evitar comportamiento predeterminado del formulario
    const montoDeuda = obtenerCantidad();
    const tipoDeuda = document.getElementById("tipoDeuda").value;
    agregarDeuda(montoDeuda, tipoDeuda);
});

// Capturar evento de cálculo de deudas
document.getElementById("calcularDeudas").addEventListener("click", function(event) {
    event.preventDefault(); // Evitar comportamiento predeterminado del formulario
    
    // Calcular total de deudas
    let deudaTotal = 0;
    deudas.forEach(deuda => {
        deudaTotal += deuda.monto;
    });

    // Obtener la cantidad de dinero que posee
    const plataTotal = parseFloat(document.getElementById("plataTotal").value);

    // Calcular impuestos
    const impuestos = calcularImpuestos(deudaTotal);

    // Calcular vuelto
    const vuelto = plataTotal - deudaTotal;

    // Construir mensaje
    let mensaje = `Hola, ${obtenerNombre()}!\n`;
    mensaje += `Tienes una deuda total de ${deudaTotal} pesos.\n`;
    if (impuestos > 0) {
        mensaje += `Los impuestos que se te aplican son un total de ${impuestos} pesos.\n`;
        mensaje += `Por lo que la deuda quedaría en ${deudaTotal + impuestos} pesos.\n`;
    }
    mensaje += `Posees un total de ${plataTotal} pesos.\n`;
    if (vuelto < 0) {
        mensaje += `Debes plata. Tienes un saldo negativo de ${vuelto} pesos.\n`;
    } else {
        mensaje += `Después de pagar tus deudas te sobran ${vuelto} pesos.\n`;
    }

    const verDetalles = document.getElementById("verDetalles").checked;
    if (verDetalles) {
        const deudaSeleccionada = document.getElementById("tipoDeudaDetalle").value;
        if (deudaSeleccionada === 'todas') {
            mensaje += `Detalles de todas las deudas:\n`;
            deudas.forEach(deuda => {
                mensaje += ` - Monto: ${deuda.monto}, Tipo: ${deuda.tipo}\n`;
            });
        } else {
            const deudasTipo = buscarDeudasPorTipo(deudaSeleccionada);
            if (deudasTipo.length > 0) {
                mensaje += `Detalles de las deudas de tipo ${deudaSeleccionada}:\n`;
                deudasTipo.forEach(deuda => {
                    mensaje += ` - Monto: ${deuda.monto}, Tipo: ${deuda.tipo}\n`;
                });
            } else {
                mensaje += `No tienes deudas de tipo ${deudaSeleccionada}.\n`;
            }
        }
    } else {
        mensaje += `No se mostrarán detalles de las deudas.\n`;
    }

    mostrarMensaje(mensaje);
});

// Guardar y cargar datos en el almacenamiento local (localStorage)
function guardarDatos() {
    localStorage.setItem("deudas", JSON.stringify(deudas));
}

function cargarDatos() {
    const deudasGuardadas = localStorage.getItem("deudas");
    if (deudasGuardadas) {
        deudas = JSON.parse(deudasGuardadas);
    }
}

// Cargar datos al iniciar la página
window.addEventListener("load", function() {
    cargarDatos();
});