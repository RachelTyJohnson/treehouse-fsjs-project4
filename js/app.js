let gameObj;
let overlay = document.getElementById('overlay');
let startButton = document.querySelector('#btn__reset');
let qwerty = document.getElementById('qwerty');

//hide start screen overlay
function resetDisplay(){
  overlay.classList.add('move');
}

function markButton(e,returnValue){
  if (returnValue){
    e.target.classList.add('chosen');
  } else {
    e.target.classList.add('wrong');
  }
  e.target.setAttribute('disabled','true');
}

startButton.addEventListener('click', () =>{
  resetDisplay();
  gameObj = new Game();
  gameObj.startGame();
});

qwerty.addEventListener('click', (e) => {
  if (e.target.tagName == "BUTTON"){
    let clickedLetter = e.target.innerHTML;
    let returnValue = gameObj.handleInteraction(clickedLetter);
    markButton(e,returnValue);
  }
});
