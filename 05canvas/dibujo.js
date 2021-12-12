function dibujarLinea(color, xInicial, yInicial, xFinal, yFinal) {
	lienzo.beginPath();
	lienzo.strokeStyle = color;
	lienzo.moveTo(xInicial, yInicial);
	lienzo.lineTo(xFinal, yFinal);
	lienzo.strokeStyle;
	lienzo.stroke();
	lienzo.closePath();
}

function dibujoPorClick() {
	var lineas = parseInt(texto.value);
	var l = 0;
	var yi, xf;
	var colorcito = "#FAA";
	var espacio = ancho / lineas;

	lienzo.clearRect(0, 0, ancho, ancho);

	dibujarLinea(colorcito, 1, 1, 1, ancho - 1);
	dibujarLinea(colorcito, 1, ancho - 1, ancho - 1, ancho - 1);
	dibujarLinea(colorcito, ancho - 1, ancho - 1, ancho - 1, 1);
	dibujarLinea(colorcito, ancho - 1, 1, 1, 1);

	do {
		yi = espacio * l;
		xf = espacio * (l + 1);

		dibujarLinea(colorcito, 0, yi, xf, ancho);
		l++;
	} while (l < lineas);
}

var texto = document.getElementById("texto_lineas");
var boton = document.getElementById("botoncito");
boton.addEventListener("click", dibujoPorClick);
texto.addEventListener("change", dibujoPorClick);

var d = document.getElementById("dibujito");
var lienzo = d.getContext("2d");

var ancho = d.width;

/* ciclo while
while (l < lineas) {
	yI = l * 10;
	xF = 10 * (l + 1);
	dibujarLinea(colorcito, 0, yI, xF, 300);
	console.log("linea " + l);
	l++;
}

/* Ciclo For
for (l = 0; l < lineas; l++) {
	yI = l * 10;
	xF = 10 * (l + 1);
	dibujarLinea(colorcito, 0, yI, xF, 300);
	console.log("linea " + l);
}
*/
