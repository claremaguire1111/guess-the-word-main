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

// Add an event listener for when a player clicks the Guess button
guessButton.addEventListener("click", function(e) {
    // Prevent the default behavior of the form submitting and reloading the page
    e.preventDefault();

    // Capture the value of the input
    const guessedLetter = letterInput.value;

    // Log out the value of the variable capturing the input
    console.log(guessedLetter);

    // Empty the value of the input field
    letterInput.value = "";
});
