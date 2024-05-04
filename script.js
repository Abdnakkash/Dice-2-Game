'use strict';

//Selecting Elemenet
const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');
const dice = document.querySelector('.dice');

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

// const current0 = document.querySelector('#current--0');
// const current1 = document.getElementById('#current--1');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting Condititon
score0.textContent = 0;
score1.textContent = 0;
dice.classList.add('hidden');

let score = [0, 0];
let currentScore = 0;
let active = 0;
let playing = true;

const playerChange = function () {
  document.getElementById(`current--${active}`).textContent = 0;
  currentScore = 0;
  active = active === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

const deleteScore = function (e) {
  document.querySelector(`#score--${e}`).textContent = '0';
  document.getElementById(`current--${e}`).textContent = '0';
};

// roll dice function
btnRoll.addEventListener('click', function () {
  if (playing) {
    // Make a random number
    const roll = Math.trunc(Math.random() * 6 + 1);
    // display the dice
    dice.classList.remove('hidden');
    dice.src = `dice-${roll}.png`;
    // check if dice in 1 then rest the score
    if (roll !== 1) {
      currentScore += roll;
      document.getElementById(`current--${active}`).textContent = currentScore;
    } else {
      playerChange();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    score[active] += currentScore;
    currentScore = 0;
    document.querySelector(`#score--${active}`).textContent = score[active];
  }
  if (score[active] >= 20) {
    playing = false;
    dice.classList.add('hidden');
    document
      .querySelector(`.player--${active}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${active}`)
      .classList.remove('player--active');
  } else {
    playerChange();
  }
});

btnNew.addEventListener('click', function () {
  playing = true;
  score = [0, 0];
  document
    .querySelector(`.player--${active}`)
    .classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  dice.classList.add('hidden');
  deleteScore(0);
  deleteScore(1);
});
