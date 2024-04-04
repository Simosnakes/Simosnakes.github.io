let sfondoMenu;
let portaBluMenu;
let portaGiallaMenu;
let portaRossaMenu;
let percorsoPortaBlu_Gialla;
let percorsoPortaGialla_Rossa;

let omino;
let x_omino;
let y_omino;
let lim_dx;
let lim_sx;
let morto;

let velocita_y;
let gravita = 0.5;
let potenza_salto = 12;

//livello 1
let portaBlu;
let x_portaBlu;
let y_portaBlu;
let x_buco;
let y_buco;
let alt_buco;
let larg_buco;
let muoviBuco;

//livello 2
let portaGialla;
let x_portaGialla;
let y_portaGialla;
let spine;
let x_spine;
let y_spine;
let colpito;

//livello 3
let portaRossa;
let x_portaRossa;
let y_portaRossa;
let iniziato;
let inverti_direz;
let inverti_salto;
let x_spine1;
let y_spine1;
let x_spine2;
let x_spine3;
let scambia;
let contaMorte;
let spineRibaltate;

let sfondo;//sfondo generale
let terreno;
let dissolvenza_menu;
let dissolvenza_menuLivello;
let velocita_dissolvenza;

let menu; //ciclo per il menu

let livelloBlu;
let livelloGiallo;
let livelloRosso;
let pausa;

let colore_cielo;
let colore_pavimento;
let sup;
let sup1;
let sup2;
let numeroLivello;

let larghezzaPorta;
let altezzaPorta;

let minXPorta;
let maxXPorta;
let minYPorta;
let maxYPorta;

let minXOmino;
let maxXOmino;
let minYOmino;
let maxYOmino;

let frecceMovimento;
let tastoInvio;

let tastoHome;
let tastoSkipIndietro;
let tastoContinua;

let clickTheDoor;
let goHere;

let livelloScelto;
let bg;
//let caricamento;

let morti;

function preload(){
    sfondoMenu = loadImage("./img/menu/sfondoMenu.png");
    portaBluMenu = loadImage("./img/menu/portaBluMenu.png");
    portaGiallaMenu = loadImage("./img/menu/portaGiallaMenu.png");
    portaRossaMenu = loadImage("./img/menu/portaRossaMenu.png");
    percorsoPortaBlu_Gialla = loadImage("./img/menu/percorsoPortaBlu-Gialla.png");
    percorsoPortaGialla_Rossa = loadImage("./img/menu/percorsoPortaGialla-Rossa.png");

    frecceMovimento = loadImage("./img/disegnoFrecceMovimento.png");
    tastoInvio = loadImage("./img/tastoInvio.png");

    tastoHome = loadImage("./img/pausa/tastoHome.png");
    tastoContinua = loadImage("./img/pausa/tastoContinua.png");
    //tastoSkipIndietro = loadImage("./img/pausa/tastoSkipIndietro.png");

    clickTheDoor = loadImage("./img/livello3/clickTheDoor.png");
    goHere = loadImage("./img/livello2/goHere.png");

    spineRibaltate = loadImage("./img/livello2/spineRibaltate.png");

    omino = loadImage("./img/omino.png");

    portaBlu = loadImage("./img/livello1/portaBluLivello.png");
    portaGialla = loadImage("./img/livello2/portaGiallaLivello2.png");
    portaRossa = loadImage("./img/livello3/portaRossa.png");

    spine  = loadImage("./img/livello2/spine.png");
    //caricamento = loadImage("./img/caricamentoMorte.gif");
}

function setup(){
    bg = "black"
    createCanvas(1520, 675);
    frameRate(100);
    background(bg);
    menu = true;
    livelloBlu = false;
    livelloGiallo = false;
    livelloRosso = false;
    pausa = false;

    primaEseg = true;
    sup = false;
    sup1 = false;
    sup2 = false;
    muoviBuco = false;

    morto = false;
    colpito = false;

    iniziato = true;
    inverti_direz = true;
    inverti_salto = false;
    scambia = false;

    livelloScelto = null;

    velocita_y = 0;
    sfondo = sfondoMenu;
    x_omino = 110;
    y_omino = 300;
    lim_dx = 1270;
    lim_sx = 110;

    terreno = 300;
    dissolvenza_menu = 30;
    dissolvenza_menuLivello = 255;
    velocita_dissolvenza = 2.5;

    x_portaBlu = 1200;
    y_portaBlu = 300;

    x_portaGialla = 1200;
    y_portaGialla = 290;

    x_portaRossa = 1200;
    y_portaRossa = 290;

    colore_cielo = color(255,255,255);
    colore_pavimento = color(247,158,0);

    contaMorte = 0;
    numeroLivello = 0;
    morti = 0;
}

function draw(){
    if(menu){
        drawMenu();
    }else{
        if(livelloBlu && !pausa){
            livelloPortaBlu();
        }else{
            if(livelloGiallo && !pausa){
                livelloPortaGialla();
            }else{
                if(livelloRosso && !pausa){
                    livelloPortaRossa();
                }
            }
        }
    }
}

