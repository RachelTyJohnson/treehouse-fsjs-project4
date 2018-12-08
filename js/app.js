let gameObj;
let overlay = document.getElementById('overlay');
let startButton = document.querySelector('#btn__reset');
let qwerty = document.getElementById('qwerty');

//hide start screen overlay
function resetDisplay(){
  overlay.classList.add('move');
}

startButton.addEventListener('click', () =>{
  resetDisplay();
  gameObj = new Game();
  gameObj.startGame();
});

qwerty.addEventListener('click', (e) => {
  if (e.target.tagName == "BUTTON"){
    let clickedLetter = e.target.innerHTML;
    gameObj.handleInteraction(clickedLetter);
  }
});
