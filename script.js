(function initGame(){

  // IIFE variables
  let computerScore = 0;
  let playerScore = 0;

  // EVENT LISTENERS
  let iconsDiv = document.querySelector(".icons-div");
  let scoreboardDiv = document.querySelector(".scoreboard-div");
  let icons = document.querySelectorAll(".icons");
  let score = document.querySelector(".score");
  let updatedResults = document.querySelector(".updated-results");
  let gameOver = document.querySelector(".game-over");

  icons.forEach(icon => {
    icon.addEventListener('click', playRound);
  });

  // MAIN GAME FUNCTION
  function playRound(event){
    let computerChoice = computerPlay();
    let playerChoice = event.target.classList.contains("rock-icon") ? "rock" : event.target.classList.contains("paper-icon") ? "paper" : "scissors";
    let singleGameResult = evaluateChoices(computerChoice, playerChoice);
    updateScore(singleGameResult);
    isGameOver(computerScore, playerScore);
  }

  // SUPPORTING GAME FUNCTION 
  function computerPlay(){
    let computerChoices = ["rock", "paper", "scissors"];
    return computerChoices[Math.floor(Math.random() * computerChoices.length)];
  }

  function evaluateChoices(computerChoice, playerChoice){
    let outcome = `Robot: ${computerChoice} - You: ${playerChoice}. `;
    switch(`${computerChoice}-${playerChoice}`){
      case "rock-rock":
      case "paper-paper":
      case "scissors-scissors":
        outcome += "Tie game!";
        break;
      case "scissors-paper":
      case "paper-rock":
      case "rock-scissors":
        outcome += "You lose!";
        break;
      case "paper-scissors":
      case "rock-paper":
      case "scissors-rock":
        outcome += "You win!";
        break;
      default:
        outcome = "Not sure...";
    }
    updatedResults.textContent = outcome;
    return outcome;
  }

  function updateScore(singleGameResult){
    if(singleGameResult.includes("win")){
      playerScore += 1;
    } else if(singleGameResult.includes("lose")){
      computerScore += 1;
    } else {
      computerScore += 0;
    }
    score.textContent = `Robot ${computerScore} - You ${playerScore}.`;
  }

  function isGameOver(computerScore, playerScore){
    if(computerScore === 5 || playerScore === 5){
      hideGameDivs();
      showGameDiv();
    }
  }

  function hideGameDivs(){
    iconsDiv.style.display = "none";
    scoreboardDiv.style.display = "none";
  }

  function showGameDiv(){
    gameOverElements();
    playAgainButton();
  }

  function gameOverElements(){
    let gameOverElement = document.createElement("h3");
    gameOverElement.classList.add("game-over-text");
    gameOverElement.textContent =computerScore === 5 ? `Robot won ${computerScore} to ${playerScore}...` : `You won ${playerScore} to ${computerScore}!`;
    gameOver.appendChild(gameOverElement)
  }

  function playAgainButton() {
    let playAgainButton = document.createElement("button");
    playAgainButton.classList.add("btn");
    playAgainButton.textContent = "Play Again?"
    gameOver.appendChild(playAgainButton);
    playAgainButton.addEventListener('click', function(event){
      if(event.target.className === "btn"){
        location.reload();
      }
    });
  }

})()