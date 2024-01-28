// Función para obtener el nombre del usuario
function obtenerNombre() {
    return prompt("Ingrese su nombre:");
}

// Función en la cual se solicita al usuario que ingrese un monto válido
function obtenerCantidad(mensaje) {
    let cantidad;
    do {
        cantidad = parseFloat(prompt(mensaje));
        if (isNaN(cantidad)) {
            alert("Por favor, ingrese un número válido.");
        }
    } while (isNaN(cantidad));
    return cantidad;
}

// Función para calcular los impuestos con opción dinámica
function calcularImpuestosDinamicos(deudaTotal) {
    let impuestos = 0;
    const aplicarImpuestos = prompt("¿Desea aplicar impuestos? Ingrese 'si' o 'no': ");

    if (aplicarImpuestos.toLowerCase() === 'si') {
        const porcentajeImpuestos = parseFloat(prompt("Ingrese el porcentaje de impuestos a aplicar: "));
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

// Obtener nombre del usuario
let nombreUsuario = obtenerNombre();
alert(`Hola, ${nombreUsuario}! Bienvenido al sistema de gestión de deudas.`);

// Preguntar al usuario sobre sus deudas
let continuarDeudas = true;
while (continuarDeudas) {
    const montoDeuda = obtenerCantidad("Ingrese el monto de la deuda:");
    const tipoDeuda = prompt("Ingrese el tipo de deuda:");
    agregarDeuda(montoDeuda, tipoDeuda);

    const respuesta = prompt("¿Desea ingresar otra deuda? Ingrese 'si' para continuar o 'no' para finalizar:");
    if (respuesta.toLowerCase() === 'no') {
        continuarDeudas = false;
    } else if (respuesta.toLowerCase() !== 'si') {
        alert("Respuesta no válida. Por favor, ingrese 'si' o 'no'.");
    }
}

// Calcular total de deudas
let deudaTotal = 0;
deudas.forEach(deuda => {
    deudaTotal += deuda.monto;
});

// Obtener la cantidad de dinero que posee
let plataTotal = obtenerCantidad("Ingrese la cantidad de dinero que posee:");

// Calcular impuestos
const impuestos = calcularImpuestosDinamicos(deudaTotal);

// Calcular vuelto
let vuelto = plataTotal - deudaTotal;

// Construir mensaje
let mensaje = `Hola, ${nombreUsuario}!`;
mensaje += `\nTienes una deuda total de ${deudaTotal} pesos.`;
if (impuestos > 0) {
    mensaje += `\nLos impuestos que se te aplican son un total de ${impuestos} pesos.`;
    mensaje += `\nPor lo que la deuda quedaría en ${deudaTotal + impuestos} pesos.`;
}
mensaje += `\nPosees un total de ${plataTotal} pesos.`;
if (vuelto < 0) {
    mensaje += `\nDebes plata. Tienes un saldo negativo de ${vuelto} pesos.`;
} else {
    mensaje += `\nDespués de pagar tus deudas te sobran ${vuelto} pesos.`;
}

// Preguntar si desea ver detalladamente alguna de sus deudas
const verDetalles = prompt("¿Quisiera ver detalladamente alguna de sus deudas? Ingrese 'si' o 'no':");
if (verDetalles.toLowerCase() === 'si') {
    const deudaSeleccionada = prompt("Ingrese el tipo de deuda que desea ver detalladamente o 'todas' para ver todas las deudas:");
    if (deudaSeleccionada.toLowerCase() === 'todas') {
        mensaje += `\nDetalles de todas las deudas:`;
        deudas.forEach(deuda => {
            mensaje += `\n - Monto: ${deuda.monto}, Tipo: ${deuda.tipo}`;
        });
    } else {
        const deudasTipo = buscarDeudasPorTipo(deudaSeleccionada);
        if (deudasTipo.length > 0) {
            mensaje += `\nDetalles de las deudas de tipo ${deudaSeleccionada}:`;
            deudasTipo.forEach(deuda => {
                mensaje += `\n - Monto: ${deuda.monto}, Tipo: ${deuda.tipo}`;
            });
        } else {
            mensaje += `\nNo tienes deudas de tipo ${deudaSeleccionada}.`;
        }
    }
} else if (verDetalles.toLowerCase() !== 'no') {
    mensaje += `\nRespuesta no válida. No se mostrarán detalles de las deudas.`;
}

alert(mensaje);