/* =======================================
   PREGUNTAS DE LA TRIVIA
   ======================================= */
const questions = [
  {
    q: "¿En qué año apareció por primera vez Hellboy?",
    options: ["1993", "1989", "1996", "2001"],
    answer: 0
  },
  {
    q: "¿Cuál es el sello editorial donde nació Hellboy?",
    options: ["Dark Horse Comics", "Vertigo", "Image Comics", "IDW Publishing"],
    answer: 0
  },
  {
    q: "¿Qué elemento visual caracteriza el estilo de Mignola?",
    options: ["Uso extremo del claroscuro", "Líneas hiperrealistas", "Colores fluorescentes", "Sombras difusas"],
    answer: 0
  },
  {
    q: "¿Qué director de cine trabajó con Mignola?",
    options: ["Guillermo del Toro", "Sam Raimi", "Tim Burton", "Robert Rodriguez"],
    answer: 0
  },
  {
    q: "¿Cuál de estas obras es de Mignola?",
    options: ["The Amazing Screw-On Head", "V de Vendetta", "The Sandman", "Spawn"],
    answer: 0
  }
];

/* 🔀 --- NUEVO: MEZCLAR PREGUNTAS AL INICIO --- */
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
shuffle(questions);

let current = 0;
let canAnswer = true;

/* ELEMENTOS DEL DOM */
const questionText = document.getElementById("questionText");
const optionsBox   = document.getElementById("optionsBox");
const feedback     = document.getElementById("feedback");
const nextBtn      = document.getElementById("nextBtn");
const restartBtn   = document.getElementById("restartBtn");

/* =======================================
   CARGAR PREGUNTA
   ======================================= */
function loadQuestion() {
  const q = questions[current];

  questionText.textContent = q.q;
  optionsBox.innerHTML = "";
  feedback.textContent = "";
  nextBtn.classList.add("d-none");
  restartBtn.classList.add("d-none");
  canAnswer = true;

  q.options.forEach((op, i) => {
    const btn = document.createElement("button");
    btn.className = "btn btn-outline-light";
    btn.textContent = op;
    btn.onclick = () => selectAnswer(i, btn);
    optionsBox.appendChild(btn);
  });
}

/* =======================================
   SELECCIÓN DEL JUGADOR + EFECTOS DE COLOR
   ======================================= */
function selectAnswer(i, clickedBtn) {
  if (!canAnswer) return;
  canAnswer = false;

  const correct = questions[current].answer;
  const allButtons = optionsBox.querySelectorAll("button");

  // 🔒 Deshabilitar todos
  allButtons.forEach(btn => btn.disabled = true);

  if (i === correct) {
    feedback.textContent = "✔ ¡Correcto!";
    feedback.className = "text-success fs-5 text-center";

    // 🟢 Brillo verde
    clickedBtn.classList.remove("btn-outline-light");
    clickedBtn.classList.add("btn-success", "glow-green");

  } else {
    feedback.textContent = "✘ Incorrecto";
    feedback.className = "text-danger fs-5 text-center";

    // 🔴 Brillo rojo en la equivocada
    clickedBtn.classList.remove("btn-outline-light");
    clickedBtn.classList.add("btn-danger", "glow-red");

    // 🟢 Mostrar la correcta en verde
    allButtons[correct].classList.remove("btn-outline-light");
    allButtons[correct].classList.add("btn-success", "glow-green");
  }

  nextBtn.classList.remove("d-none");
}

/* =======================================
   SIGUIENTE PREGUNTA
   ======================================= */
nextBtn.onclick = () => {
  current++;

  if (current >= questions.length) {
    endTrivia();
  } else {
    loadQuestion();
  }
};

/* =======================================
   FINAL DEL JUEGO
   ======================================= */
function endTrivia() {
  questionText.textContent = "¡Trivia completada!";
  optionsBox.innerHTML = "";
  feedback.textContent = "¿Querés intentarlo de nuevo?";
  nextBtn.classList.add("d-none");
  restartBtn.classList.remove("d-none");
}

/* =======================================
   REINICIAR
   ======================================= */
restartBtn.onclick = () => {
  current = 0;
  shuffle(questions); // 🔀 Mezcla de nuevo
  loadQuestion();
};

/* Iniciar trivia */
loadQuestion();