function livelloPortaRossa(){
    livelloScelto = "rosso";
    switch(numeroLivello){
        case 0:
            
            if(iniziato){
                x_omino = 330;
                iniziato = false;
            }
            inverti_direz = true;

            x_buco1 = 150;
            y_buco1 = 410;
            larg_buco1 = 200;
            alt_buco1 = 180;

            x_buco2 = 800;
            y_buco2 = 410;
            larg_buco2 = 70;
            alt_buco2 = 180;

            background(sfondo);
            fill(colore_cielo);
            noStroke();
            rect(150, 100, 1200, 480);//cielo

            fill(colore_pavimento);
            noStroke();
            rect(150, 410, 1200, 180);//pavimento

            //buco a sinistra
            fill(colore_cielo);
            noStroke();
            rect(x_buco1, y_buco1, larg_buco1, alt_buco1);

            //buco a destra
            fill(colore_cielo);
            noStroke();
            rect(x_buco2, y_buco2, larg_buco2, alt_buco2);
            
            //scrive il numero  di morti
            textStyle(BOLD);
            textSize(25);
            fill(0,0,0);
            text("MORTI: ", 155, 130)
            text(morti, 250, 130);

            //disegno omiono e porta
            image(omino, x_omino, y_omino);
            image(portaRossa, x_portaRossa, y_portaRossa);

            if(keyIsDown(RIGHT_ARROW)){
                //sposta l'omino a destra
                if(!inverti_direz && x_omino <= lim_dx){//1270
                    x_omino += 3;
                }else{
                    //sposta l'omino a sinistra con comandi invertiti
                    if(inverti_direz && x_omino >= lim_sx){
                        x_omino -= 3;
                    }
                }
            }else{
                if(keyIsDown(LEFT_ARROW)){
                    //sposta l'omino a sinistra
                    if(!inverti_direz && x_omino >= lim_sx){//110
                        x_omino -= 3;
                    }else{
                        //sposta l'omino adestra con comandi invertiti
                        if(inverti_direz && x_omino <= lim_dx){
                            x_omino += 3;
                        }
                    }
                }
            }

            //calcolo gravita
            y_omino = y_omino + velocita_y;

            if(y_omino < terreno){
                velocita_y = velocita_y + gravita;
            }
            else {
                velocita_y = 0;
                y_omino = terreno;
            }

            //controlla il salto
            if(keyIsDown(32) || keyIsDown(UP_ARROW) && !morto){//32 = barra spaziatrice
                if(y_omino >= terreno){
                    velocita_y = -potenza_salto;
                }
            }

            //calcola i limiti dell'omino
            minXOmino = x_omino;
            maxXOmino = x_omino + omino.width - 70;

            //controlla che l'omino non sia caduto nel buco di sinistra o destra
            if(y_omino == 300 && (maxXOmino >= x_buco1 && minXOmino <= x_buco1 + larg_buco1 - 60)){
                terreno = 470;
                lim_sx = x_buco1;
                lim_dx = x_buco1 + larg_buco1 - 100;
                morto = false;

                //fa cadere l'omino
                if(y_omino < 470){
                    y_omino += 0.04;
                }
            }

            if(y_omino == 300 && (maxXOmino >= x_buco2 && minXOmino <= x_buco2 + larg_buco2 - 60)){
                terreno = 470;
                lim_sx = x_buco2;
                lim_dx = x_buco2 + larg_buco2 - 100;
                morto = false;

                if(y_omino < 470){
                    y_omino += 0.04;
                }
            }

            //quando arriva al  fondo del buco resetta le impostazioni
            if(y_omino == 470){
                livelloRosso = false;
                morto = true;

                image(tastoInvio, 600, 150);

                terreno = 300;
                dissolvenza_menu = 50;
                x_omino = 330;
                y_omino = 300;
                lim_dx = 1270;
                lim_sx = 110;
                
                //numeroLivello = 0;
            }

            //controlla che l'omino sia entrato nella porta
            entraInPorta(portaRossa, x_portaRossa, y_portaRossa);
            break;
        case 1:
            if(iniziato){
                x_omino = 330;
                iniziato = false;
                x_spine1 = 500;
                y_spine1 = 310;

                x_spine2 = 700;

                x_spine3 = 900;
                gravita = 0.3;
            }

            x_buco1 = 150;
            y_buco1 = 410;
            larg_buco1 = 200;
            alt_buco1 = 180;

            inverti_direz = false;
            inverti_salto = true;

            background(sfondo);
            fill(colore_cielo);
            noStroke();
            rect(150, 100, 1200, 480);//cielo

            fill(colore_pavimento);
            noStroke();
            rect(150, 410, 1200, 180);//pavimento

            fill(colore_cielo);
            noStroke();
            rect(x_buco1, y_buco1, larg_buco1, alt_buco1);
            
            image(spine, x_spine1, y_spine1);
            image(spine, x_spine2, y_spine1);
            image(spine, x_spine3, y_spine1);

            textStyle(BOLD);
            textSize(25);
            fill(0,0,0);
            text("MORTI: ", 155, 130)
            text(morti, 250, 130);

            image(omino, x_omino, y_omino);
            image(portaRossa, x_portaRossa, y_portaRossa);

            if(keyIsDown(RIGHT_ARROW)){
                //sposta l'omino a destra
                if(!inverti_direz && x_omino <= lim_dx){//1270
                    x_omino += 3;
                }else{
                    //sposta l'omino a sinistra con comandi invertiti
                    if(inverti_direz && x_omino >= lim_sx){
                        x_omino -= 3;
                    }
                }
            }else{
                if(keyIsDown(LEFT_ARROW)){
                    //sposta l'omino a sinistra
                    if(!inverti_direz && x_omino >= lim_sx){//110
                        x_omino -= 3;
                    }else{
                        //sposta l'omino adestra con comandi invertiti
                        if(inverti_direz && x_omino <= lim_dx){
                            x_omino += 3;
                        }
                    }
                }
            }

            //limiti omino
            minXOmino = x_omino;
            maxXOmino = x_omino + omino.width - 70;
            
            //controllo buco iniziale prima del salto per evitare bug delle spine che cadono
            if(y_omino >= 300 && (maxXOmino >= x_buco1 && minXOmino <= x_buco1 + larg_buco1 - 60)){
                terreno = 470;
                lim_sx = x_buco1;
                lim_dx = x_buco1 + larg_buco1 - 100;
                morto = false;
                inverti_salto = false;
                if(y_omino < 470){
                    y_omino += 0.04;
                }
            }
            //controllo se il cmando del salto è invertito in tal caso faccio spostare le spine e non l'omino
            if(!inverti_salto){
                y_omino = y_omino + velocita_y;

                if(y_omino < terreno){
                    velocita_y = velocita_y + gravita;
                }else {
                    velocita_y = 0;
                    y_omino = terreno;
                }
            }else{
                if(inverti_salto){
                    y_spine1 = y_spine1 + velocita_y;
    
                    if(y_spine1 < terreno){
                        velocita_y = velocita_y + gravita;
                    }else {
                        velocita_y = 0;
                        y_spine1 = 310;
                    }
                }
            }

            //controllo se la frecciain su o la barra spaziatrice è premuta
            if(keyIsDown(32) || keyIsDown(UP_ARROW) && !morto){//32 = barra spaziatrice
                if(y_omino >= terreno && !inverti_salto){
                    velocita_y = -potenza_salto;
                }else{
                    if(y_spine1 >= 310 && inverti_salto){
                        velocita_y = -potenza_salto;
                    }
                }
            }

            //controllo se l'omino entra in contatto con le spine
            if((y_spine1 > omino.height + 85 && y_spine1 <= 310) && (maxXOmino >= x_spine1 && minXOmino <= x_spine1 + 50)){
                morto = false;
                colpito = true;
            }

            if((y_spine1 > omino.height + 85 && y_spine1 <= 310) && (maxXOmino >= x_spine2 && minXOmino <= x_spine2 + 50)){
                morto = false;
                colpito = true;
            }

            if((y_spine1 > omino.height + 85 && y_spine1 <= 310) && (maxXOmino >= x_spine3 && minXOmino <= x_spine3 + 50)){
                morto = false;
                colpito = true;
            }

            //se l'omino viene colpito resetto le variabili
            if(colpito || y_omino == 470){
                livelloRosso = false;
                morto = true;

                image(tastoInvio, 600, 150);

                terreno = 300;
                dissolvenza_menu = 50;
                x_omino = 330;
                y_omino = 300;
                lim_dx = 1270;
                lim_sx = 110;
            }

            entraInPorta(portaRossa, x_portaRossa, y_portaRossa);

            break;
        
        case 2:
            if(iniziato){
                x_omino = 330;
                iniziato = false;
                x_spine1 = 500;
                y_spine1 = 310;

                x_spine2 = 700;

                x_spine3 = 900;
                gravita = 0.55;
            }

            x_buco1 = 150;
            y_buco1 = 410;
            larg_buco1 = 200;
            alt_buco1 = 180;

            inverti_direz = true;
            inverti_salto = false;

            background(sfondo);
            fill(colore_cielo);
            noStroke();
            rect(150, 100, 1200, 480);//cielo

            fill(colore_pavimento);
            noStroke();
            rect(150, 410, 1200, 180);//pavimento

            //disegno il buco a sinistra
            fill(colore_cielo);
            noStroke();
            rect(x_buco1, y_buco1, larg_buco1, alt_buco1);
            
            //disegno le spine
            image(spine, x_spine1, y_spine1);
            image(spine, x_spine2, y_spine1);
            image(spine, x_spine3, y_spine1);

            //scrivo la scritta che tiene conto delle morti
            textStyle(BOLD);
            textSize(25);
            fill(0,0,0);
            text("MORTI: ", 155, 130)
            text(morti, 250, 130);

            image(omino, x_omino, y_omino);
            image(portaRossa, x_portaRossa, y_portaRossa);

            if(keyIsDown(RIGHT_ARROW)){
                //sposta l'omino a destra
                if(!inverti_direz && x_omino <= lim_dx){//1270
                    x_omino += 3;
                }else{
                    //sposta l'omino a sinistra con comandi invertiti
                    if(inverti_direz && x_omino >= lim_sx){
                        x_omino -= 3;
                    }
                }
            }else{
                if(keyIsDown(LEFT_ARROW)){
                    //sposta l'omino a sinistra
                    if(!inverti_direz && x_omino >= lim_sx){//110
                        x_omino -= 3;
                    }else{
                        //sposta l'omino adestra con comandi invertiti
                        if(inverti_direz && x_omino <= lim_dx){
                            x_omino += 3;
                        }
                    }
                }
            }

            minXOmino = x_omino;
            maxXOmino = x_omino + omino.width - 70;
            
            //controllo buco iniziale prima del salto per evitare bug delle spine che cadono
            if(y_omino >= 300 && (maxXOmino >= x_buco1 && minXOmino <= x_buco1 + larg_buco1 - 60)){
                terreno = 470;
                lim_sx = x_buco1;
                lim_dx = x_buco1 + larg_buco1 - 100;
                morto = false;
                inverti_salto = false;
                if(y_omino < 470){
                    y_omino += 0.04;
                }
            }
            //controllo se far saltare l'omino o le spine
            if(inverti_salto == false){
                y_omino = y_omino + velocita_y;

                if(y_omino <= terreno){
                    velocita_y = velocita_y + gravita;
                }else {
                    velocita_y = 0;
                    y_omino = terreno;
                }
            }else{
                if(inverti_salto){
                    y_spine1 = y_spine1 + velocita_y;
    
                    if(y_spine1 < terreno){
                        velocita_y = velocita_y + gravita;
                    }else {
                        velocita_y = 0;
                        y_spine1 = 310;
                    }
                }
            }
            //controllo se la barra spaziatrice è premuta
            if(keyIsDown(32) || keyIsDown(UP_ARROW) && !morto){//32 = barra spaziatrice
                if(y_omino >= terreno && !inverti_salto){
                    velocita_y = -potenza_salto;
                }else{
                    if(y_spine1 >= 310 && inverti_salto){
                        velocita_y = -potenza_salto;
                    }
                }
            }

            //controllo che l'omino non sia entrato a contatto con le spine
            if(y_omino == 300 && (maxXOmino >= x_spine1 && minXOmino <= x_spine1 + 50)){
                morto = false;
                colpito = true;
            }

            if(y_omino == 300 && (maxXOmino >= x_spine2 && minXOmino <= x_spine2 + 50)){
                morto = false;
                colpito = true;
            }

            if(y_omino == 300 && (maxXOmino >= x_spine3 && minXOmino <= x_spine3 + 50)){
                morto = false;
                colpito = true;
            }

            //se è entrato in contatto resetto le variabili
            if(colpito || y_omino == 470){
                livelloRosso = false;
                morto = true;

                image(tastoInvio, 600, 150);

                terreno = 300;
                dissolvenza_menu = 50;
                x_omino = 330;
                y_omino = 300;
                lim_dx = 1270;
                lim_sx = 110;
            }

            //controllo che se l'omino è entrato nella porta
            entraInPorta(portaRossa, x_portaRossa, y_portaRossa);
            break;
        
        case 3:
            if(iniziato){
                x_omino = 310;
                iniziato = false;
                x_spine1 = 500;
                y_spine1 = 310;
                x_spine2 = 580;
                x_spine3 = 660;
                x_spine4 = 740;
            }

            x_buco1 = 150;
            y_buco1 = 410;
            larg_buco1 = 200;
            alt_buco1 = 180;

            inverti_direz = false;
            inverti_salto = false;

            background(sfondo);
            fill(colore_cielo);
            noStroke();
            rect(150, 100, 1200, 480);//cielo

            fill(colore_pavimento);
            noStroke();
            rect(150, 410, 1200, 180);//pavimento

            fill(colore_cielo);
            noStroke();
            rect(x_buco1, y_buco1, larg_buco1, alt_buco1);

            //disegno le spine
            image(spine, x_spine1, y_spine1);
            image(spine, x_spine2, y_spine1);
            image(spine, x_spine3, y_spine1);
            image(spine, x_spine4, y_spine1);

            //disegno la scritta che tiene traccia delle morti
            textStyle(BOLD);
            textSize(25);
            fill(0,0,0);
            text("MORTI: ", 155, 130)
            text(morti, 250, 130);

            //controllo se le morti del livello sono maggiori o uguali a tre
            if(contaMorte >= 3){
                //se è vero scrivo il suggerimento
                image(clickTheDoor, 1200, 400);
            }
            image(omino, x_omino, y_omino);
            image(portaRossa, x_portaRossa, y_portaRossa);

            if(keyIsDown(RIGHT_ARROW)){
                //sposta l'omino a destra
                if(!inverti_direz && x_omino <= lim_dx){//1270
                    x_omino += 3;
                }else{
                    //sposta l'omino a sinistra con comandi invertiti
                    if(inverti_direz && x_omino >= lim_sx){
                        x_omino -= 3;
                    }
                }
            }else{
                if(keyIsDown(LEFT_ARROW)){
                    //sposta l'omino a sinistra
                    if(!inverti_direz && x_omino >= lim_sx){//110
                        x_omino -= 3;
                    }else{
                        //sposta l'omino adestra con comandi invertiti
                        if(inverti_direz && x_omino <= lim_dx){
                            x_omino += 3;
                        }
                    }
                }
            }
            
            //calcola la gravità
            y_omino = y_omino + velocita_y;

            if(y_omino <= terreno){
                velocita_y = velocita_y + gravita;
            }else {
                velocita_y = 0;
                y_omino = terreno;
            }

            //controllo se la barra spaziatrice o la freccia su sono premuti
            if(keyIsDown(32) || keyIsDown(UP_ARROW) && !morto && !scambia){//32 = barra spaziatrice
                if(y_omino >= terreno && !inverti_salto){
                    velocita_y = -potenza_salto;
                }else{
                    if(y_spine1 >= 310 && inverti_salto){
                        velocita_y = -potenza_salto;
                    }
                }
            }
            //calcolo i limiti dell'omino
            minXOmino = x_omino;
            maxXOmino = x_omino + omino.width - 70;

            //controllo che l'omino non sia caduto nel buco
            if(y_omino >= 300 && (maxXOmino >= x_buco1 && minXOmino <= x_buco1 + larg_buco1 - 60)){
                terreno = 470;
                lim_sx = x_buco1;
                lim_dx = x_buco1 + larg_buco1 - 100;
                morto = false;
                inverti_salto = false;
                if(y_omino < 470){
                    y_omino += 0.04;
                }
            }
            //controllo che l'omino non sia entrato a contatto con le spine
            if(y_omino == 300 && (maxXOmino > x_spine1 && minXOmino < x_spine4 + 50)){
                morto = false;
                colpito = true;
            }

            //se l'omino e entrato in contatto con le spine o è caduto nel buco resetto le variabili
            if(colpito || y_omino == 470){
                livelloRosso = false;
                morto = true;

                image(tastoInvio, 600, 150);

                terreno = 300;
                dissolvenza_menu = 50;
                x_omino = 330;
                y_omino = 300;
                lim_dx = 1270;
                lim_sx = 110;
                x_portaRossa = 1200;
                y_portaRossa = 290;

                contaMorte += 1;

            }

            //controllo che l'omino sia entrato in porta
            entraInPorta(portaRossa, x_portaRossa, y_portaRossa);

            break;
        
        case 4:
            if(iniziato){
                x_omino = 320;
                iniziato = false;
            }

            x_buco1 = 150;
            y_buco1 = 410;
            larg_buco1 = 200;
            alt_buco1 = 180;

            x_buco2 = 450;
            larg_buco2 = 700;

            inverti_direz = false;
            inverti_salto = false;

            background(sfondo);
            fill(colore_cielo);
            noStroke();
            rect(150, 100, 1200, 480);//cielo

            fill(colore_pavimento);
            noStroke();
            rect(150, 410, 1200, 180);//pavimento

            //disegno il buco a sinistra
            fill(colore_cielo);
            noStroke();
            rect(x_buco1, y_buco1, larg_buco1, alt_buco1);

            //disegno i lbuco centrale
            fill(colore_cielo);
            noStroke();
            rect(x_buco2, y_buco1, larg_buco2, alt_buco1);

            //disegno la scritta che tiene conto delle morti
            textStyle(BOLD);
            textSize(25);
            fill(0,0,0);
            text("MORTI: ", 155, 130)
            text(morti, 250, 130);

            image(omino, x_omino, y_omino);
            image(portaRossa, x_portaRossa, y_portaRossa);

            if(keyIsDown(RIGHT_ARROW)){
                //sposta l'omino a destra
                if(!inverti_direz && x_omino <= lim_dx){//1270
                    x_omino += 3;
                }
            }else{
                if(keyIsDown(LEFT_ARROW)){
                    //sposta l'omino a sinistra
                    if(!inverti_direz && x_omino >= lim_sx){//110
                        x_omino -= 3;
                    }
                }
            }
            
            //calcola la gravità
            y_omino = y_omino + velocita_y;

            if(y_omino <= terreno){
                velocita_y = velocita_y + gravita;
            }else {
                velocita_y = 0;
                y_omino = terreno;
            }

            //controllo che la barra spaziatrice o la freccia in su siano premuti
            if(keyIsDown(32) || keyIsDown(UP_ARROW) && !morto && !scambia){//32 = barra spaziatrice
                if(y_omino >= terreno && !inverti_salto){
                    velocita_y = -potenza_salto;
                }else{
                    if(y_spine1 >= 310 && inverti_salto){
                        velocita_y = -potenza_salto;
                    }
                }
            }

            //calcolo i limiti dell'omino
            minXOmino = x_omino;
            maxXOmino = x_omino + omino.width - 70;

            //controllo che l'omino non sia caduto in uno dei buchi
            if(y_omino >= 300 && (maxXOmino >= x_buco1 && minXOmino <= x_buco1 + larg_buco1 - 60)){
                terreno = 400;
                if(y_omino < 400 ){
                    y_omino += 0.04;
                }
            }

            //controllo che l'omino entri nella posizione che lo porta dalla porta
            if(y_omino == 400 && (maxXOmino >= x_buco1 * 2 && minXOmino <= x_buco1 + larg_buco1 - 60)){
                y_omino = 150;
                x_omino = 1120;
                terreno = 300;
            }

            if(y_omino >= 300 && (maxXOmino >= x_buco2 && minXOmino <= x_buco2 + larg_buco2 - 60)){
                terreno = 470;
                lim_sx = x_buco1;
                lim_dx = x_buco1 + larg_buco1 - 100;
                morto = false;
                if(y_omino < 470){
                    y_omino += 0.04;
                }
            }

            //se è caduto nel buco resetto le varibili
            if(y_omino == 470){
                livelloRosso = false;
                morto = true;

                image(tastoInvio, 600, 150);

                terreno = 300;
                dissolvenza_menu = 50;
                x_omino = 330;
                y_omino = 300;
                lim_dx = 1270;
                lim_sx = 110;
                x_portaRossa = 1200;
                y_portaRossa = 290;

                contaMorte += 1;

            }

            //controllo se l'omino è entrato nella porta
            entraInPorta(portaRossa, x_portaRossa, y_portaRossa);
            break;
    }

}

