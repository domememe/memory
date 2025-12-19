let prima = null;    //carte coperte
let seconda = null;  
let blocco = false;  // blocca click mentre due carte sono scoperte
function mischia(array) {
    for (let i = 0; i < array.length; i++) {
        let j = Math.floor(Math.random() * array.length);
        [array[i], array[j]] = [array[j], array[i]]; //questo mette la foto di i nel posto di j e la foto j al posto di i, in modo da mischiarli
    }
}
function genera(){
    let d = document.getElementById("difficoltà").value;
    if (d == ""){
        document.getElementById("errore").innerHTML="Errore, inserisci una difficoltà valida";
        return;
    }
    document.getElementById("errore").innerHTML="";
    let colonne = 0;
    let righe = 0; 
    switch (d){
        case "f" : 
            colonne = 2;
            righe = 3;
            break;
        case "m" :
            colonne = 4;
            righe = 2;
            break;
        case "d" : 
            colonne = 4;
            righe = 3;
            break;
    }
    let div = document.getElementById("div");
    div.innerHTML="";
    div.className = "";  //rimuove tutto quello che era stato fatto prima
    if (d == "f") div.classList.add("facile");
    if (d == "m") div.classList.add("media");
    if (d == "d") div.classList.add("difficile");
    let images = [
        "img/albero.jpg",
        "img/anguria.png",
        "img/babbonatale.jpg",
        "img/fragola.jpg",
        "img/mela.jpg",
        "img/pera.avif",
        "img/albero.jpg",
        "img/anguria.png",
        "img/babbonatale.jpg",
        "img/fragola.jpg",
        "img/mela.jpg",
        "img/pera.avif" //ci sono 6 carte uguali alle altre perché devono comparire 2 volte
    ];
    mischia(images); //mischia le carte
    let matrice = [];
    let k = 0;
    for (let i = 0; i < righe; i++) {
        matrice[i] = [];
        for (let j = 0; j < colonne; j++) {
            matrice[i][j] = images[k]; //nella riga i, colonna j, metti l'immagine k
            k++;
        }
    }

    // creazione delle carte usando la matrice
    for (let i = 0; i < righe; i++) {
        for (let j = 0; j < colonne; j++) {
            let img = document.createElement("img");
            img.src = "img/sfondonero.jpg";          // carta coperta
            img.dataset.valore = matrice[i][j];     //salva l'immagine dietro alla sfondo nero su HTML
            img.onclick = function () { 
                if (!blocco) gira(this); //// gira la carta cliccata se blocco non è true
            };
            div.appendChild(img);
        }
    }
}

function gira(carta){
    carta.src = carta.dataset.valore;//mostra la carte

    if (prima == null){//sono al primo click
        prima = carta;//memorizza la carta che hai cliccato
    } else {
        seconda = carta;//memorizza la seconda carta che hai cliccato
        blocco = true;//blocca il programma fino a quando non finisce questo codice
        if (prima.dataset.valore === seconda.dataset.valore){ // carte uguali
            prima = null;    // reset prima carta
            seconda = null;  // reset seconda carta
            blocco = false;
        } else {
            setTimeout(() => {// carte non sono uguali
                prima.src = "img/sfondonero.jpg";
                seconda.src = "img/sfondonero.jpg";
                prima = null;
                seconda = null;
                blocco = false;
            }, 700);//tempo in ms
        }
    }
}