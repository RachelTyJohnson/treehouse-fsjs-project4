class Phrase {

  constructor(phrase) {
    this.phrase = phrase;
  }


  //will print the Phrase onto the screen according to mockup
  addPhraseToDisplay(){
    //first clear the board
    let phrase = document.getElementById('phrase');
    phrase.removeChild(phrase.firstElementChild);
    let newUl = document.createElement('ul');
    phrase.append(newUl);

    for (let i=0; i<this.phrase.length; i++){
      let li = document.createElement('li');
      li.textContent = this.phrase[i];
      if (this.phrase[i]!==" "){
        li.classList.add('letter');
        li.classList.add('hide');
      } else {
        li.classList.add('space');
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
      if (letters[i].textContent.toUpperCase() == keybutton.toUpperCase()){
        result = keybutton;
      }
    }
    return result; //return either NULL or LETTER
  }


  showMatchedLetter(matchedLetter){
    let letters = document.querySelectorAll('.letter');
    for (let i=0; i<letters.length; i++){
      if (letters[i].textContent.toUpperCase() == matchedLetter.toUpperCase()){
        letters[i].classList.remove("hide");
        letters[i].classList.add("show");
      }
    }
  }

}