function livelloPortaGialla(){
    livelloScelto = "giallo";
    switch(numeroLivello){
        case 0:
            if(!sup){
                x_spine = 500;
                y_spine = 310;
            }
            background(sfondo);
            fill(colore_cielo);
            noStroke();
            rect(150, 100, 1200, 480);//cielo

            fill(colore_pavimento);
            noStroke();
            rect(150, 410, 1200, 180);//pavimento
            
            //disegno la scritta che tiene traccia delle morti
            textStyle(BOLD);
            textSize(25);
            fill(0,0,0);
            text("MORTI: ", 155, 130)
            text(morti, 250, 130);

            image(omino, x_omino, y_omino);
            image(portaGialla, x_portaGialla, y_portaGialla);

            //disegno le spine
            image(spine, x_spine, y_spine);

            if(keyIsDown(RIGHT_ARROW)){
                //sposta l'omino a destra
                if(x_omino <= lim_dx){//1270
                    x_omino += 3;
                }
            }else{
                if(keyIsDown(LEFT_ARROW)){
                    //sposta l'omino a sinistra
                    if(x_omino >= lim_sx){//110
                        x_omino -= 3;
                    }
                }
            }

            //calcolo gravità
            y_omino = y_omino + velocita_y;

            if(y_omino < terreno){
                velocita_y = velocita_y + gravita;
            }
            else {
                velocita_y = 0;
                y_omino = terreno;
            }

            //controllo se la barra spaziatrice o la freccia su sono premuti
            if(keyIsDown(32) || keyIsDown(UP_ARROW) && !morto){//32 = barra spaziatrice
                if(y_omino >= terreno){
                    velocita_y = -potenza_salto;
                }
            }

            //calcolo limiti omino
            minXOmino = x_omino;
            maxXOmino = x_omino + omino.width - 70;

            //controllo che l'omino sia entrato nella zona di attivazione per far spostare le spine in avanti
            if((maxXOmino < x_spine - 20 &&  minXOmino > x_spine - 100) || sup){
                sup  = true;
                if(x_spine <= 550){
                    x_spine += 3;
                    
                }
            }

            //controllo che l'omino non sia entrato a contatto con le spine
            if(y_omino == 300 && (maxXOmino >= x_spine && minXOmino <= x_spine + 50)){
                terreno = 470;
                lim_sx = x_buco - 20;
                lim_dx = x_buco + larg_buco - 100;
                morto = false;

                colpito = true;

            }

            //se l'omino è stato colpito resetto le variabili
            if(colpito){
                livelloGiallo = false;
                sup = false;
                morto = true;

                image(tastoInvio, 600, 150);

                terreno = 300;
                dissolvenza_menu = 50;
                x_omino = 110;
                y_omino = 300;
                lim_dx = 1270;
                lim_sx = 110;
            }

            //controllo se l'omino è entrato nella porta
            entraInPorta(portaGialla, x_portaGialla, y_portaGialla);
            break;
        case 1:
            if(!sup){
                x_spine = 500;
                y_spine = 310;
            }
            background(sfondo);
            fill(colore_cielo);
            noStroke();
            rect(150, 100, 1200, 480);//cielo

            fill(colore_pavimento);
            noStroke();
            rect(150, 410, 1200, 180);//pavimento
            
            //disegno la scritta che tiene traccia delle morti
            textStyle(BOLD);
            textSize(25);
            fill(0,0,0);
            text("MORTI: ", 155, 130)
            text(morti, 250, 130);

            image(omino, x_omino, y_omino);
            image(portaGialla, x_portaGialla, y_portaGialla);

            //disegno le spine
            image(spine, x_spine, y_spine);

            if(keyIsDown(RIGHT_ARROW)){
                //sposta l'omino a destra
                if(x_omino <= lim_dx){//1270
                    x_omino += 3;
                }
            }else{
                if(keyIsDown(LEFT_ARROW)){
                    //sposta l'omino a sinistra
                    if(x_omino >= lim_sx){//110
                        x_omino -= 3;
                    }
                }
            }

            //calcolo la gravità
            y_omino = y_omino + velocita_y;

            if(y_omino < terreno){
                velocita_y = velocita_y + gravita;
            }
            else {
                velocita_y = 0;
                y_omino = terreno;
            }

            //controllo che la barra spaziatrice o la freccia in su siano premuti
            if(keyIsDown(32) || keyIsDown(UP_ARROW) && !morto){//32 = barra spaziatrice
                if(y_omino >= terreno){
                    velocita_y = -potenza_salto;
                }
            }

            //colcolo dei limiti dell'omino
            minXOmino = x_omino;
            maxXOmino = x_omino + omino.width - 70;

            //controllo se l'omino è entrato nella zona di attivazione per far spostare le spine in dientro
            if((maxXOmino < x_spine - 20 &&  minXOmino > x_spine - 100) || sup){
                sup  = true;
                if(x_spine >= 450){
                    x_spine -= 3;
                    
                }
            }

            //controllo se l'omino è entrato a contatto con le spine
            if(y_omino == 300 && (maxXOmino >= x_spine && minXOmino <= x_spine + 50)){

                morto = false;

                colpito = true;

            }

            //se l'omino è toccato le spine resetto le variabili
            if(colpito){
                livelloGiallo = false;
                sup = false;
                morto = true;

                image(tastoInvio, 600, 150);

                terreno = 300;
                dissolvenza_menu = 50;
                x_omino = 110;
                y_omino = 300;
                lim_dx = 1270;
                lim_sx = 110;
            }

            //controllo se l'omino è entrato a contatto con la porta
            entraInPorta(portaGialla, x_portaGialla, y_portaGialla);

            break;
        
        case 2:
            if(!sup && !sup1 && !sup2){
                x_spine = 500;
                y_spine = 310;
                x_spine1 = 700;
                x_spine2 = 1000;
                y_spine2 = 310;
            }
            background(sfondo);
            fill(colore_cielo);
            noStroke();
            rect(150, 100, 1200, 480);//cielo

            fill(colore_pavimento);
            noStroke();
            rect(150, 410, 1200, 180);//pavimento
            
            //disegno la scritta che tiene conto delle morti
            textStyle(BOLD);
            textSize(25);
            fill(0,0,0);
            text("MORTI: ", 155, 130)
            text(morti, 250, 130);

            image(omino, x_omino, y_omino);
            image(portaGialla, x_portaGialla, y_portaGialla);
            
            //disegno le spine
            image(spine, x_spine, y_spine);
            image(spine, x_spine1, y_spine);
            image(spine, x_spine2, y_spine2);

            if(keyIsDown(RIGHT_ARROW)){
                //sposta l'omino a destra
                if(x_omino <= lim_dx){//1270
                    x_omino += 3;
                }
            }else{
                if(keyIsDown(LEFT_ARROW)){
                    //sposta l'omino a sinistra
                    if(x_omino >= lim_sx){//110
                        x_omino -= 3;
                    }
                }
            }

            //calcolo la gravità
            y_omino = y_omino + velocita_y;

            if(y_omino < terreno){
                velocita_y = velocita_y + gravita;
            }
            else {
                velocita_y = 0;
                y_omino = terreno;
            }

            //controllo che la barra spaziatrice o la freccia su siano premuti
            if(keyIsDown(32) || keyIsDown(UP_ARROW) && !morto){//32 = barra spaziatrice
                if(y_omino >= terreno){
                    velocita_y = -potenza_salto;
                }
            }

            //calcolo limiti omino
            minXOmino = x_omino;
            maxXOmino = x_omino + omino.width - 70;

            //controllo se l'omino è entrato a nella zona di attivazione per far muovere le spine in dietro
            if((maxXOmino < x_spine - 20 && minXOmino > x_spine - 100) || sup){
                sup  = true;
                if(x_spine >= 450){
                    x_spine -= 3;
                    
                }
            }

            //controllo se l'omino è entrato a contatto con le prime spine
            if(y_omino == 300 && (maxXOmino >= x_spine && minXOmino <= x_spine + 50)){

                morto = false;

                colpito = true;

            }

            //controllo se l'omino è entrato a nella zona di attivazione per far muovere le spine in avanti
            if((maxXOmino < x_spine1 - 20 && minXOmino > x_spine1 - 100) || sup1){
                sup1 = true;
                if(x_spine1 <= 750){
                    x_spine1 += 3;
                    
                }
            }
            //controllo se l'omino è entrato a contatto con le seconde spine
            if(y_omino == 300 && (maxXOmino >= x_spine1 && minXOmino <= x_spine1 + 50)){
                morto = false;

                colpito = true;

            }

            //controllo se l'omino è entrato a nella zona di attivazione per far muovere le spine in alto
            if((maxXOmino < x_spine2 - 20 && minXOmino > x_spine2 - 100) || sup2){
                sup2 = true;
                
                if(y_spine2 >= 180){
                    y_spine2 -= 2;
                    print("ciao");
                }
            }

            //controllo se l'omino è entrato a contatto con le terze spine
            if(((y_omino - omino.height >= y_spine2) || (y_spine2 <= 310 && y_spine2 > omino.height + 85)) && (maxXOmino >= x_spine2 && minXOmino <= x_spine2 + 50)){
                morto = false;

                colpito = true;

            }

            //se l'omino ha toccato le spine resertto le variabili
            if(colpito){
                livelloGiallo = false;
                sup = false;
                morto = true;

                image(tastoInvio, 600, 150);

                terreno = 300;
                dissolvenza_menu = 50;
                x_omino = 110;
                y_omino = 300;
                lim_dx = 1270;
                lim_sx = 110;
            }

            //controllo se l'omino è entrato a contatto con la porta
            entraInPorta(portaGialla, x_portaGialla, y_portaGialla);

            break;
        
        case 3:
            x_spine = 400;
            y_spine = 310;
            x_spine1 = 480;

            x_spine2 = 760;
            x_spine3 = 840;

            x_spineRibaltate1 = 760;
            x_spineRibaltate2 = 840;
            y_spineRibaltate1 = 70;
            gravita = 0.33;

            background(sfondo);
            fill(colore_cielo);
            noStroke();
            rect(150, 100, 1200, 480);//cielo

            fill(colore_pavimento);
            noStroke();
            rect(150, 410, 1200, 180);//pavimento
            
            //disegno la scritta che tiene traccia delle morit
            textStyle(BOLD);
            textSize(25);
            fill(0,0,0);
            text("MORTI: ", 155, 130)
            text(morti, 250, 130);

            image(omino, x_omino, y_omino);
            image(portaGialla, x_portaGialla, y_portaGialla);
            
            //disegno le spine sul pavimento
            image(spine, x_spine, y_spine);
            image(spine, x_spine1, y_spine);
            image(spine, x_spine2, y_spine);
            image(spine, x_spine3, y_spine);

            //image(goHere, 800, 400);

            //disegno le spine sul soffitto
            image(spineRibaltate, x_spineRibaltate1, y_spineRibaltate1);
            image(spineRibaltate, x_spineRibaltate2, y_spineRibaltate1);

            if(keyIsDown(RIGHT_ARROW)){
                //sposta l'omino a destra
                if(x_omino <= lim_dx){//1270
                    x_omino += 3;
                }
            }else{
                if(keyIsDown(LEFT_ARROW)){
                    //sposta l'omino a sinistra
                    if(x_omino >= lim_sx){//110
                        x_omino -= 3;
                    }
                }
            }

            //calcolo la gravità
            y_omino = y_omino + velocita_y;

            if(y_omino < terreno){
                velocita_y = velocita_y + gravita;
            }
            else {
                velocita_y = 0;
                y_omino = terreno;
            }

            //controllo che la barra spaziatrice o la freccia su siano premuti
            if(keyIsDown(32) || keyIsDown(UP_ARROW) && !morto){//32 = barra spaziatrice
                if(y_omino >= terreno){
                    velocita_y = -potenza_salto;
                }
            }

            //calcollo i limiti dell'omino
            minXOmino = x_omino;
            maxXOmino = x_omino + omino.width - 70;

            //controllo che l'omino non entri a contatto con le spine sul pavimento
            if(y_omino == 300 && (maxXOmino >= x_spine && minXOmino <= x_spine + 140)){

                morto = false;

                colpito = true;

            }

            //controllo se l'omino entra a contatto con le spine sul sffitto
            if((y_omino > y_spineRibaltate1 && y_omino <= y_spineRibaltate1 + 30) && (maxXOmino >= x_spineRibaltate1 && minXOmino <= x_spineRibaltate1 + 140)){
                
                morto = false;

                colpito = true;
            }

            //se l'omino tocca le spine resetto le variabili
            if(colpito){
                livelloGiallo = false;
                sup = false;
                morto = true;

                image(tastoInvio, 600, 150);

                terreno = 300;
                dissolvenza_menu = 50;
                x_omino = 110;
                y_omino = 300;
                lim_dx = 1270;
                lim_sx = 110;
            }

            //controllo che l'omino entri a contatto con la porta
            entraInPorta(portaGialla, x_portaGialla, y_portaGialla);
            break;
        
        case 4:
            x_spine = 400;
            y_spine = 310;
            x_spine1 = 480;

            x_spine2 = 760;
            x_spine3 = 840;

            x_spineRibaltate1 = 760;
            x_spineRibaltate2 = 840;
            y_spineRibaltate1 = 70;
            gravita = 0.33;

            background(sfondo);
            fill(colore_cielo);
            noStroke();
            rect(150, 100, 1200, 480);//cielo

            fill(colore_pavimento);
            noStroke();
            rect(150, 410, 1200, 180);//pavimento
            
            //disegno la scritta che tiene traccia dfelle morti
            textStyle(BOLD);
            textSize(25);
            fill(0,0,0);
            text("MORTI: ", 155, 130)
            text(morti, 250, 130);

            image(omino, x_omino, y_omino);
            image(portaGialla, x_portaGialla, y_portaGialla);
            
            //disegno le spine sul pavimento
            image(spine, x_spine, y_spine);
            image(spine, x_spine1, y_spine);
            image(spine, x_spine2, y_spine);
            image(spine, x_spine3, y_spine);

            image(goHere, 800, 15);

            //disegno le spine sul soffitto
            image(spineRibaltate, x_spineRibaltate1, y_spineRibaltate1);
            image(spineRibaltate, x_spineRibaltate2, y_spineRibaltate1);

            if(keyIsDown(RIGHT_ARROW)){
                //sposta l'omino a destra
                if(x_omino <= lim_dx){//1270
                    x_omino += 3;
                }
            }else{
                if(keyIsDown(LEFT_ARROW)){
                    //sposta l'omino a sinistra
                    if(x_omino >= lim_sx){//110
                        x_omino -= 3;
                    }
                }
            }

            //calcolo la gravità
            y_omino = y_omino + velocita_y;

            if(y_omino < terreno){
                velocita_y = velocita_y + gravita;
            }
            else {
                velocita_y = 0;
                y_omino = terreno;
            }

            //controllo che la barra spaziatrice o la freccia su siano premuti
            if(keyIsDown(32) || keyIsDown(UP_ARROW) && !morto){//32 = barra spaziatrice
                if(y_omino >= terreno){
                    velocita_y = -potenza_salto;
                }
            }

            //calcollo i limiti dell'omino
            minXOmino = x_omino;
            maxXOmino = x_omino + omino.width - 70;
            minYOmino = y_omino;
            maxYOmino = y_omino + omino.height - 25;

            //calcolo limiti della porta
            minXPorta = x_portaGialla;
            maxXPorta = x_portaGialla + larghezzaPorta;
            minYPorta = y_portaGialla;
            maxYPorta = y_portaGialla + altezzaPorta;

            //controllo se l'omino entra a contatto con le spine sul pavimento
            if(y_omino == 300 && (maxXOmino >= x_spine && minXOmino <= x_spine + 140)){

                morto = false;

                colpito = true;

            }
            //controllo se l'omino entra in contatto con la porta in tal caso lo faccio morire
            if((maxXOmino >= minXPorta && minXOmino <= maxXPorta) && (maxYOmino >= minYPorta && minYOmino <= maxYPorta)){
                morto = false;

                colpito = true;
            }

            //se l'omino tocca le spine o la porta lo faccio morire
            if(colpito){
                livelloGiallo = false;
                sup = false;
                morto = true;

                image(tastoInvio, 600, 150);

                terreno = 300;
                dissolvenza_menu = 50;
                x_omino = 110;
                y_omino = 300;
                lim_dx = 1270;
                lim_sx = 110;
            }

            //controllo che l'omino tocchi le spine sul soffitto
            entraInPorta(spineRibaltate, x_spineRibaltate1, y_spineRibaltate1 - 100);
            
            break;
    }
     
}

