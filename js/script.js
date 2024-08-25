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

// Global variable to store the remaining number of guesses
let remainingGuesses = 8;

// Async function to fetch a random word from the provided URL
const getWord = async function () {
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();

    // Split the words into an array using the newline character as the delimiter
    const wordArray = words.split("\n");

    // Select a random word from the array
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    const randomWord = wordArray[randomIndex].trim();

    // Reassign the global word variable to the random word
    word = randomWord;

    // Call the function to add placeholders for each letter in the random word
    addPlaceholders(word);
};

// Function to add placeholders for each letter in the word
const addPlaceholders = function (word) {
    const placeholders = [];
    for (let i = 0; i < word.length; i++) {
        placeholders.push("●");
    }
    wordInProgress.innerText = placeholders.join("");
};

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

// Function to count the remaining guesses
const countGuessesRemaining = function (guess) {
    const wordUpper = word.toUpperCase();

    if (!wordUpper.includes(guess)) {
        message.innerText = `Sorry, the word does not contain the letter "${guess}".`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `Good guess! The word contains the letter "${guess}".`;
    }

    if (remainingGuesses === 0) {
        message.innerHTML = `<p class="highlight">Game over! The word was ${wordUpper}.</p>`;
        startOver();  // Call startOver when the player loses
    } else if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText = `1 guess`;
    } else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    }
};

// Function to check if the player has won
const checkIfPlayerWon = function () {
    if (wordInProgress.innerText === word.toUpperCase()) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the word! Congrats!</p>`;
        startOver();  // Call startOver when the player wins
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

        // Update the remaining guesses based on whether the guess is correct
        countGuessesRemaining(letter);

        // Call the function to update the word in progress
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

// Function to hide and show elements when the game is over
const startOver = function () {
    // Hide the Guess button
    guessButton.classList.add("hide");

    // Hide the paragraph where the remaining guesses are displayed
    remainingGuessesParagraph.classList.add("hide");

    // Hide the unordered list where the guessed letters appear
    guessedLettersList.classList.add("hide");

    // Show the Play Again button
    playAgainButton.classList.remove("hide");
};

// Add a click event listener for the Play Again button
playAgainButton.addEventListener("click", function() {
    // Remove the "win" class from the message element
    message.classList.remove("win");

    // Empty the message text
    message.innerText = "";

    // Empty the unordered list where the guessed letters appear
    guessedLettersList.innerHTML = "";

    // Reset the remaining guesses back to 8
    remainingGuesses = 8;
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;

    // Reset the guessedLetters array back to an empty array
    guessedLetters = [];

    // Show the Guess button, the paragraph with remaining guesses, and the guessed letters list
    guessButton.classList.remove("hide");
    remainingGuessesParagraph.classList.remove("hide");
    guessedLettersList.classList.remove("hide");

    // Hide the Play Again button
    playAgainButton.classList.add("hide");

    // Call the async function to get a new random word
    getWord();
});

// Call the async function to get a random word when the game starts
getWord();
