# 🎮 Tic Tac Toe

Este proyecto es una simulación interactiva del clásico juego **Tic Tac Toe (Gato)** desarrollada como una aplicación web. Su objetivo es ofrecer una experiencia dinámica y altamente personalizable, permitiendo a los usuarios modificar la estética del juego, elegir modos de juego y controlar el tiempo de partida.

Proyecto realizado para la **Actividad 4** de la materia de **Simulación de Sistemas**.

---

## ✨ Características Principales

El juego incluye las siguientes funcionalidades:

### 🎮 Modos de Juego

* **2 Jugadores:** Juego local por turnos.
* **Vs Computadora:** Incluye una IA con estrategia básica que:

  * Intenta ganar cuando puede
  * Bloquea al jugador
  * Prioriza centro y esquinas
  * Usa movimientos disponibles como último recurso

---

### 👤 Gestión de Jugadores

* Entrada personalizada de **nombres de jugadores**.
* Actualización dinámica de etiquetas en pantalla.
* Identificación automática de “Computadora” en modo IA.

---

### 🎨 Personalización Visual

* **Selección de símbolos:**

  * Set 1: X y O
  * Set 2: ★ y ☆
  * Set 3: 🍒 y 🍰
* Cambio dinámico de símbolos incluso con el tablero en uso.
* **Colores de celdas personalizables** con patrón alternado tipo ajedrez.
* **Mostrar / ocultar líneas del tablero**.
* **Color personalizable de línea ganadora** dibujada sobre canvas.
* Animación visual de la línea que marca la victoria.

---

### ⏱️ Mecánicas de Tiempo

* Temporizador configurable:

  * Rápido — 1 minuto
  * Normal — 3 minutos
  * Relajado — 5 minutos
  * Sin límite
* Inicio automático del contador en el primer movimiento.
* Finalización automática por **tiempo agotado** (empate).
* Visualización en tiempo real del tiempo restante.

---

### 📊 Sistema de Estadísticas

* Conteo persistente durante la sesión de:

  * Victorias Jugador 1
  * Victorias Jugador 2 / Computadora
  * Empates
* Botón para **resetear estadísticas**.

---

### 🔄 Control de Partida

* Detección automática de:

  * Victoria
  * Empate
* Modal emergente con resultado.
* Reinicio desde:

  * Botón principal
  * Modal de resultado
* Limpieza completa del tablero, temporizador y canvas.
* Restauración de colores y símbolos por defecto.

---

## 🛠️ Tecnologías Utilizadas

* **HTML**

  * Estructura de interfaz y tablero
* **CSS**

  * Estilos visuales, layout responsivo y animaciones
* **JavaScript**

  * Lógica del juego
  * IA básica
  * Temporizador
  * Canvas para línea ganadora
  * Gestión de estado y estadísticas

> **Nota:** El código fuente desplegado ha sido **ofuscado** para cumplir con los requisitos de entrega de la actividad.

---

## 📁 Estructura General

```
/Proyecto
│
├── index.html
├── CSS/
│   └── styles.css
├── JS/
│   └── functions.js
├── img/
│   └── assets del juego
```

---

## ▶️ Ejecución
OPCIÓN A:
1. Clonar o descargar el repositorio
2. Abrir `index.html` en un navegador web
3. Configurar opciones de juego
4. ¡Jugar!

OPCIÓN B:
1. Ingresar a https://a223204951.github.io/8REINAS/
2. Configurar opciones de juego
3. ¡Jugar!

No requiere instalación adicional ni dependencias externas.

---

## 📝 Autor

* Rivera Escoboza Lani
* 223204951
* Ingeniería en Sistemas de Información
* Universidad de Sonora