function livelloPortaBlu(){
    livelloScelto = "blu";
    switch(numeroLivello){
        case 0:
            if(!sup){
                x_buco = 500;
                y_buco = 410;
                alt_buco = 220;
                larg_buco = 70;
            }

            background(sfondo);
            fill(colore_cielo);
            noStroke();
            //rect(30, 20, 55, 55);
            rect(150, 100, 1200, 480);//cielo

            fill(colore_pavimento);
            noStroke();
            rect(150, 410, 1200, 180);//pavimento

            //disegno le freccie per far capire i tsti per muoversi
            image(frecceMovimento, 200, 400);
            
            //disegno la scritta che tiene traccia delle morti
            textStyle(BOLD);
            textSize(25);
            fill(0,0,0);
            text("MORTI: ", 155, 130)
            text(morti, 250, 130);

            image(omino, x_omino, y_omino);
            image(portaBlu, x_portaBlu, y_portaBlu);           

            if(keyIsDown(RIGHT_ARROW)){
                //sposta l'omino a destra
                if(x_omino <= lim_dx){//1270
                    x_omino += 3;
                }
            }else{
                if(keyIsDown(LEFT_ARROW)){
                    //sposta l'omino a sinistra
                    if(x_omino >= lim_sx){//110
                        x_omino -= 3;
                    }
                }
            }

            //calcolo la gravità
            y_omino = y_omino + velocita_y;

            if(y_omino < terreno){
                velocita_y = velocita_y + gravita;
            }
            else {
                velocita_y = 0;
                y_omino = terreno;
            }

            //controllo che la barra spaziatrice o la freccia su siano premuti
            if(keyIsDown(32) || keyIsDown(UP_ARROW) && !morto){//32 = barra spaziatrice
                if(y_omino >= terreno){
                    velocita_y = -potenza_salto;
                }
            }

            //calcollo i limiti dell'omino
            minXOmino = x_omino;
            maxXOmino = x_omino + omino.width - 70;

            //controllo se l'omino è entrato nella zona di attivazione per far comparire il buco
            if((maxXOmino < x_buco - 15 && maxXOmino > x_buco - 40) || sup){
                sup = true;
                fill(colore_cielo);
                noStroke();
                rect(x_buco, y_buco, larg_buco, alt_buco);
            }
            
            //controllose l'omino è caduto nel buco
            if(y_omino == 300 && x_omino + 50 > x_buco && maxXOmino < x_buco + larg_buco){
                
                terreno = 470;
                lim_sx = x_buco - 20;
                lim_dx = x_buco + larg_buco - 100;
                morto = false;
                //print(terreno);
                if(y_omino < 470){
                    y_omino += 0.05;
                }
            }

            //se l'omino è caduto resetto le variabili
            if(y_omino == 470){
                livelloBlu = false;
                sup = false;
                morto = true;

                image(tastoInvio, 600, 150);

                terreno = 300;
                dissolvenza_menu = 50;
                x_omino = 110;
                y_omino = 300;
                lim_dx = 1270;
                lim_sx = 110;
                //numeroLivello = 0;
            }

            //controllo se l'omino è entrato a contatto con la porta
            entraInPorta(portaBlu, x_portaBlu, y_portaBlu);
            break;
        case 1:
            if(!sup){
                x_buco = 900;
                y_buco = 410;
                alt_buco = 220;
                larg_buco = 70;
            }
            background(sfondo);
            fill(colore_cielo);
            noStroke();
            rect(150, 100, 1200, 480);//cielo

            fill(colore_pavimento);
            noStroke();
            rect(150, 410, 1200, 180);//pavimento

            //disegno il buco
            fill(colore_cielo);
            noStroke();
            rect(x_buco, y_buco, larg_buco, alt_buco);
            
            //disegno la scritta che tiene traccia delle morti
            textStyle(BOLD);
            textSize(25);
            fill(0,0,0);
            text("MORTI: ", 155, 130)
            text(morti, 250, 130);

            image(omino, x_omino, y_omino);
            image(portaBlu, x_portaBlu, y_portaBlu);

            if(keyIsDown(RIGHT_ARROW)){
                //sposta l'omino a destra
                if(x_omino <= lim_dx){//1270
                    x_omino += 3;
                }
            }else{
                if(keyIsDown(LEFT_ARROW)){
                    //sposta l'omino a sinistra
                    if(x_omino >= lim_sx){//110
                        x_omino -= 3;
                    }
                }
            }

            //calcolo la gravità
            y_omino = y_omino + velocita_y;

            if(y_omino < terreno){
                velocita_y = velocita_y + gravita;
            }
            else {
                velocita_y = 0;
                y_omino = terreno;
            }

            //controllo che la barra spaziatrice o la freccia su siano premuti
            if(keyIsDown(32) || keyIsDown(UP_ARROW) && !morto){//32 = barra spaziatrice
                if(y_omino >= terreno){
                    velocita_y = -potenza_salto;
                }
            }

            //calcollo i limiti dell'omino
            minXOmino = x_omino;
            maxXOmino = x_omino + omino.width - 70;

            //controllo se l'omino è entrato nella zona di attivazione per far spostare il buco in dietro
            if ((maxXOmino < x_buco - 35 && maxXOmino > x_buco - 70) || sup) {
                sup = true;
                if(x_buco > 700){
                    x_buco -= 4;
                }
                
            }

            //controllo se l'omino è caduto nel buco
            if(y_omino == 300 && x_omino + 50 > x_buco && maxXOmino < x_buco + larg_buco){
                terreno = 470;
                lim_sx = x_buco - 20;
                lim_dx = x_buco + larg_buco - 100;
                morto = false;
                print(terreno);
                if(y_omino < 470){
                    x_omino = x_buco;
                    y_omino += 0.05;
                    
                }
            }

            //se l'omino è caduto resetto le varibili
            if(y_omino == 470){
                livelloBlu = false;
                sup = false;
                morto = true;

                image(tastoInvio, 600, 150);                
                terreno = 300;
                dissolvenza_menu = 50;
                x_omino = 110;
                y_omino = 300;
                lim_dx = 1270;
                lim_sx = 110;
                //numeroLivello = 0;
            }

            //controllo se l'omino è entrato in contatto ocn la porta
            entraInPorta(portaBlu, x_portaBlu, y_portaBlu);
            break;
        
        case 2:
            if(!sup){
                x_buco = 350;
                y_buco = 410;
                alt_buco = 220;
                larg_buco = 70;
            }

            background(sfondo);
            fill(colore_cielo);
            noStroke();
            //rect(30, 20, 55, 55);
            rect(150, 100, 1200, 480);//cielo

            fill(colore_pavimento);
            noStroke();
            rect(150, 410, 1200, 180);//pavimento

            fill(colore_cielo);
            noStroke();
            rect(x_buco, y_buco, larg_buco, alt_buco);
            
            //disegno la scritta che tiene traccia delle morti
            textStyle(BOLD);
            textSize(25);
            fill(0,0,0);
            text("MORTI: ", 155, 130)
            text(morti, 250, 130);

            image(omino, x_omino, y_omino);
            image(portaBlu, x_portaBlu, y_portaBlu);

            if(keyIsDown(RIGHT_ARROW)){
                //sposta l'omino a destra
                if(x_omino <= lim_dx){//1270
                    x_omino += 3;
                }
            }else{
                if(keyIsDown(LEFT_ARROW)){
                    //sposta l'omino a sinistra
                    if(x_omino >= lim_sx){//110
                        x_omino -= 3;
                    }
                }
            }

            //calcolo la gravità
            y_omino = y_omino + velocita_y;

            if(y_omino < terreno){
                velocita_y = velocita_y + gravita;
            }
            else {
                velocita_y = 0;
                y_omino = terreno;
            }

            //controllo che la barra spaziatrice o la freccia su siano premuti
            if(keyIsDown(32) || keyIsDown(UP_ARROW) && !morto){//32 = barra spaziatrice
                if(y_omino >= terreno){
                    velocita_y = -potenza_salto;
                }
            }

            //calcollo i limiti dell'omino
            minXOmino = x_omino;
            maxXOmino = x_omino + omino.width - 70;

            //controllo se l'omino è entrato nella zona di attivazione per far aumentare la dimensione del buco
            if ((minXOmino < x_buco + 200 && minXOmino > x_buco + 100) || sup) {
                sup = true;
                fill(colore_cielo);
                noStroke();
                rect(x_buco, y_buco, larg_buco, alt_buco);
                if(larg_buco < 600){
                    larg_buco += 3.5;
                }
            }

            //controlllo ser l'omino è caduto nel buco
            if(y_omino == 300 && x_omino + 50 > x_buco && maxXOmino < x_buco + larg_buco){
                terreno = 470;
                lim_sx = x_buco - 20;
                lim_dx = x_buco + larg_buco - 100;

                morto = false;
                print(terreno);
                if(y_omino < 470){
                    y_omino += 0.05;
                    
                }
            }

            //se l'omino è caduto nel buco resetto le variabili
            if(y_omino == 470){
                livelloBlu = false;
                sup = false;
                morto = true;

                image(tastoInvio, 600, 150);
                
                terreno = 300;
                dissolvenza_menu = 50;
                x_omino = 110;
                y_omino = 300;
                lim_dx = 1270;
                lim_sx = 110;
                //numeroLivello = 0;
            }

            //controllo se l'omino è entrato a contatto con la porta
            entraInPorta(portaBlu, x_portaBlu, y_portaBlu);

            break;
        case 3:
            if(!sup && !sup1){
                x_buco = 250;
                y_buco = 410;
                alt_buco = 220;
                larg_buco = 70;

                x_pav_centr = 320;
                larg_pav_centr = 800;
            }

            background(sfondo);

            fill(colore_cielo);
            noStroke();
            rect(150, 100, 1200, 530);//cielo

            fill(colore_pavimento);
            noStroke();
            rect(150, 410, 100, 220);//pavimento

            fill(colore_pavimento);
            noStroke();
            rect(1120, 410, 230, 220);//pavimento

            fill(colore_pavimento);
            noStroke();
            rect(x_pav_centr, y_buco, larg_pav_centr, alt_buco);//pavimento

            fill(colore_cielo);
            noStroke();
            rect(x_buco, y_buco, larg_buco, alt_buco);//buco iniz
            
            //disegno la scritta che tiene traccia delle morti
            textStyle(BOLD);
            textSize(25);
            fill(0,0,0);
            text("MORTI: ", 155, 130)
            text(morti, 250, 130);

            image(omino, x_omino, y_omino);
            image(portaBlu, x_portaBlu, y_portaBlu);

            if(keyIsDown(RIGHT_ARROW)){
                //sposta l'omino a destra
                if(x_omino <= lim_dx){//1270
                    x_omino += 3;
                }
            }else{
                if(keyIsDown(LEFT_ARROW)){
                    //sposta l'omino a sinistra
                    if(x_omino >= lim_sx){//110
                        x_omino -= 3;
                    }
                }
            }

            //calcolo la gravità
            y_omino = y_omino + velocita_y;

            if(y_omino < terreno){
                velocita_y = velocita_y + gravita;
            }
            else {
                velocita_y = 0;
                y_omino = terreno;
            }

            //controllo che la barra spaziatrice o la freccia su siano premuti
            if(keyIsDown(32) || keyIsDown(UP_ARROW) && !morto){//32 = barra spaziatrice
                if(y_omino >= terreno){
                    velocita_y = -potenza_salto;
                }
            }

            //calcollo i limiti dell'omino
            minXOmino = x_omino;
            maxXOmino = x_omino + omino.width - 70;

            //controllo se l'omino è entrto nella zona di attivazione per far aumentare la dimensione del buco
            if ((minXOmino < x_buco + 200 && minXOmino > x_buco + 100) || sup) {
                sup = true;
                fill(colore_cielo);
                noStroke();
                rect(x_buco, y_buco, larg_buco, alt_buco);
                if(larg_buco < 600 && !sup1){
                    larg_buco += 3.5;
                    x_pav_centr += 3;
                    larg_pav_centr -= 3;
                }
            }

            //controllo se l'omino è entrato nella seconda zona di attivazione per far spostare in dietro il pavimento creando un buco
            if ((minXOmino < x_pav_centr + larg_pav_centr - 50 && minXOmino > x_pav_centr + larg_pav_centr - 150) || sup1) {
                sup1 = true;
                if(x_pav_centr + larg_pav_centr > 1050){
                    x_pav_centr -= 5;
                    larg_buco -= 5;
                }
                fill(colore_pavimento);
                noStroke();
                rect(x_pav_centr, y_buco, larg_pav_centr, alt_buco);//pavimento
            }

            //controllo che l'omino non sia caduto nei buchi
            if(y_omino == 300 && (maxXOmino > x_pav_centr + larg_pav_centr && x_omino < 1050)){
                terreno = 470;
                
                lim_sx = x_pav_centr + larg_pav_centr;
                lim_dx = 1020;
                morto = false;

                print(terreno);
                if(y_omino < 470){
                    y_omino += 0.05;
                    
                }
            }

            if(y_omino == 300 && x_omino + 50 > x_buco && maxXOmino < x_buco + larg_buco){
                terreno = 470;
                lim_sx = x_buco;
                lim_dx = x_buco + larg_buco - 100;

                morto = false;
                print(terreno);
                if(y_omino < 470){
                    y_omino += 0.05;
                    
                }
            }

            //se l'omino è caduto nel buco resetto le variabili
            if(y_omino == 470){
                livelloBlu = false;
                sup = false;
                sup1 = false;
                morto = true;

                image(tastoInvio, 600, 150);

                terreno = 300;
                dissolvenza_menu = 50;
                x_omino = 110;
                y_omino = 300;

                lim_dx = 1270;
                lim_sx = 110;

                //numeroLivello = 0;
            }

            entraInPorta(portaBlu, x_portaBlu, y_portaBlu);
            break;
        case 4:
            x_buco1 = 500;
            x_buco2 = 600;
            x_buco3 = 700;
            x_buco4 = 800;
            larg_buco = 50;
            alt_buco = 220;
            y_buchi = 410;

            background(sfondo);
            fill(colore_cielo);
            noStroke();
            rect(150, 100, 1200, 480);//cielo

            fill(colore_pavimento);
            noStroke();
            rect(150, 410, 1200, 180);//pavimento

            //disegno i vari buchi
            fill(colore_cielo);
            noStroke();
            rect(x_buco1, y_buchi, larg_buco, alt_buco);

            fill(colore_cielo);
            noStroke();
            rect(x_buco2, y_buchi, larg_buco, alt_buco);

            fill(colore_cielo);
            noStroke();
            rect(x_buco3, y_buchi, larg_buco, alt_buco);

            fill(colore_cielo);
            noStroke();
            rect(x_buco4, y_buchi, larg_buco, alt_buco);
            
            //disegno la scritta che tiene traccia delle morti
            textStyle(BOLD);
            textSize(25);
            fill(0,0,0);
            text("MORTI: ", 155, 130)
            text(morti, 250, 130);

            image(omino, x_omino, y_omino);
            image(portaBlu, x_portaBlu, y_portaBlu);           

            if(keyIsDown(RIGHT_ARROW)){
                //sposta l'omino a destra
                if(x_omino <= lim_dx){//1270
                    x_omino += 3;
                }
            }else{
                if(keyIsDown(LEFT_ARROW)){
                    //sposta l'omino a sinistra
                    if(x_omino >= lim_sx){//110
                        x_omino -= 3;
                    }
                }
            }

            //calcolo la gravità
            y_omino = y_omino + velocita_y;

            if(y_omino < terreno){
                velocita_y = velocita_y + gravita;
            }
            else {
                velocita_y = 0;
                y_omino = terreno;
            }

            //controllo che la barra spaziatrice o la freccia su siano premuti
            if(keyIsDown(32) || keyIsDown(UP_ARROW) && !morto){//32 = barra spaziatrice
                if(y_omino >= terreno){
                    velocita_y = -potenza_salto;
                }
            }

            //calcollo i limiti dell'omino
            minXOmino = x_omino;
            maxXOmino = x_omino + omino.width - 70;

            //controllo se l'omino è caduto nel prim buco
            if(y_omino == 300 && x_omino + 50 > x_buco1 && maxXOmino < x_buco1 + larg_buco){
                terreno = 470;
                morto = false;
                lim_sx = x_buco1 - 20;
                lim_dx = x_buco1 + larg_buco - 100;
                print(terreno);
                if(y_omino < 470){
                    y_omino += 0.05;
                    
                }
            }

            //controllo se l'omino è catuto nel secondo buco o nel secondo piedistallo finto
            if(y_omino == 300 && x_omino + 50 > x_buco2 && maxXOmino < x_buco2 + larg_buco * 2){
                terreno = 470;
                lim_sx = x_buco2 - 20;
                lim_dx = x_buco2 + larg_buco*2 - omino.width;
                morto = false;
                print(terreno);
                if(y_omino < 470){
                    y_omino += 0.05;
                }
            }

            //controllo se l'omino è caduto nel terzo buco
            if(y_omino == 300 && x_omino + 50 > x_buco4 && maxXOmino < x_buco4 + larg_buco){
                terreno = 470;
                morto = false;
                lim_sx = x_buco4 - 20;
                lim_dx = x_buco4 + larg_buco - 100;
                print(terreno);
                if(y_omino < 470){
                    y_omino += 0.05;
                    
                }
            }

            //se l'omino è caduto nel buco resetto le variabili
            if(y_omino == 470){
                livelloBlu = false;
                sup = false;
                sup1 = false;
                morto = true;

                image(tastoInvio, 600, 150);

                terreno = 300;
                dissolvenza_menu = 50;
                x_omino = 110;
                y_omino = 300;

                lim_dx = 1270;
                lim_sx = 110;

                //numeroLivello = 0;
            }

            //controllose l'omino è entrato in contatto con la porta
            entraInPorta(portaBlu, x_portaBlu, y_portaBlu);

            break;
    }
}

