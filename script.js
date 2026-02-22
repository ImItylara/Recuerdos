const stage = document.querySelector(".stage");
const title = document.querySelector(".title");
const startBtn = document.querySelector(".start");
const starsContainer = document.querySelector(".stars");
const flash = document.querySelector(".flash");

const continueBtn = document.querySelector(".continue");
const continueBtn2 = document.querySelector(".continue2");

const genesisText = document.querySelector(".genesis-text");
const hechizoText = document.querySelector(".hechizo-text");

/* ================= TEXTOS ================= */

const textContent = `Hola, mi amor lindo.
Qué palabra tan hermosa: Génesis.

El inicio de algo…
En esta ocasión, nuestra historia.

El comienzo de un mundo lleno de posibilidades, de aventuras, de experiencias.
Quién diría que algo tan fuera de lo común lograríamos hacerlo funcionar.

Y sin embargo, aquí estamos creando un futuro, nuestro futuro.`;

const hechizoContent = `No fue inmediato.
No fue planeado.

Fue algo más silencioso…
Una mirada que se quedaba más de lo normal.
Una conversación que no quería terminar.

Sin darme cuenta,
ya estaba completamente hechizado por ella.`;

/* ================= ABRIR TELÓN ================= */

stage.addEventListener("click", () => {
    if (!stage.classList.contains("open")) {
        stage.classList.add("open");

        setTimeout(() => title.classList.add("show-title"), 1200);
        setTimeout(() => startBtn.classList.add("show-start"), 3000);
    }
});

/* ================= ESCENA 1 → 2 ================= */

startBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    stage.classList.add("next");

    setTimeout(() => {
        typeWriter(textContent, genesisText, 35, continueBtn);
    }, 800);
});

/* ================= ESCENA 2 → 3 ================= */

continueBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    stage.classList.add("next2");

    setTimeout(() => {
        typeWriter(hechizoContent, hechizoText, 35, continueBtn2);
    }, 800);
});

/* ================= TYPEWRITER ================= */

function typeWriter(text, element, speed, buttonToShow) {
    let i = 0;
    element.innerHTML = "";
    buttonToShow.classList.remove("show-continue", "show-continue2");

    function typing() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        } else {
            buttonToShow.classList.add(
                buttonToShow === continueBtn ? "show-continue" : "show-continue2"
            );
        }
    }

    typing();
}

/* ================= ESTRELLAS NORMALES ================= */

function createStar(customDuration = null) {
    const star = document.createElement("div");
    star.classList.add("star");

    star.style.top = Math.random() * window.innerHeight + "px";

    const duration = customDuration || (Math.random() * 3 + 2);
    star.style.animationDuration = duration + "s";

    starsContainer.appendChild(star);

    setTimeout(() => star.remove(), duration * 1000);
}

// Estrellas normales constantes
setInterval(createStar, 800);

/* ================= WARP PROGRESIVO ================= */

let warpSpeed = 800;
let warpActive = false;
let warpLoop;

function progressiveWarp() {
    function spawn() {
        if (!warpActive) return;

        const fastDuration = Math.random() * 0.8 + 0.4;
        createStar(fastDuration);

        setTimeout(spawn, warpSpeed);
    }

    spawn();
}

/* ================= ESCENA 3 → PUERTAS ================= */

continueBtn2.addEventListener("click", (e) => {
    e.stopPropagation();

    warpActive = true;

    // Aumenta progresivamente la velocidad
    warpLoop = setInterval(() => {
        if (warpSpeed > 80) {
            warpSpeed -= 60;
        }
    }, 200);

    progressiveWarp();

    setTimeout(() => {

        // Activar flash
        flash.classList.add("active");

        // Mantener blanco un momento
        setTimeout(() => {

            // Quitar blanco
            flash.classList.remove("active");

            // JUSTO cuando empieza a quitarse el blanco
            setTimeout(() => {
                stage.classList.add("next3");
            }, 300);

            clearInterval(warpLoop);
            warpActive = false;
            warpSpeed = 800;

        }, 1400);

    }, 3000);
});
