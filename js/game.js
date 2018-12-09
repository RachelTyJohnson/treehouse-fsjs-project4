class Game {

  constructor(){
    this.missed = 0;
    this.phrases = [
      "Google Overlord",
      "I cast Fireball",
      "Data Never Lies",
      "This is Dog",
      "Marry Me",
      "This is it",
      "Why not me",
      "Milk and Sugar",
      "Milk and Honey",
      "Gone Fishing",
      "Time to sleep"
    ];
    this.phraseObj; //the phrase Object
  }

  //returns random phrase as array of chars
  getRandomPhrase(){
    let diceroll = Math.floor( Math.random()*this.phrases.length);
    return this.phrases[diceroll].split("");
  }

  //checks player selection and assess win/lose
  handleInteraction(button){
    let match = this.phraseObj.checkLetter(button);
    let returnValue = false;
    if (match!=null){ //checkLetter returned a letter
      this.phraseObj.showMatchedLetter(button);
      this.checkForWin();
      returnValue = true;
    } else { //checkletter returned null, no match
      this.removeLife();
    }
    return returnValue;
  }

  //checks if all existing letters have been selected
  checkForWin(){
    let shown = document.querySelectorAll('.show');
    let letters = document.querySelectorAll('.letter');
    if (shown.length == letters.length){
      this.gameOver(true);
    }
  }

  //this method removes a life and heart from the board.
  //Also checks if the players has hit 5 misses, if so init end game
  removeLife(){
    let scoreboard = document.querySelector('#scoreboard ol');
    this.missed++;
    scoreboard.removeChild(scoreboard.firstElementChild);
    let lostHeartLi = document.createElement('li');
    lostHeartLi.className = "tries";
    let lostHeartImg = document.createElement('img');
    lostHeartImg.src = "images/lostHeart.png";
    lostHeartLi.appendChild(lostHeartImg);
    scoreboard.appendChild(lostHeartLi);
    if (this.missed==5){
      this.gameOver(false);
    }
  }

  //function to display endgame message and button to start again
  gameOver(gameWon){
    let overlay = document.getElementById('overlay');
    let title = document.querySelector('#overlay .title');
    let startButton = document.querySelector('#btn__reset');
    if (gameWon){
      overlay.className = "win";
      title.textContent = "You Win!";
      startButton.textContent = "Play Again!"
      overlay.style.display = 'flex';
    } else {
      overlay.className = "lose";
      title.textContent = "You Lost!";
      startButton.textContent = "Play Again!";
      overlay.style.display = 'flex';
    }
  }

  //clear keyboard for replay
  clearKeyboard(){
    let keyboardLetters = document.querySelectorAll('#qwerty button');
    for (let i=0; i<keyboardLetters.length; i++){
      keyboardLetters[i].disabled = false;
      keyboardLetters[i].classList.remove('chosen', 'wrong');
    }
  }

  //clear scoreboard for replay
  clearScoreboard(){
    for (let i=0; i<5; i++){
      let scoreboard = document.querySelector('#scoreboard ol');
      scoreboard.removeChild(scoreboard.firstElementChild);
      let lostHeartLi = document.createElement('li');
      lostHeartLi.className = "tries";
      let lostHeartImg = document.createElement('img');
      lostHeartImg.src = "images/liveHeart.png";
      lostHeartImg.classList.add('animated', 'pulse', 'infinite');
      lostHeartLi.appendChild(lostHeartImg);
      scoreboard.appendChild(lostHeartLi);
    }
  }

  //clears board/lives/keyboard, chooses new phrase and prints it
  startGame(){
    this.clearKeyboard();
    this.clearScoreboard();
    restartKeysPressed();
    let randomPhrase = this.getRandomPhrase();
    this.phraseObj = new Phrase(randomPhrase);
    this.phraseObj.addPhraseToDisplay();
  }
}
