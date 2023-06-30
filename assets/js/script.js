// Global variables
var scores = 0;
var timeleft = 200;
var questions = ["What is the capitol of Urugau?", "What is the capital of Panama?"];
var answerChoices = ["Managua", "Santiago", "Monte Video", "Brasilia"]; //made of arrays of strings
var correctAnswer = []; // made of strings
var currentQuestion = 0;

// All my HTML selectors
var questionE1 = document.querySelector("question");


// Functions of what I need
function start() {
    //triggered when they press button (event listener)
    //starts the timer (setting it up the start interval for timer)
        //set the interval
        //once we hit 0, we call endGame function
    //hide the start buttom
    //Reveal the options, questions h1
    //change the questions
    //change the choices
    //
}

function nextQuestion(event) {
    //triggered when the user selects any answer 
    //Find out what answer the user chose
    //Find out if the answer is right or wrong
        //if its wrong, reduce the time, and show message "Wrong!"
        //if its right, add that to score, then the show message "Correct!" (time left at the end is the user's score)
    //increment the current question by 1
    //channge the question
    //change the choices    
}
function endGame() {
    //triggered when timer gets to 0 OR just finishing the last question (if else put in the timers?)
    //Prompts the user for initials
    //displays the score
    //Hide the question
    //If the usser finishes before the timer runs out, stop the timer from running
}

function saveInitials() {
    //triggered when user submitted their initials
    //save the scores and their initials to the local storage
           //Read (save them to another var) the existing score
           //add the mew scores to the end of the array
           //now overwrite the scores with the new array
    //take the user to the highscore .html page
}


//add event listener after the function we want to attach it too