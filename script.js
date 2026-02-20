// -------------------------
// ELEMENTOS
// -------------------------
const stage = document.querySelector(".stage");
const title = document.querySelector(".title");
const startBtn = document.querySelector(".start");
const starsContainer = document.querySelector(".stars");


// -------------------------
// ABRIR TELÓN
// -------------------------
stage.addEventListener("click", () => {

    if (!stage.classList.contains("open")) {

        stage.classList.add("open");

        setTimeout(() => {
            title.classList.add("show-title");
        }, 1200);

        setTimeout(() => {
            startBtn.classList.add("show-start");
        }, 3000);
    }
});


// -------------------------
// TRANSICIÓN A GÉNESIS
// -------------------------
startBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    stage.classList.add("next");
});


// -------------------------
// ESTRELLAS
// -------------------------
function createStar() {

    const star = document.createElement("div");
    star.classList.add("star");

    // Posición vertical aleatoria
    star.style.top = Math.random() * window.innerHeight + "px";

    // Velocidad aleatoria
    const duration = Math.random() * 3 + 2;
    star.style.animationDuration = duration + "s";

    starsContainer.appendChild(star);

    setTimeout(() => {
        star.remove();
    }, duration * 1000);
}

// Crear estrellas cada cierto tiempo
setInterval(createStar, 800);
