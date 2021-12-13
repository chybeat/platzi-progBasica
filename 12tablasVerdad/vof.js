/*
En un Banco hay clientes, tienen una cuenta y el cliente tiene una cuenta y tiene un saldo. El cliente quiere hacer una transferencia a un banco de destino a una cuenta de destino. Los horarios de transferencias van desde 0 a 24. La cantidad a trasnferir al cliente es 1millon.

Las condiciones obligatorias para la transferencia son:
    El cliente debe ser verificado para poder hacer trasnferencias.
    El cliente de destino tiene que ser verificado
    El saldo en la cuenta debe ser superior al monto a trasnferir mas el costo de transaccón

    Costo de transacción:
    Si el banco de destino es el mismo que el del cliente el costo es 0 USD
    Si el banco destino es diferente al del cliente el costo de transaccion es de 100 USD
    Solo se puede hacer transferencias en hora de 9 a 12 y de 15 a 20

hacerlo en multiples if y en un solo if (:O)

botones de operaciones

*/
function buscarUsuario(idCuenta) {
	for (c of usuarios) {
		if (c.cuenta.numero == idCuenta) {
			return c;
		}
	}
}

function cambiarMonto() {
	monto = parseInt(docMonto.value);
}

function cambiarHora() {
	if (docHora.value == "s") {
		hora = new Date().getHours();
	} else {
		hora = parseInt(docHora.value);
	}
}

function cambiarOrigen() {
	idUsuario = obtenerIdUsuario(this);
	u = buscarUsuario(idUsuario);
	establecerOrigen(u);
}

function celda(texto) {
	var td = document.createElement("td");
	td.innerHTML = texto;
	return td;
}

function establecerOrigen(usuario) {
	for (u of usuarios) {
		u.origen = false;
	}
	usuario.origen = true;
	origen = usuario;
	docOrigen.innerHTML = usuario.nombre;
	for (u of usuarios) {
		u.escribirUsuario(u, "u_" + u.cuenta.numero);
	}
}

function moneda(cantidad) {
	cantidad = cantidad.toLocaleString("es-CO", { style: "currency", currency: "COP" });
	return cantidad;
}

function obtenerIdUsuario(nodo) {
	var td = nodo.parentNode;
	var tr = td.parentNode;
	return tr.id.replace("u_", "");
}

function realizarTransferencia() {
	var resultado = "";
	if (
		origen.verificado &&
		destino.verificado &&
		origen.cuenta.saldo >= precioTransfer + monto &&
		((hora >= 9 && hora < 12) || (hora >= 15 && hora < 20))
	) {
		transferir = true;
	} else {
		transferir = false;
	}

	if (!transferir) {
		if (!origen.verificado) {
			resultado += "El usuario de origen (" + origen.nombre + ") no está verificado<br />";
		}
		if (!destino.verificado) {
			resultado += "El usuario de destino (" + destino.nombre + ") no está verificado<br />";
		}
		if (origen.cuenta.saldo <= monto + precioTransfer) {
			valorReq = moneda(origen.cuenta.saldo + precioTransfer);
			resultado +=
				origen.nombre +
				" no tiene saldo suficiente para transferir. Requiere de " +
				moneda(monto + precioTransfer) +
				" y su saldo es de " +
				moneda(origen.cuenta.saldo);
		}
		if (!(hora >= 9 && hora <= 12) || (hora >= 15 && hora <= 20)) {
			resultado += "El horario actual (" + hora + ") no está dentro del rango de 9 a 12 o de 15 a 20";
		}
	} else {
		resultado = "<strong>" + origen.nombre + "</strong> transfirió <strong>";
		resultado += moneda(monto);
		resultado += "</strong> a " + destino.nombre + ". El costo de transferencia fue de ";
		resultado += moneda(precioTransfer);
	}
	escribir.innerHTML = resultado;
	return transferir;
}

function transferirDinero() {
	var idUsuario = obtenerIdUsuario(this);
	var resultado;
	destino = buscarUsuario(idUsuario);
	precioTransfer = origen.cuenta.banco == destino.cuenta.banco ? 0 : 100;
	resultado = realizarTransferencia();
	if (resultado) {
		origen.cuenta.saldo = origen.cuenta.saldo - (monto + precioTransfer);
		destino.cuenta.saldo = destino.cuenta.saldo + monto;
	}
	origen.escribirUsuario(origen, "u_" + origen.cuenta.numero);
	destino.escribirUsuario(destino, "u_" + destino.cuenta.numero);
}

