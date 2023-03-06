'use Strict';
console.log('connected');

// Element Selection

const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');
const score0EL = document.getElementById('score--0');
const score1EL = document.getElementById('score--1');
const current0EL = document.getElementById('current--0');
const current1EL = document.getElementById('current--1');
const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting Conditions

score0EL.textContent = 0;
score1EL.textContent = 0;
diceEL.classList.add('hidden');

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

// switching player function
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
};

// Dice Roll Function

btnRoll.addEventListener('click', function () {
  //Generating Dice Roll

  const dice = Math.trunc(Math.random() * 6) + 1;
  console.log(dice);

  // Displaying the Dice & Adding the dice.png img in the source

  diceEL.classList.remove('hidden');
  diceEL.src = `dice-${dice}.png`;

  // Check the dice is 1
  if (dice !== 1) {
    // Add dice to current score
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    // Switch Player
    switchPlayer();
  }
});

// Hold the current Score

btnHold.addEventListener('click', function () {
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];

  // Finish the game

  if (scores[activePlayer] >= 100) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');

    btnRoll.disabled = true;
    btnHold.disabled = true;
    diceEL.classList.add('hidden');
  } else {
    switchPlayer();
  }
});

const reset = function () {
  player0EL.classList.remove('player--winner');
  player1EL.classList.remove('player--winner');
  player0EL.classList.add('player--active');
  player1EL.classList.remove('player--active');
  scores[0] = 0;
  scores[1] = 0;

  score0EL.textContent = 0;
  score1EL.textContent = 0;
  current0EL.textContent = 0;
  current1EL.textContent = 0;
  btnRoll.disabled = false;
  btnHold.disabled = false;
};

btnNew.addEventListener('click', reset); // reset the game
