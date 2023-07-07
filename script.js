// Created Variables
var scores = 0; // initialized with the value 0
var timeleft = 60; //time left with value of 60. initial amount of time!
var questions = [ // ARRAY OF STRINGS! MY QUESTIONS that will be displayed to user (Car related) 
  "Question 1: Which of these is an American car manufacturer?",
  "Question 2: Which of these is an Asian car manufacturer?",
  "Question 3: What does MPG abbreviation stand for in relation to cars?",
  "Question 4: Which car manufacturer is known for producing the Mustang?",
  "Question 5: What is the primary purpose of an alternator in a car?",
  "Question 6: Which component is responsible for igniting the fuel-air mixture in an internal combustion engine?"
];

// declare new variable for answers. (this is multiple choice)
// Each inner array represents the answer choices for a specific question in the quiz.
// The answerChoices array aligns with the corresponding questions in the questions array^^^
var answerChoices = [
  ["Toyota", "Nissan", "Tesla", "Honda"],
  ["Ford", "General Motors", "Chrysler", "Hyundai-Kia"],
  ["Miles Per Gallon", "Motors Perform Great", "Mechanical Power Generator", "I have no idea"],
  ["Chevrolet", "Honda", "Toyota", "Ford"],
  ["To improve fuel efficiency", "To generate electricity", "To provide traction control", "To control engine temperature"],
  ["Carburetor", "Piston", "Exhaust Manifold", "Spark Plug"]
];

// Gotta give the correct answeers
// array that stores the index of the correct answer for each question.
var correctAnswer = ["2", "3", "0", "3", "1", "3"];// represents the correct answer index

// The initial value of 0 indicates that the first question is the current question.
// It represents the index of the current question being displayed or evaluated in the quiz
var currentQuestion = 0;

// Dont forget timer in corner
// added timerInterval so that it can be cleared when the time runs out OR Quiz ends
var timerInterval;

// have to use a method() to select my future selectors
// here I created multiple variables and assigned them each individual query selectors IDs
var questionElement = document.querySelector("#question"); 
var startButton = document.querySelector("#start-button");
var optionsElement = document.querySelector("#options");
var feedback = document.querySelector("#feedback");
var timerElement = document.querySelector("#timer");
var quizContainer = document.querySelector("#quiz-container");

// created a function names startQuiz that is triggered when the user clicks on the start button
// start button needs to dissapear! 
// needs to display the quiz questions and answers
// timer to handle when quiz ends or runs out of time
function startQuiz(event) {

   // preventDefault() ensures that the page does not refresh when the start button is clicked.
  event.preventDefault();

  // removes the start button from the interface once the quiz has started.
  startButton.style.display = "none";

  // Quiz needs to pop up and start, and timer needs to start!!
  // display property of the quiz container set to block making it visible.
  // This holds the entire quiz information. 
  quizContainer.style.display = "block";

  // calling the showQuestion() 
  // this is charge of displaying the current question and answers options!
  showQuestion();

  // set up an interval using the 'setInterval().
  // execute repeatedly every 1000 milliseconds (1 second).
  timerInterval = setInterval(function () {

    // timeleft variable is decremented by 1, reducing the remaining time for the quiz.
    timeleft--;

    // the text.Content property of the 'timerElement' is updated to display the current time remaining
    timerElement.textContent = "Time: " + timeleft;

    //If the remaining time reaches 0, the following will take place! 
    if (timeleft === 0) {

        // The interval is cleared using the clearInterval function, stopping the countdown.
      clearInterval(timerInterval);

      // The endGame function is called to handle the end of the quiz and perform any necessary actions.
      endGame();
    }
  }, 1000);
}
// CONDITIONS -- IF ELSE 
// checks if the startButton variable exists or TTRHUTHY 
// if Truthy, then the code block inside my curly brackets will be executed!
// added event listener so when user clicks on start button, the startQuiz function will be called!
if (startButton) {
  startButton.addEventListener("click", startQuiz);
}

