const dynamicText = document.querySelector("h1 span");

//a bunch of translation of "hello" done by google
const words = ["Hello", "Hola", "Bonjour", "你好", "Hallo", "Ciao", "こんにちは",
"Здравствуйте", "مرحبا", "안녕"]

var wordIndex = 0;
var charIndex = 0;
let isDelete = false;

const typeEffect = () =>{
    const curWord = words[wordIndex];
    const curChar = curWord.substring(0, charIndex);
    dynamicText.textContent = curChar;
    dynamicText.classList.add("stop-blinking");

    if(!isDelete && charIndex < curWord.length){
        //we are not deleting yet because we havent typed out a word
        charIndex++;
        setTimeout(typeEffect, 150);
    }
    else if(isDelete && charIndex > 0){
        //now we are deleting
        charIndex--;
        setTimeout(typeEffect, 70);
    }
    else{
        //else we set isDelete to true because we typed out a word
        //and change the word
        isDelete = !isDelete;
        dynamicText.classList.remove("stop-blinking");
        wordIndex = !isDelete ? (wordIndex + 1) % words.length : wordIndex;
        console.log(wordIndex);
        setTimeout(typeEffect, 800);
    }

}

typeEffect();