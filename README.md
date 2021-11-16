# Basic Programming - Platzi

Each folder has an excercise, unfortunatelly not all JavaScript files has a comment lines to understand the logic, goal, or working functionality for the code. May be the information in this file will be helpful.

---

### 01ero - _Knowing vars_

The only file for this exercise is **primero.html**, and is a an approach to basic HTML, CSS elements. Also for programming shows some variables naming possiblities and HTML write

---

### 02Marte - _Your weight on mars_ (interactive)

**marte.html** ask for user weight and show how much it weighs on Mars. The code (js) uses float variables, the js function to convert strings to integer, multiplication and division.

---

### 03marteJupiter - _Your weight on mars jupiter or ¿any planet?_ (interactive)

**marteJupiter.html**, as 02marte, ask about your weight AND which planet you want to know your weight (mars or jupiter), with a "list" number. In js code I apply concatenation (for strings), and depending of selected planet a conditional statement (if, else if and else).

---

### 04document - _Understanding the DOM in JS_

Files:

1. document.html
1. codigo.js

document.html is about connection of script tag (to add a .js file) and .js file (codigo.js in this case). The codigo.js file only write the url in browser in document. The idea with this code is learn about the DOM( document, navigator and window ) and apperently a little information about objects in js.

---

### 05canvas - _¿How many lines you want to draw?_ (interactive)

Files:

1. dibujo.html
1. codigo.js

dibujo.html contains the structure to let the user set the number of lines to draw a number of lines on canvas (undestand canvas as a space to draw, not the HTML tag).

codigo.js has function to daw a line in the canvas, draw the number of lines user choice and listening events (click and change) to draw lines in canvas tag when user change or click the interface. The commented area has the "while" and "for" cycles refering (not the same) to the 'do while' (I'm choose) cycle to draw lines.

---

### 06flechas - _Draw with arrows, click or your finger_ (interactive)

Files:

1. flechas.html
1. eventos.js

flechas.html contains instruction (in spanish) and basic structure to draw with keyboard arrows, sustained mouse click or touch. For touch and click draw, the code has a fix for scrolled page, and for touch uses three event listeners: touchstart, touchmove and touchend. At the moment (6 November 2021) for touch events in mobile devices requires a passive event listeners (something like "stay alert but not drain the battery") the eventos.js file has the code to fix the console warning.

---

### 07villaPlatzi - _Moving the pig_ (interactive)

Files:

1. villa.html
1. villa.js
1. cerdo.png
1. pollo.png
1. tile.png
1. vaca.png

The js has code:

-   Generate a random number with minimum and maximum limits.
-   Draw the elements in canvas (pig, chickens, cows and tile).
-   Draw any element when the .png was loaded.
-   Used objects for each element (pictures) and the keys (commands) to move a pig.
-   Event listeners for loaded .png and key press.

The goal is move the pig to wherever you want (no limited to canvas size) using WASD or arrow keys.

---

### 08FizzBuzz - _Module operator_

Files:

1. modulo.html
1. fizz.js

The excercise uses the module (%) operator to decide if a number has module or not into from a function. If a number, from 1 to 100, is divisble in 3 a "fizz" text will be shown, or divisible to 5 a "buzz" text. If the number is divible on 3 and 5 "fizzbuzz" text will be shown. If not divisible by 3 or 5 the number will be shown.

---

### 09Pakiman - _A js Class constructor, attributes and methods_

Files:

1. cerdo.png
1. paki.js
1. pakiman.html
1. pakiman.js
1. pollo.png
1. vaca.png

pakiman.js has the class for pakiman, the class has 4 attributes ("imagen", "nombre", "vida", "ataque") and two methods ("hablar" and "mostrar"). The code only shows a colection of pakiman objects using a class method ("mostrar").

---

### 10cajero - _Modify an object data (created from class) to update them using an algorythm_ (interactive)

Files:

1. atm.html
1. billete-5.svg
1. billete-10.svg
1. billete-20.svg
1. billete-50.svg
1. billete-100.svg
1. cajero.js
1. cajero.webp

This ATM use the flowchart at end of page to software logic. Give the minimun amout of banknotes possible, for the requested amount.

_hightlights_: cloneNode, algorithm, balance in console

The js code uses the cloneNode method for image node to show more than one equal node like two bills of same denomination to $200 request. Balance in ATM is logged in browser console when "Extraer" button was clicked and update the amout of banknotes in "caja" (_money reserve_) which is an array of "billete" for each amount (5,10,20,etc).

---

### 11express - _Running a node.js server_

Files:

1. node_modules (folder)
1. package-lock.json
1. package.json
1. servidor.js

The script uses express library and dependecies (installed with npm in node_modules folder), the server simply runs two pages and show a messsage for each one.

To run the server node.js installed is required. In OS console run the command:

`node path/to/servidor.js`

Open browser and navigate to http://127.0.0.1:8989. The las 4 numbers indicate the port, defined in servidor.js with code

`aplicacion.listen(8989)`)

### 12tablasVerdad - _Learning about truth tables with bank transfer example_ (interactive)

Files:

1. vof.html
1. vof.js

_The request:_

In a bank the clients has an account and balance. The customers wants to make a transfer to a destination bank account. The amount to be transferred to the client is 1 million.

The mandatory conditions for transfer:
The client must be verified to be able transfers.
Destiny customer has to be verified
The balance in the account must be greater than amount to be transferred plus transaction costs

    Transaction cost:
    If destination account bank is same as the customer's, transaction cost $0 USD
    If different, the transaction cost is $100 USD
    Transfers are able in hours from 9 to 12 and 15 to 20

The HTML file data changes on interactives like verify an user, transfer money, etc.

Here uses all "techniques" and topics learned in this course to interact and make transfers of money between 4 customers.
