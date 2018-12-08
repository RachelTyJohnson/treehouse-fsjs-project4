class Game {

  constructor(){
    this.missed = 0;
    this.phrases = [
      "Google Overlord",
      "I cast Fireball",
      "Data Never Lies",
      "This is Dog",
      "Marry Me"
    ];
    this.phraseObj; //the phrase Object
  }

  //returns random phrase as array of chars
  getRandomPhrase(){
    let diceroll = Math.floor( Math.random()*this.phrases.length);
    return this.phrases[diceroll].split("");
  }

  handleInteraction(button){
    let match = this.phraseObj.checkLetter(button);
    if (match!=null){ //checkLetter returned a letter
      this.phraseObj.showMatchedLetter(button);
      this.checkForWin();
    } else { //checkletter returned null, no match
      console.log("not match");
      this.removeLife();
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

  //checks if all existing letters have been selected
  checkForWin(){
    let shown = document.querySelectorAll('.show');
    let letters = document.querySelectorAll('.letter');
    if (shown.length == letters.length){
      this.gameOver(true);
    }
  }

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

  startGame(){
    let randomPhrase = this.getRandomPhrase();
    this.phraseObj = new Phrase(randomPhrase);
    this.phraseObj.addPhraseToDisplay();
  }
}
