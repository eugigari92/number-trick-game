let steps = [
    "Pensa un numero intero qualsiasi. E ricordatelo !",
    "Moltiplica quel numero per 2.",
    "⏳ Attendi...",
    "Dividi il risultato per 2.",
    "Ora sottrai il numero che avevi pensato all'inizio.",
    "Il risultato è..."
  ];
  
  let currentStep = 0;
  let numeroPari = 0;
  
  const stepDiv = document.getElementById("step");
  const nextBtn = document.getElementById("nextBtn");
  const inputStepDiv = document.getElementById("input-step");
  const userNumberInput = document.getElementById("userNumberInput");
  const startBtn = document.getElementById("startBtn");
  const clockSound = new Audio("mouse-click.mp3");
  const tadaSound = new Audio("tada-fanfare.mp3");
  document.getElementById("shareBtn").style.display = "none";
  document.getElementById("shareMsg").style.display = "none";



  
  // Funzione per mostrare lo step attuale
  function showStep() {
    stepDiv.classList.remove("fade-in");
    void stepDiv.offsetWidth; // forza il reflow
  
    if (currentStep === steps.length - 1) {
      // Ultimo step: suspense
      const risultato = numeroPari / 2;
      stepDiv.innerHTML = "Il risultato è...";
      nextBtn.style.display = "none"; // nasconde il bottone un attimo
  
      setTimeout(() => {
        tadaSound.play();
        confetti({
            particleCount: 150,
            spread: 90,
            origin: { y: 0.6 }
        });
        stepDiv.innerHTML = `
          Il risultato è...
          <span class="result-number">${risultato} 🎯</span>
        `;
        nextBtn.textContent = "Ricomincia";
        nextBtn.style.display = "inline-block";
      }, 1000); // Suspense di 1 secondi
    } else {
      stepDiv.textContent = steps[currentStep];
      nextBtn.textContent = currentStep < steps.length - 1 ? "Avanti" : "Ricomincia";
    }
  
    stepDiv.classList.add("fade-in");
  }
  
  
  
  // Clic su "Avanti"
  nextBtn.addEventListener("click", () => {
    clockSound.play(); // suono clic
  
    currentStep++;
  
    if (currentStep === 2) {
      // Stop: chiedi il numero pari
      nextBtn.style.display = "none";
      inputStepDiv.style.display = "block";
      stepDiv.textContent = "Ora scegli un numero pari:";
      return;
    }
  
    if (currentStep === steps.length - 1) {
      // Ultimo step: suspense + tada
      const risultato = numeroPari / 2;
      stepDiv.innerHTML = "Il risultato è...";
      nextBtn.style.display = "none";
  
      setTimeout(() => {
        tadaSound.play(); // suono finale
        confetti({
            particleCount: 150,
            spread: 90,
            origin: { y: 0.6 }
        });
        stepDiv.innerHTML = `
          Il risultato è...
          <span class="result-number">${risultato} 🎯</span>
        `;
        document.getElementById("shareBtn").style.display = "inline-block";
        nextBtn.textContent = "Ricomincia";
        nextBtn.style.display = "inline-block";
      }, 1000);
      return;
    }
  
    if (currentStep < steps.length) {
      showStep();
    } else {
      // Reset del gioco
      currentStep = 0;
      numeroPari = 0;
      steps[2] = "⏳ Attendi...";
      steps[5] = "Il risultato è...";
      document.getElementById("shareBtn").style.display = "none";
      document.getElementById("shareMsg").style.display = "none";
      showStep();
    }
  });
  
  
  // Clic su "Continua" dopo aver inserito il numero pari
  startBtn.addEventListener("click", () => {
    const val = parseInt(userNumberInput.value);
  
    if (isNaN(val) || val <= 0 || val % 2 !== 0) {
      alert("Per favore inserisci un numero pari valido!");
      return;
    }
  
    numeroPari = val;
    const risultato = numeroPari / 2;
  
    // Aggiorna gli step dinamicamente
    steps[2] = `Bene, allora aggiungi proprio ${numeroPari}.`;
    steps[5] = `Il risultato è... ${risultato}! 🎯`;
  
    inputStepDiv.style.display = "none";
    nextBtn.style.display = "block";
    showStep(); // Mostra subito lo step 2 aggiornato
  });

  showStep(); // Mostra subito il primo step

  shareBtn.addEventListener("click", () => {
    const link = "https://eugigari92.github.io/number-trick-game";
  
    navigator.clipboard.writeText(link).then(() => {
      shareMsg.style.display = "block";
      setTimeout(() => {
        shareMsg.style.display = "none";
      }, 2000);
    }).catch(() => {
      alert("Non è stato possibile copiare il link.");
    });
  });

  