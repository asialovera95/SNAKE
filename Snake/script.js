const DIM = 20; // costante dimensione campo
var campo = new Array(DIM); // Vettore campo da gioco

var direzione = "dx"; // Direzione snake all'avvio

/* Costanti per colori */
const GRIGIO = "rgb(127, 127, 127)";
const BIANCO = "rgb(255, 255, 255)";
const ROSSO = "rgb(255, 0, 0)";
const BLU = "rgb(0, 0, 255)";

/* POSIZIONE CIBO */
var xCibo, yCibo; // coordinate cibo
var nCibo = 1; // contatore cibo

/* POSIZIONE SNAKE */
var posSn_x = 1; // coordinata x snake
var posSn_y = 1; // coordinata y snake
var coda = new Array(0); // array contenente le posizioni dello snake

// funzione di avvio 
function avvia() {
    initMatrice(); // inizializzazione matrice
    //disegnaMatrice();
    disegnaCampo(); // grafica campo

    // Generare random coordinate x, y del cibo
    generaCibo();

    coda.push(posSn_x + "," + posSn_y); 
    // Coloro testa
    document.getElementById("btn_" + posSn_x + "_" + posSn_y).style.backgroundColor = BLU;  
    muoviSnake();
}

function initMatrice() {
    for (var i = 0; i < DIM; i++) {
        campo[i] = new Array(DIM);
    }
    // inizializzo matrice a 0
    for (var i = 0; i < DIM; i++) {
        for (var j = 0; j < DIM; j++) {
            campo[i][j] = 0;
        }
    } 
    
}
function disegnaCampo() {
    var refBody = document.getElementsByTagName("body")[0];
    var tabella = document.createElement("table");
    var riga, cella, btn;

    refBody.appendChild(tabella);
    tabella.style.margin = "20px auto";
    tabella.style.borderSpacing = "0"; 
    for (var i = 0; i < DIM; i++) {
        riga = document.createElement("tr"); 
        tabella.appendChild(riga);
        for (var j = 0; j < DIM; j++) {
            //Creazione cella
            cella = document.createElement("td");
            cella.style.width = "18px"; 
            riga.appendChild(cella);
            // Creazione pulsanti
            btn = document.createElement("input");
            btn.type = "button"; 
            btn.id = "btn_" + i + "_" + j; 
            btn.style.width = "18px"; 
            btn.style.height = "15px";
            btn.style.backgroundColor = GRIGIO; 
            btn.style.color = BIANCO;

            btn.setAttribute("onClick", "get_coord(this)"); 
            cella.appendChild(btn); 
        }
    }
}
function get_coord(btn) {
    // btn_1_4 -> x: 1 | y: 4
    var vect = btn.id.split("_");
    alert(vect[1] + " " + vect[2]); 
}

function cambiaDirezione(event) {
    var codice = event.keyCode;
    if (codice == 37 && direzione != "dx") {
        direzione = "sx"; 
    }
    if (codice == 38 && direzione != "dw") {
        direzione = "up"; 
    }
    if (codice == 39 && direzione != "sx") {
        direzione = "dx"; 
    }
    if (codice == 40 && direzione != "up") {
        direzione = "dw"; 
    }
}
function generaCibo() {
    xCibo = Math.floor(DIM * Math.random());
    yCibo = Math.floor(DIM * Math.random());
    var ref = document.getElementById("btn_" + xCibo + "_" + yCibo);
    ref.style.backgroundColor = ROSSO;
    campo[xCibo][yCibo] = 2; 
}
function muoviSnake() {
    switch (direzione) {
        case 'dx':
            posSn_y++;
            break;
        case 'sx':
            posSn_y--;
            break;
        case 'up':
            posSn_x--;
            break;
        case 'dw':
            posSn_x++;
            break;
    }
    resettaSnake(); // Cancello campo da gioco
    controllaPareti(); // Controllo spostamento testa

    coda.push(posSn_x + "," + posSn_y);

    controllaCibo(posSn_x, posSn_y); // controllo se mangiato

    stampaSnake(); // ristampo campo da gioco con nuove posizioni snake

    setTimeout("muoviSnake();", 200);
}
function controllaCibo(posX, posY) {
    if (posX == xCibo && posY == yCibo) {
        nCibo = nCibo + 1; 
        generaCibo();
    }
}
function resettaSnake() {
    for (var i = 0; i < DIM; i++) {
        for (var j = 0; j < DIM; j++) {
            if (document.getElementById("btn_" + i + "_" + j).style.backgroundColor == BLU) {
                document.getElementById("btn_" + i + "_" + j).style.backgroundColor = GRIGIO;
            }
        }
    }
}

function stampaSnake() {
    var i; 
    var xy; 
    var cnt = nCibo;

    i = coda.length - 1;
    do {
        xy = coda[i].split(",");
        document.getElementById("btn_" + xy[0] + "_" + xy[1]).style.backgroundColor = BLU;
        i--;
        cnt--;
    } while (cnt != 0);
}
function controllaPareti() {
    if (posSn_y >= DIM || posSn_y < 0 || posSn_x >= DIM || posSn_x < 0) {
        alert("Hai perso!"); 
        return;
    }
}

