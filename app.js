const secretPhrases = ["hello", "world", "bye", "summer", "winter", "morning", "happy", "sad"];
const letters = document.getElementById("letters");
const lett = document.querySelectorAll(".lett")
const gameOver = document.getElementById("gameover");
const clue = document.getElementById("clue");
let mistakes = 0;
let randomItem = "";
let clicked = [];
let letter = "";
let joinedWord;

function randomSelection() {
    randomItem = secretPhrases[Math.floor(Math.random() * secretPhrases.length)];
    letters.addEventListener("click", buttonHandler);
    window.addEventListener("keydown", keyHandler);
    console.log(randomItem);

}

function setLetters() {
    let splitedWord = randomItem.split("");
    let mappedWord = splitedWord.map(letter => (clicked.indexOf(letter) >= 0 ? letter : "_"));
    joinedWord = mappedWord.join("");
    document.getElementById("clue").innerHTML = `<p>${joinedWord}</p>`;
}

function checkIfWon() {
    if (joinedWord === randomItem) {
        document.getElementById("img").src = "assets/winner.png";
        mistakes = 6;
    }

}
function checkIfLost() {
    if (mistakes === 6) {
        gameOver.querySelector("p").style.display = "block";
        clue.innerHTML = `<p>Random word is: ${randomItem}</p>`;
    }
}

function letterHandler(letter) {
    letter = letter.toLowerCase();
    clicked.indexOf(letter) === -1 ? clicked.push(letter) : null;
    document.getElementById(letter.toUpperCase()).className = "used";
    if (randomItem.indexOf(letter) >= 0) {
        setLetters();
        checkIfWon();
    } else if (randomItem.indexOf(letter) === -1) {
        mistakes++;
        checkIfLost();
        updatePic();
    }
}

function updatePic() {
    if (mistakes <= 6) {
        document.getElementById("img").src = `assets/hangman${mistakes}.png`;
    } else {
        return;
    }
}

function buttonHandler(e) {
    if (mistakes < 6) {
        letterHandler(e.target.id);
    } else {
        return;
    }
}

function keyHandler(e) {
    if (mistakes < 6) {
        letterHandler(e.key);
    } else {

        return;
    }
}

randomSelection();
setLetters();