function entraInPorta(porta, x_porta, y_porta){
    larghezzaPorta = porta.width; // Larghezza della porta
    altezzaPorta = porta.height; // Altezza della porta
    
    //calcolo ilimiti della porta
    minXPorta = x_porta;
    maxXPorta = x_porta + larghezzaPorta;
    minYPorta = y_porta;
    maxYPorta = y_porta + altezzaPorta;

    //calcolo i limiti dell'omino
    minXOmino = x_omino;
    maxXOmino = x_omino + omino.width - 70;
    minYOmino = y_omino;
    maxYOmino = y_omino + omino.height - 25;
    
    //controllo se l'omino entra a contatto con la porta
    if ((maxXOmino >= minXPorta && minXOmino <= maxXPorta) && (maxYOmino >= minYPorta && minYOmino <= maxYPorta)) {
        
        //controllo se il numero del livello è inferiore a 4 lo faccio proseguire al livello successivo resettanto le variabili necessarie
        if(numeroLivello < 4){
            numeroLivello++;
            x_omino = 110;
            y_omino = 300;
            x_portaRossa = 1200;
            y_portaRossa = 290;
            lim_dx = 1270;
            lim_sx = 110;
            sup = false;
            iniziato = true;
            scambia
            gravita = 0.5;
            contaMorte = 0;
        }else{
            //se il numero del livello è superiore o uguale a 4 lo faccio tornare al menu resettando tutte le variabili
            if(numeroLivello >= 4){
                livelloGiallo = false;
                livelloRosso = false;
                livelloBlu = false;
                menu = true;

                sup = false;
                sup1 = false;
                sup2 = false;
                iniziato = true;
                contaMorte = 0;
                dissolvenza_menu = 50;
                x_omino = 110;
                y_omino = 300;

                gravita = 0.5;

                x_portaRossa = 1200;
                y_portaRossa = 290;
                lim_dx = 1270;
                lim_sx = 110;
                numeroLivello = 0;
            }
        }
    }
}

