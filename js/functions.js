// ═══════════════════════════════════════════════════════
// VARIABLES GLOBALES
// ═══════════════════════════════════════════════════════

var turno = false; // false = jugador 1, true = jugador 2
var tablero = ['', '', '', '', '', '', '', '', '']; // Estado del tablero
var juegoActivo = true; // Controla si el juego está activo
var tiempoInicio = null; // Momento en que inició el juego
var tiempoLimite = 180; // 3 minutos en segundos
var intervaloTimer = null; // Intervalo del temporizador
var tiempoRestante = 180; // Tiempo restante en segundos (regresivo)
var setImagenes = 1; // Set de imágenes actual (1, 2 o 3)

// Símbolos para cada set de imágenes
var simbolos = {
    1: { jugador1: 'X', jugador2: 'O' },
    2: { jugador1: '★', jugador2: '☆' },
    3: { jugador1: '🍒', jugador2: '🍰' }
};

// ═══════════════════════════════════════════════════════
// FUNCIÓN PRINCIPAL DE CLICK EN CELDA
// ═══════════════════════════════════════════════════════

function cellClick(celda, indice) {
    // Verificar si el juego está activo y la celda está vacía
    if (!juegoActivo || tablero[indice] !== '' || celda.classList.contains('ocupada')) {
        return;
    }

    // Si es el primer movimiento, iniciar el temporizador
    if (tiempoInicio === null) {
        iniciarTemporizador();
    }

    // Marcar celda como ocupada
    celda.classList.add('ocupada');

    // Obtener símbolo actual según el turno
    var simboloActual = turno ? simbolos[setImagenes].jugador2 : simbolos[setImagenes].jugador1;

    // Asignar símbolo a la celda
    celda.textContent = simboloActual;
    tablero[indice] = simboloActual;

    // Cambiar turno
    turno = !turno;

    // Verificar si hay ganador
    verificarGanador();
}

// ═══════════════════════════════════════════════════════
// FUNCIÓN PARA VERIFICAR GANADOR
// ═══════════════════════════════════════════════════════

function verificarGanador() {
    // Todas las combinaciones ganadoras posibles
    var combinacionesGanadoras = [
        [0, 1, 2], // Fila 1
        [3, 4, 5], // Fila 2
        [6, 7, 8], // Fila 3
        [0, 3, 6], // Columna 1
        [1, 4, 7], // Columna 2
        [2, 5, 8], // Columna 3
        [0, 4, 8], // Diagonal principal
        [2, 4, 6]  // Diagonal secundaria
    ];

    // Verificar cada combinación ganadora
    for (var i = 0; i < combinacionesGanadoras.length; i++) {
        var combo = combinacionesGanadoras[i];
        var pos1 = combo[0];
        var pos2 = combo[1];
        var pos3 = combo[2];

        // Verificar si las tres posiciones tienen el mismo símbolo y no están vacías
        if (tablero[pos1] !== '' && 
            tablero[pos1] === tablero[pos2] && 
            tablero[pos2] === tablero[pos3]) {
            
            // Hay ganador
            finalizarJuego(tablero[pos1], combo);
            return;
        }
    }

    // Verificar empate (todas las celdas llenas)
    var hayEmpate = true;
    for (var j = 0; j < tablero.length; j++) {
        if (tablero[j] === '') {
            hayEmpate = false;
            break;
        }
    }

    if (hayEmpate) {
        finalizarJuego(null, null);
    }
}

// ═══════════════════════════════════════════════════════
// FUNCIÓN PARA FINALIZAR EL JUEGO
// ═══════════════════════════════════════════════════════

function finalizarJuego(ganador, combinacionGanadora) {
    juegoActivo = false;
    detenerTemporizador();

    var modal = document.getElementById('modal-ganador');
    var mensajeH2 = document.getElementById('mensaje-ganador');

    if (ganador) {
        // Hay ganador
        mensajeH2.textContent = '¡Ganador: ' + ganador + '! :3';

        // Dibujar línea ganadora
        if (combinacionGanadora) {
            dibujarLineaGanadora(combinacionGanadora);
        }
    } else {
        // Empate
        mensajeH2.textContent = '¡Empate! ☆';
    }

    // Mostrar modal
    modal.classList.add('mostrar');

    // Deshabilitar todas las celdas
    deshabilitarTablero();
}

