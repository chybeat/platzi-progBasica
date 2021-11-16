function aleatorio(min, max) {
	resultado = Math.floor(Math.random() * (max - min + 1)) + min;
	return resultado;
}

function colocarElemento(elemento) {
	if (elemento.cargaOK) {
		for (i = 0; i < elemento.cantidad; i++) {
			if (elemento.familia[elemento.cantidad] !== true) {
				coords = {
					x: aleatorio(0, 7) * 60,
					y: aleatorio(0, 7) * 60,
				};
				elemento.familia[i] = coords;
			}
			papel.drawImage(elemento.imagen, elemento.familia[i].x, elemento.familia[i].y);
		}
		elemento.familia[elemento.cantidad] = true;
	}
}

function dibujarGranja() {
	if (fondo.cargaOK) {
		colocarElemento(fondo);
	}
	if (vaca.cargaOK) {
		colocarElemento(vaca);
	}
	if (cerdo.cargaOK) {
		colocarElemento(cerdo);
	}
	if (pollo.cargaOK) {
		colocarElemento(pollo);
	}
}

function cargarFondo() {
	fondo.cargaOK = true;
	dibujarGranja();
}

function cargarVaca() {
	vaca.cargaOK = true;
	dibujarGranja();
}

function cargarCerdo() {
	cerdo.cargaOK = true;
	dibujarGranja();
}

function cargarPollo() {
	pollo.cargaOK = true;
	dibujarGranja();
}

//canvas
var vp = document.getElementById("villaPlatzi");
var papel = vp.getContext("2d");

//elementos
var fondo = {
	url: "tile.png",
	cargaOK: false,
	cantidad: 1,
	familia: [
		{
			x: 0,
			y: 0,
		},
		true,
	],
};

var vaca = {
	url: "vaca.png",
	cargaOK: false,
	cantidad: aleatorio(1, 5),
	familia: new Array(),
};

var cerdo = {
	url: "cerdo.png",
	cargaOK: false,
	cantidad: 1,
	movido: false,
	familia: new Array(),
};

var pollo = {
	url: "pollo.png",
	cargaOK: false,
	cantidad: aleatorio(5, 12),
	familia: new Array(),
};

var teclas = {
	UP: 38,
	DOWN: 40,
	LEFT: 37,
	RIGHT: 39,
	W: 87,
	S: 83,
	A: 65,
	D: 68,
};

//verif cantidades
//console.log("Tot vacas: " + vaca.cantidad);
//console.log("Tot cerdos: " + cerdo.cantidad);
//console.log("Tot pollos: " + pollo.cantidad);

fondo.imagen = new Image();
fondo.imagen.src = fondo.url;
fondo.imagen.addEventListener("load", cargarFondo);

vaca.imagen = new Image();
vaca.imagen.src = vaca.url;
vaca.imagen.addEventListener("load", cargarVaca);

cerdo.imagen = new Image();
cerdo.imagen.src = cerdo.url;
cerdo.imagen.addEventListener("load", cargarCerdo);

pollo.imagen = new Image();
pollo.imagen.src = pollo.url;
pollo.imagen.addEventListener("load", cargarPollo);

function moverCerdo(evento) {
	if (cerdo.cargaOK) {
		var movimiento = 10;

		switch (evento.keyCode) {
			case teclas.UP:
			case teclas.W:
				cerdo.familia[0].y = cerdo.familia[0].y - movimiento;
				break;
			case teclas.DOWN:
			case teclas.S:
				cerdo.familia[0].y = cerdo.familia[0].y + movimiento;
				break;
			case teclas.LEFT:
			case teclas.A:
				cerdo.familia[0].x = cerdo.familia[0].x - movimiento;
				break;
			case teclas.RIGHT:
			case teclas.D:
				cerdo.familia[0].x = cerdo.familia[0].x + movimiento;
				break;
		}
		dibujarGranja();
	}
}

document.addEventListener("keydown", moverCerdo);