//funzione che serve a disegnare il menu
function drawMenu() {
    tint(255, dissolvenza_menu);
    //controllo la dissolvenza per il caricamento del menu
    if (dissolvenza_menu < 255) {
      dissolvenza_menu = dissolvenza_menu + velocita_dissolvenza; 
    }
    background(sfondo);
    //disegno le varie porte per i livelli
    image(portaBluMenu, 385, -100)
    image(portaGiallaMenu, 680, 100)
    image(portaRossaMenu, 1000, -170)
    image(percorsoPortaBlu_Gialla, 380, 225)
    image(percorsoPortaGialla_Rossa, 685, 105)

    //disegno la scritta che tiene traccia delle morti
    textStyle(BOLD);
    textSize(25);
    fill(0,0,0);
    text("MORTI: ", 155, 100)
    text(morti, 250, 100);
}

//funzione che controlla se il mouse è premuto
function mouseClicked(){
    //mouesex, mousey è il punto nel quale ho cliccato con il mouse
    //x,y è il centro del raggio se la distanza tra il punto del mouse e il 
    //centro del cenrchio se è minore di 50 è dentro il cerchio

    //calcolo la distanza tra il mouse e la porta blu del menu
    let d_blu = dist(mouseX, mouseY, 430, 205);
    //calcolo la distanza tra il mouse e la porta gialla del menu
    let d_gialla = dist(mouseX, mouseY, 725, 405);
    //calcolo la distanza tra il mouse e la porta rossa del menu
    let d_rossa = dist(mouseX, mouseY, 1050, 135);

    //a seconda di quale porta ho premuto faccio partire il corrispettivo livello
    if(d_blu < 30){
        menu = false;
        livelloBlu = true;
    }else{
        if(d_gialla < 30){
            menu = false;
            livelloGiallo = true;
        }else{
            if(d_rossa < 30){
                menu = false;
                livelloRosso = true;
            }
        }
    }

    //calcolo la distanza tra il mouse e il tasto per continuare nella schermata di pausa
    let d_tastoContinua = dist(mouseX, mouseY, 730, 325);
    //calcolo la distanza tra il mouse e il tasto per tornare al menu iniziale nella schermata di pausa
    let d_tastoHome = dist(mouseX, mouseY, 930, 325);

    //a seconda di quale tasto è premuto eseguo l'azione
    if(d_tastoContinua < 55 && pausa){
        pausa = !pausa;
    }else{
        //se è il tasto home resetto tutte le impostazioni
        if(d_tastoHome < 55 && pausa){
            pausa = !pausa;
            
            livelloGiallo = false;
            livelloRosso = false;
            livelloBlu = false;
            menu = true;

            sup = false;
            sup1 = false;
            sup2 = false;

            iniziato = true;
            scambia = false;

            dissolvenza_menu = 50;
            x_omino = 110;
            y_omino = 300;
            lim_dx = 1270;
            lim_sx = 110;
            numeroLivello = 0;

            contaMorte = 0;
            gravita = 0.5;

            x_portaRossa = 1200;
            y_portaRossa = 290;
        }
    }

    //controllo la distanza tra il mouse e la porta rossa nell'ultimo livello della porta rossa
    let d_portaRossa = dist(mouseX, mouseY, portaRossa.width + x_portaRossa - 60, portaRossa.height + y_portaRossa - 55);

    //se è premuta eseguo il codice
    if(livelloRosso == true && numeroLivello == 3){
        if(d_portaRossa < 40){
            scambia = !scambia;
            print(scambia)
        }
        
    }
}

