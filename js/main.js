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
  countdown();
  showWord(jungle);
  inputWord.addEventListener("input", startMatch);
  document.addEventListener("keyup", checkKeyPress);
}

btnStart.onclick = start;

// function startCount() {
//   var intervalId = setInterval(countDown, 100);
//   function countDown() {
//     if (width >= 100) {
//       clearInterval(intervalId);
//     } else {
//       width++;
//       statusBar.style.width = width + "%";
//     }
//   }
// }

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
    span.className += "letter-pressed";
    span.textContent = words[randIndex][i];
    currentWord.appendChild(span);
  }
}

// Change BG
function checkKeyPress(ev) {
  // console.log(ev)
  const wordLetters = document.querySelectorAll(
    "#current_word .letter-pressed"
  );
  let wordToCheck = getLetter();
  // console.log(wordToCheck)
  // console.log(wordToCheck, wordInput.value.length)
  for (let i = 0; i < inputWord.value.length; i++) {
    // console.log(i)
    if (wordToCheck[i] == inputWord.value[i]) {
      wordLetters[i].classList.add("is-matched");
      // console.log(wordToCheck[i]);
    }
  }
  if (ev.key === "Backspace") {
    // console.log('delete letter');
    if (inputWord.value.length >= 0) {
      const els = document.querySelectorAll(".is-matched");
      els[els.length - 1].classList.remove("is-matched");
    }
  }
}

function getLetter() {
  const wordLetters = document.querySelectorAll(
    "#current_word .letter-pressed"
  );
  let arr = [];
  for (let i = 0; i < wordLetters.length; i++) {
    arr.push(wordLetters[i].textContent);
    // console.log(i);
  }
  return arr;
}

function countdown() {
  var reverse_counter = 20;
  var downloadTimer = setInterval(function() {
    document.getElementById("pbar").value = 20 - --reverse_counter;
    if (reverse_counter <= 0) clearInterval(downloadTimer);

    document.getElementById("counting").innerHTML = reverse_counter;
  }, 1000);
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
    inputWord.value = ""; //reset input here
    points++;
  }

  // score.textContent = points

  if (score.textContent < 10) {
    score.textContent = "0" + points;
  } else {
    score.textContent = points;
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
