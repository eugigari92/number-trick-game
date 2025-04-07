let steps = [
    "Pensa un numero intero qualsiasi.",
    "Moltiplica quel numero per 2.",
    "⏳ Attendi...",
    "Dividi il risultato per 2.",
    "Ora sottrai il numero che avevi pensato.",
    "Il risultato è..."
  ];
  
  let currentStep = 0;
  let numeroPari = 0;
  
  const stepDiv = document.getElementById("step");
  const nextBtn = document.getElementById("nextBtn");
  const inputStepDiv = document.getElementById("input-step");
  const userNumberInput = document.getElementById("userNumberInput");
  const startBtn = document.getElementById("startBtn");
  
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
        stepDiv.innerHTML = `
          Il risultato è...
          <span class="result-number">${risultato} 🎯</span>
        `;
        nextBtn.textContent = "Ricomincia";
        nextBtn.style.display = "inline-block";
      }, 1500); // Suspense di 1.5 secondi
    } else {
      stepDiv.textContent = steps[currentStep];
      nextBtn.textContent = currentStep < steps.length - 1 ? "Avanti" : "Ricomincia";
    }
  
    stepDiv.classList.add("fade-in");
  }
  
  
  
  // Clic su "Avanti"
  nextBtn.addEventListener("click", () => {
    currentStep++;
  
    if (currentStep === 2) {
      // Stop: chiede il numero pari
      nextBtn.style.display = "none";
      inputStepDiv.style.display = "block";
      stepDiv.textContent = "Ora scegli un numero pari da aggiungere:";
      return;
    }
  
    if (currentStep < steps.length) {
      showStep();
    } else {
      // Riavvia tutto
      currentStep = 0;
      numeroPari = 0;
      steps[2] = "⏳ Attendi...";
      steps[5] = "Il risultato è...";
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
    steps[2] = `Aggiungi ${numeroPari}.`;
    steps[5] = `Il risultato è... ${risultato}! 🎯`;
  
    inputStepDiv.style.display = "none";
    nextBtn.style.display = "block";
    showStep(); // Mostra subito lo step 2 aggiornato
  });

  showStep(); // Mostra subito il primo step

  