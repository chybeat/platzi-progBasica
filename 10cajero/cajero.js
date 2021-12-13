/*desafios
 utilizar la menor cantidad de código posible
 en vez que muestre los billetes en texto agregar dibujos de billetes
 la caja se empiece a quedar vacia restando los billetes entregados

*/
class billete {
	constructor(v, c, f) {
		this.valor = v;
		this.cantidad = c;
		this.foto = new Image();

		this.foto.src = "billete-" + this.valor + ".svg";
		this.foto.width = "120";
	}
}

function entregarDinero() {
	var entregado = [];
	dinero = parseInt(dineroSolicitado.value);
	resultado.innerHTML = "";
	if (isNaN(dinero)) {
		resultado.innerHTML = "Una cantidad vacía??";
		return;
	}
	for (bi of caja) {
		if (dinero > 0) {
			div = Math.floor(dinero / bi.valor);
			papeles = div > bi.cantidad ? bi.cantidad : div;
			entregado.push(new billete(bi.valor, papeles));
			dinero = dinero - bi.valor * papeles;
		}
	}
	if (dinero > 0) {
		resultado.innerHTML = "Soy un cajero malo, he sido muy malo y no puedo darte esa cantidad :(";
	} else {
		resp = document.createElement("p");
		text = document.createTextNode("Aqui tienes los $" + dineroSolicitado.value + " solicitados.");
		resp.appendChild(text);
		resultado.appendChild(resp);
		for (e of entregado) {
			if (e.cantidad > 0) {
				dibujarBillete(e);
				for (bi of caja) {
					if (bi.valor == e.valor) {
						bi.cantidad = bi.cantidad - e.cantidad;
					}
				}
			}
		}
	}
	totalEnCajero();
}

function dibujarBillete(billete) {
	for (i = 1; i <= e.cantidad; i++) {
		resultado.appendChild(e.foto.cloneNode(true));
	}
}

function totalEnCajero() {
	var totCaja = 0;
	for (c of caja) {
		totCaja += c.valor * c.cantidad;
	}
	console.log(totCaja);
	if (totCaja == 0) {
		botonExtraer.setAttribute("disabled", "");
		dineroSolicitado.setAttribute("disabled", "");
		dineroSolicitado.value = "";
		estado.innerHTML = "Cerrado por pobre :/";
	} else {
		dineroSolicitado.value = "";
		estado.innerHTML = "Tenemos dinero, ¿Cuanto quieres?";
	}
}

var caja = [];
caja.push(new billete(100, 10));
caja.push(new billete(50, 20));
caja.push(new billete(20, 30));
caja.push(new billete(10, 30));
caja.push(new billete(5, 30));
var div = 0;
var papeles = 0;

var dinero = 0;

var dineroSolicitado = document.getElementById("dinero"); //t

var botonExtraer = document.getElementById("extraer"); //b
botonExtraer.addEventListener("click", entregarDinero);

var resultado = document.getElementById("resultado");

var estado = document.getElementById("restante"); //s
totalEnCajero();
