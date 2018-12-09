let gameObj;
let overlay = document.getElementById('overlay');
let startButton = document.querySelector('#btn__reset');
let qwerty = document.getElementById('qwerty');
let qwertyButtons = document.querySelectorAll('#qwerty button');
let keysPressed = "";

//hide start screen overlay
function resetDisplay(){
  overlay.classList.add('move');
}

//disables button on click/keypress and calls Game.handleInteraction();
function markButton(e=null, buttonPressed){
  let returnValue = gameObj.handleInteraction(buttonPressed);
  if (e!=null){
    if (returnValue){
      e.target.classList.add('chosen');
    } else {
      e.target.classList.add('wrong');
    }
    e.target.setAttribute('disabled','true');
  } else {
    for (let i=0; i<qwertyButtons.length; i++){
      if(qwertyButtons[i].innerHTML == buttonPressed){
        if (returnValue){
          qwertyButtons[i].classList.add('chosen');
        } else {
          qwertyButtons[i].classList.add('wrong');
        }
      }
    }
  }
}

//clicking the start button calls the reset display function
startButton.addEventListener('click', () =>{
  resetDisplay();
  gameObj = new Game();
  gameObj.startGame();
});

//event listener for on-screen keyboard
qwerty.addEventListener('click', (e) => {
  if (e.target.tagName == "BUTTON"){
    let clickedLetter = e.target.innerHTML;
    markButton(e, clickedLetter);
  }
});

//event listener for when the physical keyboard is pressed
window.addEventListener('keypress', (e) => {
  if (!keysPressed.includes(e.key)){
    if (overlay.classList.contains('move')){
      let result = /[a-z]/i.test( e.key );
      if (result){
        markButton(null, e.key);
      }
    }
    keysPressed += e.key;
  }
});

function restartKeysPressed(){
  keysPressed = "";
}
