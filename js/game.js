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
  }

  //returns random phrase as array of chars
  getRandomPhrase(){
    let diceroll = Math.floor( Math.random()*this.phrases.length);
    return this.phrases[diceroll].split("");
  }

  handleInteraction(){

  }

  //this method removes a life and heart from the board.
  //Also checks if the players has hit 5 misses, if so init end game
  removeLife(){
    let scoreboard = document.querySelector('#scoreboard ol');
    missed++;
    scoreboard.removeChild(scoreboard.firstElementChild);
    let lostHeartLi = document.createElement('li');
    lostHeartLi.className = "tries";
    let lostHeartImg = document.createElement('img');
    lostHeartImg.src = "images/lostHeart.png";
    lostHeartLi.appendChild(lostHeartImg);
    scoreboard.appendChild(lostHeartLi);
    if (missed==5){
      gameOver(false);
    }
  }

  //checks if all existing letters have been selected
  checkForWin(){
    let shown = document.querySelectorAll('.show');
    let letters = document.querySelectorAll('.letter');
    if (shown.length == letters.length){
      gameOver(true);
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
    console.log(randomPhrase);
    const newPhrase = new Phrase(randomPhrase);
  }

}
