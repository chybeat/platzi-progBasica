function dibujarLinea(color, xInicial, yInicial, xFinal, yFinal, lienzo) {
	lienzo.beginPath();
	lienzo.strokeStyle = color;
	lienzo.lineWidth = 3;
	lienzo.moveTo(xInicial, yInicial);
	lienzo.lineTo(xFinal, yFinal);
	lienzo.strokeStyle;
	lienzo.stroke();
	lienzo.closePath();
}

function dibujarTeclado(evento) {
	var teclas = {
		UP: 38,
		DOWN: 40,
		LEFT: 37,
		RIGHT: 39,
	};
	var colorcito = "green";
	var movimiento = 1;

	switch (evento.keyCode) {
		case teclas.UP:
			dibujarLinea(colorcito, x, y, x, y - movimiento, papel);
			y = y - movimiento;
			break;
		case teclas.DOWN:
			dibujarLinea(colorcito, x, y, x, y + movimiento, papel);
			y = y + movimiento;
			break;
		case teclas.LEFT:
			dibujarLinea(colorcito, x, y, x - movimiento, y, papel);
			x = x - movimiento;
			break;
		case teclas.RIGHT:
			dibujarLinea(colorcito, x, y, x + movimiento, y, papel);
			x = x + movimiento;
			break;
	}
}

document.addEventListener("keydown", dibujarTeclado);
var cuadrito = document.getElementById("areaDeDibujo");
var papel = cuadrito.getContext("2d");
var x = 100;
var y = 100;

dibujarLinea("red", x - 1, y - 1, x + 1, y + 1, papel);

//borde del canvas
dibujarLinea("grey", 0 + 1, 0 + 1, 0 + 1, cuadrito.height - 1, papel);
dibujarLinea("grey", 0 + 1, cuadrito.height - 1, cuadrito.height - 1, cuadrito.width - 1, papel);
dibujarLinea("grey", cuadrito.width - 1, cuadrito.height - 1, cuadrito.width - 1, 0 + 1, papel);
dibujarLinea("grey", cuadrito.width - 1, 0 + 1, 0 + 1, 0 + 1, papel);

// DIBUJAR CON EL MOUSE (optimizado)
cuadrito.addEventListener("mousemove", dibujarMouse);
function dibujarMouse(evento) {
	cuadrito.addEventListener("contextmenu", function (e) {
		//para evitar que se despliegue el menú contextual
		e.preventDefault();
	});
	var colorcito = "red";
	if (evento.buttons == 2) {
		colorcito = "white";
	}
	if (evento.buttons != 0) {
		dibujarLinea(colorcito, x, y, evento.layerX, evento.layerY, papel);
	}
	x = evento.layerX;
	y = evento.layerY;
}

//DIBUJAR CON EL DEDO (celulares)

//Codigo que no entendí muy bien, realiza una comprobación para verificar si el navegador permite "passive event listeners" para mejorar el rendimiento. Leer mas en: https://www.chromestatus.com/feature/5745543795965952
var supportsPassive = false;
try {
	var opts = Object.defineProperty({}, "passive", {
		get: function () {
			supportsPassive = true;
		},
	});
	window.addEventListener("testPassive", null, opts);
	window.removeEventListener("testPassive", null, opts);
} catch (e) {}

cuadrito.addEventListener("touchstart", dibujarToque, supportsPassive ? { passive: true } : false);
cuadrito.addEventListener("touchmove", dibujarToque, supportsPassive ? { passive: true } : false);
cuadrito.addEventListener("touchend", dibujarToque, supportsPassive ? { passive: true } : false);

function dibujarToque(evento) {
	if (evento.type == "touchstart") {
		//prevenir recargar página al iniciar con un toque hacia abajo o evitar el scroll
		document.getElementsByTagName("body")[0].style.overscrollBehavior = "contain";
		document.getElementsByTagName("body")[0].style.overflow = "hidden";

		//si el evento inicia, mover el 'cursor' donde se inició el 'toque'
		x = evento.touches[0].clientX;
		//En caso de haber hecho scroll y debido a que touch mide la pantalla, es necesario agregar los pixeles de desplazamiento para que se dibuje exactamente donde se coloca el dedo.
		y = window.scrollY + evento.touches[0].clientY;
	} else if (evento.type == "touchend") {
		//elimina la prevención de toque hacia abajo
		document.getElementsByTagName("body")[0].removeAttribute("style");
	} else {
		//dibujando ando
		colorcito = "gray";
		dibujarLinea(colorcito, x, y, evento.touches[0].clientX, window.scrollY + evento.touches[0].clientY, papel);
		x = evento.touches[0].clientX;
		y = window.scrollY + evento.touches[0].clientY;
	}
}