function verificarUsuario() {
	var idUsuario = obtenerIdUsuario(this);
	var u = buscarUsuario(idUsuario);
	var resultado = "";

	u.verificado = !u.verificado;
	u.escribirUsuario(u, "u_" + u.cuenta.numero);
	resultado = "El usuario " + u.nombre + " se ha ";
	if (u.verificado) {
		resultado += "verificado ";
	} else {
		resultado += "olvidado ";
	}
	escribir.innerHTML = resultado;
}

class Banco {
	constructor(n, v) {
		this.nombre = n;
		this.verificado = v;
	}
}

class Cliente {
	constructor(n, v, b, s) {
		this.nombre = n;
		this.verificado = v;

		this.origen = false;
		this.crearCuenta(b, s);
		this.escribirUsuario(this);
	}

	crearCuenta(banco, saldo) {
		this.cuenta = new Cuenta(banco, saldo);
	}

	verificar() {
		this.verificado = true;
		this.escribirUsuario(this, "u_" + this.cuenta.numero);
		escribirResultado(this.nombre + " ha sido verificado;");
	}

	escribirUsuario(usuario, dest) {
		var linea, verif, obsoleto, padre, botonV, botonT, opers, radioO, origenRadio;
		var origen = window.origen;
		linea = document.createElement("tr");
		linea.id = "u_" + usuario.cuenta.numero;

		//origen
		origenRadio = document.createElement("td");
		radioO = document.createElement("input");
		radioO.type = "radio";
		radioO.name = "origen";
		if (usuario.origen) {
			radioO.checked = true;
		}
		radioO.addEventListener("change", cambiarOrigen);
		radioO.value = usuario.nombre;
		origenRadio.appendChild(radioO);
		linea.appendChild(origenRadio);

		//Nombre
		linea.appendChild(celda(usuario.nombre));

		//Verificado
		verif = usuario.verificado ? "Si" : "No";
		linea.appendChild(celda(verif));

		//Cuenta
		linea.appendChild(celda("cta_" + usuario.cuenta.numero));

		//banco
		linea.appendChild(celda(usuario.cuenta.banco));

		//saldo
		linea.appendChild(celda(usuario.cuenta.saldo.toLocaleString("es-CO", { style: "currency", currency: "COP" })));

		//operaciones > verificar
		opers = document.createElement("td");

		botonV = document.createElement("input");
		botonV.type = "button";
		if (usuario.verificado) {
			botonV.value = "Olvidar";
		} else {
			botonV.value = "Verificar";
		}
		botonV.addEventListener("click", verificarUsuario);
		opers.appendChild(botonV);

		botonT = document.createElement("input");
		botonT.type = "button";
		botonT.value = "Transferir";
		//operaciones > transferir
		if (typeof origen != "undefined") {
			if (usuario.nombre != origen.nombre) {
				botonT.addEventListener("click", transferirDinero);
				opers.appendChild(botonT);
			}
		}
		//agregar linea a tabla
		linea.appendChild(opers);

		if (typeof dest == "undefined") {
			dest = document.getElementById("usuarios");
			dest.appendChild(linea);
		} else {
			obsoleto = document.getElementById(dest);
			padre = obsoleto.parentNode;
			padre.replaceChild(linea, obsoleto);
		}
	}
}

class Cuenta {
	constructor(b, s) {
		this.banco = b.nombre;
		this.numero = ++cuentas;
		this.saldo = this.numero ? s : 0;
	}

	agregarDinero(m) {
		this.saldo += m;
	}
}

//Generacion de variables
var destino;
var hora;
var monto;
var origen;
var precioTransfer;
var transferir = false;

//eventos
var docHora = document.getElementById("docHora");
docHora.addEventListener("change", cambiarHora);
cambiarHora();

var docMonto = document.getElementById("docMonto");
docMonto.addEventListener("keyup", cambiarMonto);
docMonto.addEventListener("change", cambiarMonto);
cambiarMonto();

docOrigen = document.getElementById("docOrigen");

var escribir = document.getElementById("resultados");

//generacion de cuentas
var cuentas = 0;

// CREACION DE BANCOS
var bancos = [
	(villas = new Banco("Banco Las ab-ellas", true)),
	(bb = new Banco("Banco Baviera Vizcaya Argentina Sur", true)),
	(davi = new Banco("Banco Doycasita", false)),
];

//creacion de usuarios/clientes
var usuarios = [
	(andy = new Cliente("Andy Bosch", false, bb, 1000900)),
	(amix = new Cliente("Elrodri Rider", true, davi, 1785800)),
	(novia = new Cliente("Zilia Pretel Gallo", true, bb, 800000)),
	(vander = new Cliente("Cristiano Van Derheinz", true, villas, 4000000)),
];
