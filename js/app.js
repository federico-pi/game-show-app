// -VARIABLES-
const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const overlay = document.getElementById('overlay');
const buttons = document.querySelectorAll('.keyrow button');
const imageOl = document.querySelectorAll('#scoreboard ol');
const imageLi = document.querySelectorAll('#scoreboard ol li');
const header = document.getElementsByTagName('h2')[0];
let missed = 0;

// -ARRAYS-
const phrases = [
  'Java is to JavaScript as car is to Carpet',
  'Hit the nail on the head',
  'Life is what you make of it',
  'Killing two birds with one stone',
  'Never judge a book by its cover'
];

// -FUNCTIONS-
function getRandomPhraseAsArray(arr) {
  const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
  const characters = Array.from(randomPhrase)
  return characters;
};

function addPhraseToDisplay(arr) {
  for (let i=0; i < arr.length; i++) {
    const ul = document.querySelector('#phrase ul');
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(arr[i]));
    ul.appendChild(li);
    if (arr[i] !== ' ') {
      li.classList.add('letter')
    } else {
      li.classList.add('space')
    }
  }
}

function checkLetter(guess) {
  const checkLetter = document.getElementsByTagName('li');
  let match = null
  for (let i=0; i < checkLetter.length; i++) {
    if (guess === checkLetter[i].innerText) {
      checkLetter[i].classList.add('show');
      match = guess
    }
  }
  return match
}

// -APP-
const phraseArray = getRandomPhraseAsArray(phrases);
const startingPage = document.getElementsByClassName('btn__reset')[0];
addPhraseToDisplay(phraseArray);

startingPage.addEventListener('click', () => {
  overlay.style.display = 'none'
});

qwerty.addEventListener('click', (pressed) => {
  if (pressed.target.tagName.toLowerCase() === 'button' && pressed.target.className.toLowerCase() !== 'chosen') {
    pressed.target.classList.add('chosen');
    const validation = checkLetter(pressed.target.innerText);
    if (validation === null) {
      imageOl[0].removeChild(imageLi[missed]);
      missed++
    }
  }
  const letterClass = document.getElementsByClassName('letter').length-1;
  const showClass = document.getElementsByClassName('show').length;
  if (letterClass === showClass) {
    overlay.classList.add('win');
    header.textContent = 'YOU WON, CONGRATS!';
    overlay.style.display = 'flex';
  } else if (missed > 4) {
    overlay.classList.add('lose');
    header.textContent = 'YOU LOST, TRY AGAIN!';
    overlay.style.display = 'flex';
  }
})

/* -RESTART GAME-
startingPage.addEventListener('click', () => {
  if (overlay.classList.contains('win') || overlay.classList.contains('lose')) {
    missed = 0;
    //recreate buttons on the keyboard
    //generate a new random phrase
  }
});
*/
