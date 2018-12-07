class Phrase {

  constructor(phrase) {
    this.phrase = phrase;
  }


  //will print the Phrase onto the screen according to mockup
  addPhraseToDisplay(phraseArray){
    for (let i=0; i<phraseArray.length; i++){
      let li = document.createElement('li');
      li.textContent = phraseArray[i];
      if (phraseArray[i]!==" "){
        li.classList.add = "letter";
        li.classList.add = "hide";
      } else {
        li.className = "space";
      }
      let phraseUl = document.querySelector('#phrase ul');
      phraseUl.appendChild(li);
    }
  }

  //if letter matches anything it'll return the letter. otherwise it'll return null.
  checkLetter(keybutton){
    let letters = document.querySelectorAll('.letter');
    let result = null;
    for (let i=0; i<letters.length; i++){
      if (letters[i].textContent.toUpperCase() == keybutton.textContent.toUpperCase()){
        result = keybutton;
      }
    }
    return result;
  }


  showMatchedLetter(matchedLetter){
    let letters = document.querySelectorAll('.letter');
    for (let i=0; i<letters.length; i++){
      if (letters[i].textContent.toUpperCase() == matchedLetter.toUpperCase()){
        letters[i].classList.remove("hide");
      }
    }
  }

}
