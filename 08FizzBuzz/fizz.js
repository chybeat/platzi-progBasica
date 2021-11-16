var numeros = 100;
var divisible = false;

function esDivisible(num, divisor) {
	if (num % divisor == 0) {
		return true;
	} else {
		return false;
	}
}
for (i = 1; i <= 100; i++) {
	if (esDivisible(i, 3)) {
		document.write("Fizz");
	}
	if (esDivisible(i, 5)) {
		document.write("Buzz");
	}

	if (!esDivisible(i, 3) && !esDivisible(i, 5)) {
		document.write(i);
	}
	document.write("<br />");
}

/* My Way
function esDivisible(num, divisor) {

    return num % divisor == 0;
}
for (i = 1; i <= 100; i++) {
    var divisible = false;

    if (i % 3 == 0 && i % 5 == 0) {
		text = "FizzBuzz";
	} else if (i % 3 == 0) {
		text = "Fizz";
        divisible = true;
	} else if (i % 5 == 0) {
		text = "Buzz";
        divisible = true;
	} else {
		text = i;
	}
	document.write(text + "<br />");
}
*/