// ═══════════════════════════════════════════════════════
// FUNCIÓN PARA DIBUJAR LÍNEA GANADORA
// ═══════════════════════════════════════════════════════

function dibujarLineaGanadora(combinacion) {
    var canvas = document.getElementById('lineCanvas');
    var tableroElement = document.querySelector('.tablero');
    
    // Ajustar canvas al tamaño del tablero
    canvas.width = tableroElement.offsetWidth;
    canvas.height = tableroElement.offsetHeight;

    var ctx = canvas.getContext('2d');
    
    // Obtener color seleccionado para la línea ganadora
    var color = document.getElementById('colorLineaGanadora').value;
    
    ctx.strokeStyle = color;
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';

    // Obtener celdas
    var celdas = document.querySelectorAll('.tablero td');
    
    // Calcular posiciones de inicio y fin de la línea
    var celdaInicio = celdas[combinacion[0]];
    var celdaFin = celdas[combinacion[2]];

    var rectInicio = celdaInicio.getBoundingClientRect();
    var rectFin = celdaFin.getBoundingClientRect();
    var rectTablero = tableroElement.getBoundingClientRect();

    // Calcular centros de las celdas
    var x1 = rectInicio.left - rectTablero.left + rectInicio.width / 2;
    var y1 = rectInicio.top - rectTablero.top + rectInicio.height / 2;
    var x2 = rectFin.left - rectTablero.left + rectFin.width / 2;
    var y2 = rectFin.top - rectTablero.top + rectFin.height / 2;

    // Dibujar línea con animación
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

// ═══════════════════════════════════════════════════════
// FUNCIÓN PARA DESHABILITAR EL TABLERO
// ═══════════════════════════════════════════════════════

function deshabilitarTablero() {
    var celdas = document.querySelectorAll('.tablero td');
    for (var i = 0; i < celdas.length; i++) {
        celdas[i].classList.add('ocupada');
        celdas[i].style.cursor = 'not-allowed';
    }
}

// ═══════════════════════════════════════════════════════
// FUNCIÓN PARA REINICIAR EL JUEGO
// ═══════════════════════════════════════════════════════

function reiniciarJuego() {
    // Reiniciar variables
    turno = false;
    tablero = ['', '', '', '', '', '', '', '', ''];
    juegoActivo = true;
    tiempoInicio = null;
    tiempoRestante = 180;

    // Detener y reiniciar temporizador
    detenerTemporizador();
    actualizarDisplayTimer();

    // Limpiar celdas del tablero
    var celdas = document.querySelectorAll('.tablero td');
    for (var i = 0; i < celdas.length; i++) {
        celdas[i].textContent = '';
        celdas[i].classList.remove('ocupada');
        celdas[i].style.cursor = 'pointer';
    }

    // Limpiar canvas de línea ganadora
    var canvas = document.getElementById('lineCanvas');
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Ocultar modal de ganador
    var modal = document.getElementById('modal-ganador');
    modal.classList.remove('mostrar');

    // Recargar colores de celdas
    actualizarColoresCeldas();
}

// ═══════════════════════════════════════════════════════
// TEMPORIZADOR
// ═══════════════════════════════════════════════════════

function iniciarTemporizador() {
    tiempoInicio = Date.now();
    
    intervaloTimer = setInterval(function() {
        var tiempoTranscurrido = Math.floor((Date.now() - tiempoInicio) / 1000);
        tiempoRestante = tiempoLimite - tiempoTranscurrido;
        
        if (tiempoRestante < 0) {
            tiempoRestante = 0;
        }
        
        actualizarDisplayTimer();

        // Verificar si se acabó el tiempo (0 segundos)
        if (tiempoRestante <= 0) {
            tiempoAgotado();
        }
    }, 1000);
}

function detenerTemporizador() {
    if (intervaloTimer) {
        clearInterval(intervaloTimer);
        intervaloTimer = null;
    }
}

function actualizarDisplayTimer() {
    var minutos = Math.floor(tiempoRestante / 60);
    var segundos = tiempoRestante % 60;
    
    var display = minutos + ':' + (segundos < 10 ? '0' : '') + segundos;
    document.getElementById('timer').textContent = display;
}

function tiempoAgotado() {
    detenerTemporizador();
    juegoActivo = false;
    
    var modal = document.getElementById('modal-ganador');
    var mensajeH2 = document.getElementById('mensaje-ganador');
    mensajeH2.textContent = '¡Tiempo agotado! Sin ganador ⏱️';
    modal.classList.add('mostrar');
    
    deshabilitarTablero();
}

// ═══════════════════════════════════════════════════════
// FUNCIÓN PARA CAMBIAR SET DE IMÁGENES/SÍMBOLOS
// ═══════════════════════════════════════════════════════

function cambiarImagenes(set) {
    setImagenes = set;
    
    // Actualizar símbolos en el tablero si ya hay piezas colocadas
    var celdas = document.querySelectorAll('.tablero td');
    for (var i = 0; i < celdas.length; i++) {
        if (tablero[i] !== '') {
            // Determinar si era jugador 1 o jugador 2
            var esJugador1 = (tablero[i] === simbolos[1].jugador1 || 
                             tablero[i] === simbolos[2].jugador1 || 
                             tablero[i] === simbolos[3].jugador1);
            
            var nuevoSimbolo = esJugador1 ? simbolos[set].jugador1 : simbolos[set].jugador2;
            celdas[i].textContent = nuevoSimbolo;
            tablero[i] = nuevoSimbolo;
        }
    }
}

// ═══════════════════════════════════════════════════════
// FUNCIÓN PARA ACTUALIZAR COLORES DE CELDAS
// ═══════════════════════════════════════════════════════

function actualizarColoresCeldas() {
    var color1 = document.getElementById('colorCelda1').value;
    var color2 = document.getElementById('colorCelda2').value;
    
    var celdas = document.querySelectorAll('.tablero td');
    
    for (var i = 0; i < celdas.length; i++) {
        // Determinar si es celda par o impar basado en posición
        var fila = Math.floor(i / 3);
        var columna = i % 3;
        
        // Alternar colores en patrón de tablero de ajedrez
        if ((fila + columna) % 2 === 0) {
            celdas[i].style.backgroundColor = color1;
        } else {
            celdas[i].style.backgroundColor = color2;
        }
    }
}

// ═══════════════════════════════════════════════════════
// FUNCIÓN PARA MOSTRAR/OCULTAR LÍNEAS DEL TABLERO
// ═══════════════════════════════════════════════════════

function toggleLineas() {
    var checkbox = document.getElementById('mostrarLineas');
    var tableroElement = document.querySelector('.tablero');
    
    if (checkbox.checked) {
        tableroElement.classList.remove('sin-lineas');
        // Restaurar bordes
        var celdas = document.querySelectorAll('.tablero td');
        for (var i = 0; i < celdas.length; i++) {
            celdas[i].style.border = '3px solid pink';
        }
    } else {
        tableroElement.classList.add('sin-lineas');
        // Quitar bordes
        var celdas = document.querySelectorAll('.tablero td');
        for (var i = 0; i < celdas.length; i++) {
            celdas[i].style.border = 'none';
        }
    }
}

// ═══════════════════════════════════════════════════════
// FUNCIONES DEL MODAL
// ═══════════════════════════════════════════════════════

function cerrarModal() {
    var modal = document.getElementById('modal-ganador');
    modal.classList.remove('mostrar');
}

function reiniciarDesdeModal() {
    cerrarModal();
    reiniciarJuego();
}

// ═══════════════════════════════════════════════════════
// INICIALIZACIÓN AL CARGAR LA PÁGINA
// ═══════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function() {
    // Aplicar colores iniciales
    actualizarColoresCeldas();
    
    // Asegurar que el temporizador muestre 3:00 al inicio
    actualizarDisplayTimer();
});