//Algoritmo para calcular deudas//
//Funcion en el cual se solicita al usuario que ingrese un monto//
function obtenerCantidad(mensaje) {
    return parseFloat(prompt(mensaje));
}
//Funcion para calcular los impuestos que serian un 10% sobre la deuda total
function calcularImpuestos(deudaTotal) {
    const impuestos = deudaTotal * 0.1;
    return impuestos;
}
//Sector en donde se le solicita al usuario ingresar sus deudas y cantidad de dinero que posee//
let deudaTarjeta = obtenerCantidad("Ingrese la deuda que tiene con su tarjeta");
let deudaMp = obtenerCantidad("Ingrese la deuda que posee con MercadoPago");
let plata = obtenerCantidad("Ingrese la cantidad de dinero que posee");

let tieneDeuda = true; //Variable que utilizo para definir si continua o sigue el ciclo while de deudas//
let deudaTotal = deudaTarjeta + deudaMp; // Variable que utilizo como acumulador para las deudas//

//Ciclo while que uso para verificar si posee alguna deuda mas//
while (tieneDeuda) {
    const respuesta = prompt("¿Posee usted alguna deuda más? Ingrese 'si' o 'no': ");

    if (respuesta.toLowerCase() === 'si') {
        const montoDeuda = obtenerCantidad("Ingrese la cantidad de dinero que adeuda: ");
        deudaTotal += montoDeuda;
    } else if (respuesta.toLowerCase() === 'no') {
        tieneDeuda = false;
    } else {
        alert("Respuesta no válida. Por favor, ingrese 'si' o 'no'.");
    }
}

let debenPlata = true; //Variable que uso para definir si continua o sigue el ciclo while de plata que le deben al usuario//
let plataTotal = plata; //Variable que uso como acumulador para la plata que posee el usuario//

//Ciclo while que uso para verificar si le deben dinero al usuario//
while (debenPlata) {
    const respuesta = prompt("¿Alguien le debe dinero a usted? Ingrese 'si' o 'no': ");

    if (respuesta.toLowerCase() === 'si') {
        const montoDeben = obtenerCantidad("Ingrese la cantidad de dinero que le deben: ");
        plataTotal += montoDeben;
    } else if (respuesta.toLowerCase() === 'no') {
        debenPlata = false;
    } else {
        alert("Respuesta no válida. Por favor, ingrese 'si' o 'no'.");
    }
}
// Sector en donde calculo los impuestos //
const impuestos = calcularImpuestos(deudaTotal);

// Variable que utilizo para establecer cuanto le sobra o cuanto queda debiendo de plata//
let vuelto = plataTotal - deudaTotal;

//Variable que uso para concatenar todas las ultimas lineas de codigo al final y no tener que mostrarlo en varios mensajes//
let mensaje = `Tenes una deuda de ${deudaTotal} pesos. Los impuestos que se te aplican son un total de ${impuestos} pesos. Por lo que la deuda quedaria en ${deudaTotal += impuestos} pesos. Posees un total de ${plataTotal} pesos.`; 


//Condicional que muestra al usuario si le sobra plata o debe plata//
if (deudaTotal >= plataTotal) {
    mensaje += `\nNo te alcanza ni para un caramelo, amigo. Debes plata. Tenes ${vuelto} pesos.`;
} else {
    mensaje += `\nBien ahí, amigo. Estás sobrado de plata. Despues de pagar tus deudas te sobran ${vuelto} pesos.`;
}

alert(mensaje);