//funzione che controlla se ho premuto un tasto
function keyPressed(){
    //controllo se schiaccio il tasto ESC per entrare nella schermata di pausa
    if(keyCode == ESCAPE){
        background(bg);
        pausa = !pausa;

        //tastoInvio.resize(256);
        //tastoHome.resize(256);
        //tastoContinua.resize(256);

        image(tastoContinua, 600, 200);
        
        image(tastoHome, 800, 200);
        
        //image(tastoSkipIndietro, 400, 200);
        
    }

    //resetto le impostazioni in base al livello nel quale sono morto
    if(morto == true && keyCode == ENTER && livelloScelto == "blu"){
        livelloBlu = true;
        livelloGiallo = false;
        livelloRosso = false;
        sup = false;
        sup1 = false;
        morto = false;
        x_omino = 110;
        y_omino = 300;
        //numeroLivello = 0;
        terreno = 300;
        gravita = 0.5;
        x_portaRossa = 1200;
        y_portaRossa = 290;
        morti++;
    }

    if(morto == true && keyCode == ENTER && livelloScelto == "giallo"){
        livelloBlu = false;
        livelloGiallo = true;
        livelloRosso = false;
        sup = false;
        sup1 = false;
        sup2 = false;
        morto = false;
        colpito = false
        x_omino = 110;
        y_omino = 300;
        //numeroLivello = 0;
        terreno = 300;
        gravita = 0.5;
        x_portaRossa = 1200;
        y_portaRossa = 290;
        morti++;
    }

    if(morto == true && keyCode == ENTER && livelloScelto == "rosso"){
        livelloBlu = false;
        livelloGiallo = false;
        livelloRosso = true;
        morto = false;
        inverti_direz = true;
        inverti_salto = false;
        iniziato = true;
        colpito = false
        x_omino = 110;
        y_omino = 300;
        //numeroLivello = 0;
        terreno = 300;
        x_portaRossa = 1200;
        y_portaRossa = 290;
        gravita = 0.5;
        morti++;
    }

}

/*      
menu = true;
livelloBlu  = false;
livelloGiallo = false;
livelloRosso = false;
sup = false;
sup1 = false;
x_omino = 110;
y_omino = 300;
numeroLivello = 0;
terreno = 300;
        
PER TORNARE AL MENU RESETTANDO TUTTOs
*/