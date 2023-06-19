const TIMER = document.getElementById("pomodoro");
const CONTAINER = document.getElementById("container");
const SPANTXT = document.getElementById("txtModo");

// Estructura del pomodoro:
// 4 sesiones de 25 min,
// 5 min de break y al completar las 4 sesiones
// un descanso largo de 15 min
const MINUTOS_DE_TRABAJO = 0.1; //.1 = 0.6s prueba
const MINUTOS_DE_DESCANSO = 0.2;
const MINUTOS_DE_DESCANSO_LARGO = 0.3; //18s
const SESIONES = 4;

const AUDIO_TRABAJO = new Audio("./Sounds/trabajo.mp3");
const AUDIO_DESCANSO = new Audio("./Sounds/descanzo.mp3");

let contadorDeSesiones = 1;
let segundosTotales = MINUTOS_DE_TRABAJO * 60;

//Puede ser "estudio, etc..."
let modoTimer = "trabajo";

// Funcion de la cuenta regresiva
const cuentaRegresiva = async () => {
  // Minutos del contador
  let minutosEnteros = Math.floor(segundosTotales / 60);
  // Segundos del contador
  let segundosEnteros = segundosTotales % 60;

  // Añadimos un 0 al inicio de los segunfos si es < 0 -> 25: "0"+0 = 25:00
  if (segundosEnteros < 10) {
    segundosEnteros = "0" + segundosEnteros;
  }

  // Imprimimos el contador
  TIMER.innerHTML = `${minutosEnteros}:${segundosEnteros} | ${contadorDeSesiones}/${SESIONES}`;
  segundosTotales--;

  //   Cambio de modo y añadimos la clase correspondiente
  if (modoTimer === "trabajo") {
    addAndRemoveClases("contador__trabajo", "contador__descanso");
    SPANTXT.innerHTML = modoTimer;

    if (segundosTotales < 0) {
      if (contadorDeSesiones < SESIONES) {
        contadorDeSesiones++;
        modoTimer = "descanso";
        segundosTotales = MINUTOS_DE_DESCANSO * 60;
        await AUDIO_DESCANSO.play();
      } else {
        modoTimer = "largo 15M";
        segundosTotales = MINUTOS_DE_DESCANSO_LARGO * 60;
        contadorDeSesiones = 1;
        await AUDIO_DESCANSO.play();
      }
    }
  } else {
    addAndRemoveClases("contador__descanso", "contador__trabajo");
    SPANTXT.innerHTML = modoTimer;

    if (segundosTotales < 0) {
      modoTimer = "trabajo";
      segundosTotales = MINUTOS_DE_TRABAJO * 60;
      await AUDIO_TRABAJO.play();
    }
  }
};

// Funcion para añadir y quitar las clase
const addAndRemoveClases = (addClase, removeClase) => {
  CONTAINER.classList.remove(removeClase);
  CONTAINER.classList.add(addClase);
};

// RUN
setInterval(() => cuentaRegresiva(), 1000);
