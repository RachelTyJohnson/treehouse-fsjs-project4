let gameObj;
let overlay = document.getElementById('overlay');
let startButton = document.querySelector('#btn__reset');
let qwerty = document.getElementById('qwerty');
let qwertyButtons = document.querySelectorAll('#qwerty button');

//hide start screen overlay
function resetDisplay(){
  overlay.classList.add('move');
}

function markButton(returnValue, e=null, buttonPressed){
  if (e!=null){
    if (returnValue){
      e.target.classList.add('chosen');
    } else {
      e.target.classList.add('wrong');
    }
    e.target.setAttribute('disabled','true');
  } else {
    for (let i=0; i<qwertyButtons.length; i++){
      console.log(buttonPressed);
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

startButton.addEventListener('click', () =>{
  resetDisplay();
  gameObj = new Game();
  gameObj.startGame();
});

qwerty.addEventListener('click', (e) => {
  if (e.target.tagName == "BUTTON"){
    let clickedLetter = e.target.innerHTML;
    let returnValue = gameObj.handleInteraction(clickedLetter);
    markButton(returnValue, e, null);
  }
});

window.addEventListener('keypress', (e) => {
  if (overlay.classList.contains('move')){
    let result = /[a-z]/i.test( e.key );
    if (result){
      let returnValue = gameObj.handleInteraction(e.key);
      markButton(returnValue, null, e.key);
    }
  }
});