//  showQuestion() displays the current question and its answer choices in the quiz interface.
function showQuestion() {

    // this set the text content of the questionElement to the current question.
    // it displays the question in the quiz interface
  questionElement.textContent = questions[currentQuestion];

  // this clears the html content inside of the optionsElement.
  // It ensures that any previous answer choices are removed before displaying the new set of answer choices
  optionsElement.innerHTML = "";

  // FOR LOOP
  // used FOR loop to iterate over the answer choices for the current question
  for (var i = 0; i < answerChoices[currentQuestion].length; i++) {

    // created new list element using the createElement method. Represents an answer choice
    var option = document.createElement("li");
    option.textContent = answerChoices[currentQuestion][i];
    option.setAttribute("data-index", i); // [i] represents the position of the anser choice! 

    // added event listener to the option element for the click event
    // when user clicks-- the nextQuestion() will be called!
    option.addEventListener("click", nextQuestion);

    // appends option element as a child of the optionsElement. 
    // adds the answrs choice to the quiz interface 
    optionsElement.appendChild(option);
  }
}
// Create your nextQuestion function
function nextQuestion(event) {
    
    // this retrieves the text content of the event target
    // selectedAnserr will store the text of the chosen ansewr
  var selectedAnswer = event.target.textContent;

  // If statement checks whether the selected answer matches the correct answer for the current question:
  // If the selected answer is correct, the condition evaluates to true.
  if (selectedAnswer === answerChoices[currentQuestion][correctAnswer[currentQuestion]]) {
    scores++; // incremented by 1
    feedback.textContent = "Correct!";
  } 
  // If Incorrect! 
  // time left variable is reduced by 10 and feedback to show WRONG!
  else {
    timeleft -= 10;
    feedback.textContent = "Wrong!";
  }

  // currentQuestion is 'incremented' to move to next question
  currentQuestion++;

  // These IF statements are checking to see if all a=questions have been answered
  if (currentQuestion === questions.length) {
    // calling the endgame function to handle the end of the quiz
    endGame();
  } 
  // if more questions remain, the showQuestion function is called 
  else {
    showQuestion();
  }
}

// EndGame funtion! 
// stops the time
// Ask user of initials!
// Store the high score and show it
// re-directs to take quiz again ???
function endGame() {
    // Ensures that the timer no longer updates.
  clearInterval(timerInterval);
// this promts user to enter intials
  var initials = prompt("Enter your initials:");

  // How do I show the previous highscore LOCALSTORAGE!! GETITEM()
  var highScores = JSON.parse(localStorage.getItem("highScores")) || [];

  // this add new entries to the high score
  // consist of an object with properties. Score propery holds the score
  highScores.push({ initials: initials, score: scores });

  // JSON.stringify() to convert the array into a string before storing it.
  localStorage.setItem("highScores", JSON.stringify(highScores));

  // displays an alert to the user showing final score
  alert("Your score is: " + scores);

  // This took me forever to figure out!
  // the "back button" will take me back to begining of quiz
  window.location.href = "index.html";
}

// Create a new <a> element for the "High Scores" link
// Set the text content of the link to "High Scores"
// Set the "href" attribute of the link to "highscore.html"
// Append the link element as a child of the <body> element
// Set some CSS styling 
var highScoresLink = document.createElement("a");
highScoresLink.textContent = "High Scores";
highScoresLink.setAttribute("href", "highscore.html");
highScoresLink.style.position = "absolute";
highScoresLink.style.top = "10px";
highScoresLink.style.left = "10px";
document.body.appendChild(highScoresLink);

// Check if the current page is "highscore.html"
if (window.location.pathname.includes("highscore.html")) {
// If it is, call the displayHighScores function to show the high scores
  displayHighScores();
}
// Function to display the high scores
function displayHighScores() {

// Get the element with the id "high-scores"
  var highScoresList = document.getElementById("high-scores");

// If the element doesn't exist, return and do nothing
  if (!highScoresList) return;

// Clear the existing content of the high scores list
  highScoresList.innerHTML = "";

// Get the high scores from the local storage and parse them from a string to an array
  var highScores = JSON.parse(localStorage.getItem("highScores")) || [];

// Sort the high scores in descending order based on the score
  highScores.sort(function (a, b) {
    return b.score - a.score;
  });

// Iterate over the high scores array and create a list item for each high score
  for (var i = 0; i < highScores.length; i++) {
// Create a new list item element
    var highScoreItem = document.createElement("li");
// Set the text content of the list item to display the initials and score of the high score
    highScoreItem.textContent = highScores[i].initials + " - " + highScores[i].score;
// Append the list item to the high scores list
    highScoresList.appendChild(highScoreItem);
  }
}
