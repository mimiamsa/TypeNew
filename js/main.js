import { granimInstance } from "./bg-anim.js";
import jungle from "./data.js";
console.log(jungle);

const wordLeftElements = document.getElementsByTagName("#words_left h3");
const score = document.querySelector("#score h3");
const btnStart = document.getElementById("btn-start");
const inputWord = document.getElementById("current_typing");
var statusBar = document.getElementById("barStatus");
const currentWord = document.getElementById("current_word");


var points = 0;
var wordsLeft = 0;
var width = 1;
var isPlaying; 
var time = 20;


function start() {
  startCount();
  showWord(jungle);
  inputWord.addEventListener("input", startMatch);
}

btnStart.onclick = start;

function startCount() {
  var intervalId = setInterval(countDown, 100);
  function countDown() {
    if (width >= 100) {
      clearInterval(intervalId);
    } else {
      width++;
      statusBar.style.width = width + "%";
    }
  }
}

function showWord(words) {
  console.log(currentWord);
  console.log(currentWord.textContent);
  currentWord.textContent = "";
  
  // Generate random array index 
  const randIndex = Math.floor(Math.random() * words.length); // not length -1?
  // Output random word 
  // currentWord.innerHTML = words[randIndex];
  // Create a span for each letter of the outputted word 
  for (let i = 0; i < words[randIndex].length; i += 1) {
    const span = document.createElement("span");
    span.className += "letter-pressed"
    span.textContent = words[randIndex][i];
    currentWord.appendChild(span);
  }
}

// function showWordsLeft(){
// let wordsession = jungle;
// console.log(wordsession)
// //remove word inputed, display length
// // wordsession.length --

// // return wordsession.length
// }

function startMatch() {
  // console.log(matchWords())
  if (matchWords()) {
    // console.log("match")
    isPlaying = true;
    // // time = 12;
    showWord(jungle);
    inputWord.value = ''; //reset input here
    points++;
  }

  // score.textContent = points

  if(score.textContent < 10) {
    score.textContent = "0" + points 
  } else {
    score.textContent = points
  }
}




function matchWords() {
  if (inputWord.value === currentWord.textContent) {
    return true;
  } else {
    // message.innerHTML = ''; // usefull ?
    return false;
  }
}