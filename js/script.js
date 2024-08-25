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
    // Create an array with one circle symbol (●) for each letter in the word
    const placeholders = [];
    for (let i = 0; i < word.length; i++) {
        placeholders.push("●");
    }

    // Update the word-in-progress paragraph's innerText with the placeholders
    wordInProgress.innerText = placeholders.join("");
};

// Call the function and pass the word variable as the argument
addPlaceholders(word);

// Function to validate the player's input
const validateInput = function (input) {
    // Regular expression for accepted letters (a-z, A-Z)
    const acceptedLetter = /[a-zA-Z]/;

    // Check if the input is empty
    if (input === "") {
        message.innerText = "Please enter a letter.";
    }
    // Check if the player has entered more than one letter
    else if (input.length > 1) {
        message.innerText = "Please enter a single letter.";
    }
    // Check if the input matches the accepted letter sequence
    else if (!input.match(acceptedLetter)) {
        message.innerText = "Please enter a letter from A to Z.";
    }
    // If the input is valid (a single letter), return the input
    else {
        return input;
    }
};

// Function to handle the player's guess
const makeGuess = function (letter) {
    // Convert the letter to uppercase
    letter = letter.toUpperCase();

    // Check if the guessedLetters array already contains the letter
    if (guessedLetters.includes(letter)) {
        message.innerText = "You've already guessed that letter. Try again.";
    } else {
        // If the letter hasn't been guessed yet, add it to the guessedLetters array
        guessedLetters.push(letter);
        console.log(guessedLetters);
    }
};

// Event listener for when a player clicks the Guess button
guessButton.addEventListener("click", function(e) {
    e.preventDefault();

    // Clear the previous message
    message.innerText = "";

    // Capture the value of the input
    const guessedLetter = letterInput.value;

    // Validate the input and store the result in a variable
    const validInput = validateInput(guessedLetter);

    // If validInput is a letter (not undefined), pass it to the makeGuess function
    if (validInput) {
        makeGuess(validInput);
    }

    // Empty the value of the input field
    letterInput.value = "";
});



