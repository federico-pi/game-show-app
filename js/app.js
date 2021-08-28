// -VARIABLES-
const startingPage = document.getElementsByClassName('btn__reset')[0];
const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const overlay = document.getElementById('overlay');
const buttons = document.querySelectorAll('.keyrow button');
const header = document.getElementsByTagName('h2')[0];
const description = document.getElementsByClassName('description')[0];
let missed = 0;
let lives = 5;

// -ARRAYS-
const phrases = [
  'Bread and butter',
  'Fair and square',
  'Food for thought',
  'Rag to riches',
  'Rule of thumb'
  /* -ITALIAN PHRASES-
  'Chi la dura la vince',
  'Vivi e lascia vivere',
  'Meglio tardi che mai',
  'Chi cerca trova',
  'Tentar non nuoce'
  */
];

// -FUNCTIONS-
function getRandomPhraseAsArray(e) {
  const randomPhrase = e[Math.floor(Math.random() * e.length)].toLowerCase();
  const characters = Array.from(randomPhrase)
  return characters;
};

function addPhraseToDisplay(e) {
  for (let i=0; i < e.length; i++) {
    const ul = document.querySelector('#phrase ul');
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(e[i]));
    ul.appendChild(li);
    if (e[i] !== ' ') {
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

function livesLeft(e) {
  if (e === 1) {
    return `${1} life`
  } else {
    return `${e} lives`
  }
}

// -APP-
const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);

startingPage.addEventListener('click', () => {
  overlay.style.display = 'none'
});

qwerty.addEventListener('click', (pressed) => {
  if (pressed.target.tagName.toLowerCase() === 'button' && pressed.target.className.toLowerCase() !== 'wrong') {
    const validation = checkLetter(pressed.target.innerText);
    if (validation === null) {
      pressed.target.classList.add('wrong');
      const hearts = document.getElementsByTagName('img')[missed];
      hearts.src = 'images/lostHeart.png';
      missed++;
      lives--
    } else {
      pressed.target.classList.add('chosen');
    }
  }

  const letterClass = document.getElementsByClassName('letter').length;
  const showClass = document.getElementsByClassName('show').length;
  if (letterClass === showClass) {
    overlay.classList.add('win');
    overlay.style.display = 'flex';
    description.textContent = `Congrats! You won with ${livesLeft(lives)} remaining!`;
    startingPage.textContent = 'Restart Game';
    header.textContent = 'The wheel of success';
    const ulLi = document.querySelectorAll('ul li');
    for (let i = 0; i < ulLi.length; i++) {
      ulLi[i].parentNode.removeChild(ulLi[i])
    }
  } else if (missed > 4) {
    overlay.classList.add('lose');
    overlay.style.display = 'flex';
    description.textContent = `You were pretty close on this one, try again!`;
    startingPage.textContent = 'Restart Game'
    header.textContent = 'The wheel of success';
    const ulLi = document.querySelectorAll('ul li');
    for (let i = 0; i < ulLi.length; i++) {
      ulLi[i].parentNode.removeChild(ulLi[i])
    }
  }
})

// -RESTART GAME-
startingPage.addEventListener('click', () => {
  if (overlay.classList.contains('win') || overlay.classList.contains('lose')) {
    missed = 0;
    lives = 5;
    const removeButtonClass = document.querySelectorAll('button');
    for (let i=0; i<removeButtonClass.length; i++) {
      removeButtonClass[i].classList.remove('chosen', 'wrong');
      }
    const hearts = document.getElementsByTagName('img');
    for (let i=0; i<hearts.length; i++) {
      hearts[i].src = 'images/liveHeart.png'
    }
    let newPhrase = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(newPhrase);
    }
    overlay.classList.remove('win', 'lose')
});
