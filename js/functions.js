// FUNCIÓN ACTIVO
function activo(boton){
    var turno = false;
    boton.disabled = true;
    boton.value = turno ? "X" : "O";
    turno = !turno;
}

// FUNCIÓN VERIFICAR GANADOR
function verificarGanador() {
    var botones = document.getElementsByTagName("input");
}