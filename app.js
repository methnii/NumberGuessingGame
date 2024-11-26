let randomNumber;
let remainingChances;
let gameOver;

function initializeGame() {
  randomNumber = Math.floor(Math.random() * 10) + 1;
  remainingChances = 3;
  gameOver = false;
  document.getElementById(
    "chances"
  ).textContent = `Chances left: ${remainingChances}`;
  document.getElementById("message").textContent = "";
  document.getElementById("guessInput").value = "";
  document.getElementById("resetBtn").classList.add("d-none");
  document.getElementById("guessInput").disabled = false;
  console.log("Random number:", randomNumber);
}

function makeGuess() {
  if (gameOver) return;

  const guessInput = document.getElementById("guessInput");
  const guess = parseInt(guessInput.value);
  const messageElement = document.getElementById("message");

  if (isNaN(guess) || guess < 1 || guess > 10) {
    messageElement.textContent = "Please enter a valid number between 1 and 10";
    messageElement.style.color = "#f44336";
    return;
  }

  remainingChances--;
  document.getElementById(
    "chances"
  ).textContent = `Chances left: ${remainingChances}`;

  if (guess === randomNumber) {
    messageElement.textContent = "🎉 Congratulations! You won! 🎉";
    messageElement.style.color = "#4caf50";
    endGame(true);
  } else {
    const hint = guess > randomNumber ? "Too high!" : "Too low!";
    messageElement.textContent = hint;
    messageElement.style.color = "#ec407a";

    if (remainingChances === 0) {
      messageElement.textContent = `Game Over! The number was ${randomNumber}`;
      messageElement.style.color = "#f44336";
      endGame(false);
    }
  }

  guessInput.value = "";
}

function endGame(won) {
  gameOver = true;
  document.getElementById("guessInput").disabled = true;
  document.getElementById("resetBtn").classList.remove("d-none");
}

function resetGame() {
  initializeGame();
}

document.addEventListener("DOMContentLoaded", function () {
  initializeGame();

  document
    .getElementById("guessInput")
    .addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        makeGuess();
      }
    });
});
