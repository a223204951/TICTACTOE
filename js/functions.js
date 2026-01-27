var turno=false;

//funcion activo
function activo(boton){
    boton.disabled=true;
    boton.value=turno?'X':'O';
    turno=!turno;
    verificarGanador();
}

//funcion verificar ganador
function verificarGanador(){
    var botones=document.getElementsByTagName("input");
    if ((botones[0].value==botones[1].value && botones[1].value==botones[2].value && botones[0].value!="")){
        alert("Ganador: "+botones[0].value);
    }
    else if ((botones[3].value==botones[4].value && botones[4].value==botones[5].value && botones[3].value!="")){
        alert("Ganador: "+botones[3].value);
    }
        else if ((botones[6].value==botones[7].value && botones[7].value==botones[8].value && botones[6].value!="")){
        alert("Ganador: "+botones[6].value);
    }
    else if ((botones[0].value==botones[3].value && botones[3].value==botones[6].value && botones[0].value!="")){
        alert("Ganador: "+botones[0].value);
    }
    else if ((botones[1].value==botones[4].value && botones[4].value==botones[7].value && botones[1].value!="")){
        alert("Ganador: "+botones[1].value);
    }
    else if ((botones[2].value==botones[5].value && botones[5].value==botones[8].value && botones[2].value!="")){
        alert("Ganador: "+botones[2].value);
    }
    else if ((botones[0].value==botones[4].value && botones[4].value==botones[8].value && botones[0].value!="")){
        alert("Ganador: "+botones[0].value);
    }
    else if ((botones[2].value==botones[4].value && botones[4].value==botones[6].value && botones[2].value!="")){
        alert("Ganador: "+botones[2].value);
    }
}