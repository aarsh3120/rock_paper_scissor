let playerScore = 0;
let computerScore = 0;

function playerChoice(choice) {
  const computerChoice = getComputerChoice();
  const result = determineWinner(choice, computerChoice);
  updateScores(result);
  displayOutcome(result, choice, computerChoice);
  updateLocalStorage();
}

function getComputerChoice() {
  const choices = ['stone', 'paper', 'scissors'];
  const randomIndex = Math.floor(Math.random() * 3);
  return choices[randomIndex];
}

function determineWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) return 'tie';
  if (
    (playerChoice === 'stone' && computerChoice === 'scissors') ||
    (playerChoice === 'paper' && computerChoice === 'stone') ||
    (playerChoice === 'scissors' && computerChoice === 'paper')
  ) {
    return 'win';
  }
  return 'lose';
}

function updateScores(result) {
  if (result === 'win') {
    playerScore++;
  } else if (result === 'lose') {
    computerScore++;
  }
  updateScoreboard();
}

function updateScoreboard() {
  document.getElementById('playerScore').textContent = playerScore;
  document.getElementById('computerScore').textContent = computerScore;
}




function displayOutcome(result, playerChoice, computerChoice) {
  const outcomeMessage = document.createElement('p');
  const gameDiv = document.getElementById('game');
  const rulesButton = document.getElementById('rulesButton');
  const nextButton = document.createElement('button');

  if (result === 'win') {
    outcomeMessage.textContent = `YOU WIN AGAINST PC ${playerChoice} beats ${computerChoice}.`;
    gameDiv.innerHTML = '';
    playCelebrationAnimation();
    addNextButton(rulesButton, nextButton);
  } else if (result === 'lose') {
    outcomeMessage.textContent = `YOU LOST AGAINST PC ${computerChoice} beats ${playerChoice}.`;
    gameDiv.innerHTML = '';
  } else {
    outcomeMessage.textContent = `TIE UP ${playerChoice}.`;
    gameDiv.innerHTML = '';
    addReplayButton();
    return;
  }

  gameDiv.appendChild(outcomeMessage);
  addPlayAgainButton();
}

function addNextButton(previousButton, nextButton) {
  nextButton.textContent = 'Next';
  nextButton.classList.add('next-button'); // Apply the CSS class

  nextButton.onclick = function () {
    playCelebrationAnimation(); // Play the celebration animation
    // Add logic for the "Next" button action
    // For example, you can navigate to the next step or level
    // You can replace the following line with your specific logic
    // alert('Next button clicked!');
  };

  // Insert the nextButton to the right of the previousButton
  previousButton.parentNode.insertBefore(nextButton, previousButton.nextSibling);

  // Show the nextButton
  nextButton.style.display = 'inline-block';
}


function addReplayButton() {
  const replayButton = document.createElement('button');
  replayButton.textContent = 'Replay';
  replayButton.classList.add('replay-button'); // Apply the CSS class
  replayButton.onclick = function () {
    const gameDiv = document.getElementById('game');
    gameDiv.innerHTML = '<button onclick="playerChoice(\'stone\')">Stone</button>' +
                        '<button onclick="playerChoice(\'paper\')">Paper</button>' +
                        '<button onclick="playerChoice(\'scissors\')">Scissors</button>';
  };
  document.getElementById('game').appendChild(replayButton);
}

function addPlayAgainButton() {
  const playAgainButton = document.createElement('button');
  playAgainButton.textContent = 'Play Again';
  playAgainButton.classList.add('play-again-button'); // Apply the CSS class
  playAgainButton.onclick = resetGame;
  document.getElementById('game').appendChild(playAgainButton);
}

function resetGame() {
  const gameDiv = document.getElementById('game');
  gameDiv.innerHTML = '<button onclick="playerChoice(\'stone\')">Stone</button>' +
                      '<button onclick="playerChoice(\'paper\')">Paper</button>' +
                      '<button onclick="playerChoice(\'scissors\')">Scissors</button>';
}

function playCelebrationAnimation() {
  const gameDiv = document.getElementById('game');
  const scoreDiv = document.getElementById('scoreboard')
  // Clear specific elements
  // gameDiv.style.display = 'none';
  // // scoreDiv.style.display = 'none';

  // Create celebration elements
  const celebrationContainer = document.createElement('div');
  celebrationContainer.classList.add('celebration-container');

  const trophyImage = document.createElement('img');
  trophyImage.src = 'images/trophy.png'; // Set the path to your trophy image
  trophyImage.classList.add('celebration-image');

  const starsImage = document.createElement('img');
  starsImage.src = 'images/stars.png'; // Set the path to your stars image
  starsImage.classList.add('celebration-image');

  const congratulationMessage = document.createElement('p');
  congratulationMessage.textContent = 'HURRAY!! YOU WON THE GAME';
  congratulationMessage.classList.add('celebration-message');

  const playAgainButton = document.createElement('button');
  playAgainButton.textContent = 'Play Again';
  playAgainButton.classList.add('celebration-button');
  playAgainButton.onclick = resetGame;

  // Append elements to the celebration container
  celebrationContainer.appendChild(trophyImage);
  celebrationContainer.appendChild(starsImage);
  celebrationContainer.appendChild(congratulationMessage);
  celebrationContainer.appendChild(playAgainButton);

  // Append the celebration container to the game div
  gameDiv.appendChild(celebrationContainer);

  // Add the "Rules" button
  addRulesButton();
}

function addRulesButton() {
  const rulesButton = document.createElement('button');
  rulesButton.textContent = 'Rules';
  rulesButton.classList.add('rules');
  rulesButton.onclick = showRules;
  document.getElementById('game').appendChild(rulesButton);
}

// function showRules() {
//   alert("Rules:\nRock beats scissors, scissors beats paper, and paper beats rock. \nAgree ahead of time whether you'll count off 'rock, paper, scissors, shoot' or just 'rock, paper, scissors.'\n Use rock, paper, scissors to settle minor decisions or simply play to pass the time.\nIf both players lay down the same hand, each player lays down another hand.");
// }

function showRules() {
  const box = document.getElementById('box');
  if (box) {
    box.style.display = 'block'; // You can use 'block', 'flex', or any other appropriate value
  }
}

function hideRules() {
  const box = document.getElementById('box');
  if (box) {
    box.style.display = 'none';
  }
}

function updateLocalStorage() {
  localStorage.setItem('playerScore', playerScore);
  localStorage.setItem('computerScore', computerScore);
}

// Load scores from local storage on page load
window.onload = function () {
  playerScore = parseInt(localStorage.getItem('playerScore')) || 0;
  computerScore = parseInt(localStorage.getItem('computerScore')) || 0;
  updateScoreboard();
};
