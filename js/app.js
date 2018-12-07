//Elements needed from html
let qwerty = document.getElementById('qwerty');
let phrase = document.getElementById('phrase');
let missed = 0; //if they miss 5 times, they lose
let scoreboard = document.querySelector('#scoreboard ol');
let overlay = document.getElementById('overlay');
let title = document.querySelector('#overlay .title');
let startButton = document.querySelector('.btn__reset');

//hide overlay
startButton.addEventListener('click', () =>{
  overlay.style.display = 'none';
  initGame();
});

//list of phrases
let phrases = [
  "Google Overlord",
  "I cast Fireball",
  "Data Never Lies",
  "This is Dog",
  "Marry Me"
];

//get random phrase as array of chars
function getRandomPhraseAsArray(array){
  let diceroll = Math.floor( Math.random()*array.length);
  return array[diceroll].split("");
}

//add chosen phrase array to display
function addPhraseToDisplay(charArray){
  for (let i=0; i<charArray.length; i++){
    let li = document.createElement('li');
    li.textContent = charArray[i];
    if (charArray[i]!==" "){
      li.className = "letter";
    } else {
      li.className = "space";
    }
    let phraseUl = document.querySelector('#phrase ul');
    phraseUl.appendChild(li);
  }
}

//init game
function initGame(){
  clearKeyboard();
  clearScoreboard();
  clearPhrase();
  missed = 0;
  let phraseArray = getRandomPhraseAsArray(phrases);
  addPhraseToDisplay(phraseArray);
}

//clear phrase
function clearPhrase(){
  phrase.removeChild(phrase.firstElementChild);
  let newUl = document.createElement('ul');
  phrase.append(newUl);
}

//clear keyboard
function clearKeyboard(){
  let keyboardLetters = document.querySelectorAll('#qwerty button');
  for (i=0; i<keyboardLetters.length; i++){
    keyboardLetters[i].disabled = false;
    keyboardLetters[i].classList.remove('chosen');
  }
}

//clear scoreboard
function clearScoreboard(){
  for (let i=0; i<5; i++){
    scoreboard.removeChild(scoreboard.firstElementChild);
    let lostHeartLi = document.createElement('li');
    lostHeartLi.className = "tries";
    let lostHeartImg = document.createElement('img');
    lostHeartImg.src = "images/liveHeart.png";
    lostHeartLi.appendChild(lostHeartImg);
    scoreboard.appendChild(lostHeartLi);
  }
}


//Check For Letter!
function checkLetter(keybutton){
  let letters = document.querySelectorAll('.letter');
  let result = null;
  for (let i=0; i<letters.length; i++){
    if (letters[i].textContent.toUpperCase() == keybutton.textContent.toUpperCase()){
      letters[i].classList.add("show");
      result = keybutton;
    }
  }
  return result;
}

//button that will init checking for letter
qwerty.addEventListener('click', (e) => {
  if (e.target.tagName == "BUTTON"){
    e.target.className = "chosen";
    e.target.disabled = true;
    let letterFound = checkLetter(e.target);
    if (letterFound === null) {
      missed++;
      scoreboard.removeChild(scoreboard.firstElementChild);
      let lostHeartLi = document.createElement('li');
      lostHeartLi.className = "tries";
      let lostHeartImg = document.createElement('img');
      lostHeartImg.src = "images/lostHeart.png";
      lostHeartLi.appendChild(lostHeartImg);
      scoreboard.appendChild(lostHeartLi);
    }
    checkWin();
  }
});

//Check if ya won!
function checkWin(){
  if (missed===5){
    overlay.className = "lose";
    title.textContent = "You Lost!";
    startButton.textContent = "Play Again!";
    overlay.style.display = 'flex';
  }
  let shown = document.querySelectorAll('.show');
  let letters = document.querySelectorAll('.letter');
  if (shown.length == letters.length){
    overlay.className = "win";
    title.textContent = "You Win!";
    startButton.textContent = "Play Again!"
    overlay.style.display = 'flex';
  }
}
