import { choicesArr } from "./data.js";

document.addEventListener("DOMContentLoaded", (event) => {
  const closeRulesBtn = document.getElementById("close-rules-btn");
  const rulesContainer = document.getElementById("rules-container");
  const rulesBtn = document.getElementById("rules-btn");
  const rulesShaodwOverlay = document.getElementById("rules-shadow-overlay");
  const scoreCount = document.getElementById("score-count");
  const gameContainer = document.getElementById("game-container");

  let playerChosen = "";
  let houseChosen = "";
  let winnerText = "";
  let score = 0;

  startGame();

  closeRulesBtn.addEventListener("click", () => {
    rulesContainer.classList.toggle("hidden");
    rulesShaodwOverlay.classList.toggle("hidden");
  });
  rulesBtn.addEventListener("click", () => {
    rulesContainer.classList.toggle("hidden");
    rulesShaodwOverlay.classList.toggle("hidden");
  });

  gameContainer.addEventListener("click", (e) => {
    const chosen = e.target.closest(".choice-container");
    const choicePart = document.querySelector(".choice-part");
    if (chosen) {
      choicePart.classList.add("fade-out");
      choicePart.addEventListener(
        "animationend",
        () => {
          playerChosen = chosen.id;
          houseDecision();
          playerDecision(playerChosen);
          endGame();
        },
        { once: true }
      );
    }
    if (e.target.classList.contains("play-again-btn")) {
      startGame();
    }
  });

  function startGame() {
    let gameChoices = "";
    choicesArr.forEach((choice) => {
      gameChoices += `
          <div id="${choice.id}" class="${choice.name}-container choice-container">
              <div class="choice">
                  <img src="./images/icon-${choice.name}.svg" alt="${choice.name}" />
              </div>
          </div>
      `;
    });
    gameContainer.innerHTML = `
    <div class="choice-part">${gameChoices} 
        <div class="triangle-bg-container">
            <img src="./images/bg-triangle.svg" />
        </div>
    </div>`;
    gameChoices = "";
  }

  function houseDecision() {
    const i = Math.floor(Math.random() * choicesArr.length);
    houseChosen = choicesArr[i].id;
  }

  function playerDecision(chosenId) {
    const choice = choicesArr.find((c) => c.id === chosenId);
    if (!choice) return;

    if (houseChosen === choice.beats) {
      winnerText = "You win";
      score++;
      scoreCount.innerText = score;
    } else if (houseChosen === choice.losesTo) {
      winnerText = "You lose";
      if (score > 0) {
        score--;
      }
      scoreCount.innerText = score;
    } else if (houseChosen === playerChosen) {
      winnerText = "Draw";
    }
  }

  function endGame() {
    const playerChoice = choicesArr.find((c) => c.id === playerChosen);
    const houseChoice = choicesArr.find((c) => c.id === houseChosen);
    const gameChoices = `
    <div class="end-game-choice">
      <div class="${playerChoice.name}-container player-box fade-in">
              <div class="choice">
                  <img src="./images/icon-${playerChoice.name}.svg" alt="${playerChoice.name}" />
              </div>
      </div>
      <p class="end-game-desc">Your picked</p>
    </div>
    <div class="end-game-solution hidden">
      <p class="winner-text">${winnerText}</p>
      <button class="play-again-btn">PLAY AGAIN</button>
    </div>
    <div id="house-end-game-choice" class="end-game-choice">
      <div class="placeholder-house fade-in-out">
      </div>
      <p class="end-game-desc">The house picked</p>
    </div>
    `;
    gameContainer.innerHTML = `<div class="versus-part">${gameChoices}</div>`;

    setTimeout(() => {
      document.getElementById(
        "house-end-game-choice"
      ).innerHTML = `<div class="${houseChoice.name}-container house-box fade-in">
              <div class="choice">
                  <img src="./images/icon-${houseChoice.name}.svg" alt="${houseChoice.name}" />
              </div>
      </div>
      <p class="end-game-desc">The house picked</p>`;
    }, 1100);

    setTimeout(() => {
      document.querySelector(".versus-part").classList.add("versus-part-2");
      document.querySelector(".end-game-solution").classList.remove("hidden");
    }, 1400);
  }
});