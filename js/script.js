// Global variables

// Selecting the unordered list where the player's guessed letters will appear
const guessedLettersList = document.querySelector(".guessed-letters");

// Selecting the button with the text "Guess!" in it
const guessButton = document.querySelector(".guess");

// Selecting the text input where the player will guess a letter
const letterInput = document.querySelector(".letter");

// Selecting the empty paragraph where the word in progress will appear
const wordInProgress = document.querySelector(".word-in-progress");

// Selecting the paragraph where the remaining guesses will display
const remainingGuessesParagraph = document.querySelector(".remaining");

// Selecting the span inside the paragraph where the remaining guesses will display
const remainingGuessesSpan = document.querySelector(".remaining span");

// Selecting the empty paragraph where messages will appear when the player guesses a letter
const message = document.querySelector(".message");

// Selecting the hidden button that will appear prompting the player to play again
const playAgainButton = document.querySelector(".play-again");

// The starting word to test out the game
let word = "magnolia";

// Global variable to store the player's guessed letters
let guessedLetters = [];

// Function to add placeholders for each letter in the word
const addPlaceholders = function (word) {
    const placeholders = [];
    for (let i = 0; i < word.length; i++) {
        placeholders.push("●");
    }
    wordInProgress.innerText = placeholders.join("");
};

// Call the function and pass the word variable as the argument
addPlaceholders(word);

// Function to validate the player's input
const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;

    if (input === "") {
        message.innerText = "Please enter a letter.";
    } else if (input.length > 1) {
        message.innerText = "Please enter a single letter.";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Please enter a letter from A to Z.";
    } else {
        return input;
    }
};

// Function to update the page with the letters the player guesses
const showGuessedLetters = function () {
    guessedLettersList.innerHTML = "";

    guessedLetters.forEach(function (letter) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersList.appendChild(li);
    });
};

// Function to update the word in progress
const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");

    const revealWord = [];

    wordArray.forEach(function (letter) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter);
        } else {
            revealWord.push("●");
        }
    });

    wordInProgress.innerText = revealWord.join("");

    checkIfPlayerWon();
};

// Function to check if the player has won
const checkIfPlayerWon = function () {
    if (wordInProgress.innerText === word.toUpperCase()) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the word! Congrats!</p>`;
    }
};

// Function to handle the player's guess
const makeGuess = function (letter) {
    letter = letter.toUpperCase();

    if (guessedLetters.includes(letter)) {
        message.innerText = "You've already guessed that letter. Try again.";
    } else {
        guessedLetters.push(letter);
        showGuessedLetters();
        updateWordInProgress(guessedLetters);
    }
};

// Event listener for when a player clicks the Guess button
guessButton.addEventListener("click", function(e) {
    e.preventDefault();

    message.innerText = "";

    const guessedLetter = letterInput.value;
    const validInput = validateInput(guessedLetter);

    if (validInput) {
        makeGuess(validInput);
    }

    letterInput.value = "";
});
