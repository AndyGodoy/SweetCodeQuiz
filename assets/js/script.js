// Global variables
// Defining my gobal variables and giving them values
// Selected the 'querySelector' HTML element and stored it in the 'questionE1' variable.
var scores = 0;
var timeleft = 60;
var questions = [
    "Question 1: Which of these is an American car manufacture?",
    "Question 2: Which of these is an Asian car manufacture? ",
    "Question 3: What does MPG abbrevaition stand for in relation to cars?",
    "Question 4: Which car manufacture is known for producing the Mustang?",
    "Question 5: What is the primary purpose of an alternator in a car?",
    "Question 6: Which component is responsible for igniting the fuel-air mixture in an internal combustion engine?",
];
var answerChoices = [ //made of arrays of strings
    ["Toyota", "Nissan", "Tesla", "Honda"],
    ["Ford", "General Motors", "Chrysler", "Hyundai-Kia"],
    ["Miles Per Gallon", "Motors Perform Great", "Mechanical Power Generator", "I have no idea"],
    ["Chevrolet", "Honda", "Toyota", "Ford"],
    ["To improve fuel efficiency", "To Generate electricity", "To provide traction control", "To control engine temperature"],
    ["Carburetor", "Piston", "Exhaust Manifold", "Spark Plug"],
];
var correctAnswer = ["2", "3", "0", "3", "1", "3"]; // made of strings ["1","2","3"]
var currentQuestion = 0;

// All my HTML selectors
var questionE1 = document.querySelector("question");


// Functions of what I need
function start() {
    //triggered when they press button (event listener)
    startButton.addEventListener('click', start);
    //starts the timer (setting it up the start interval for timer)
    var interval = setInterval(function() {
        timeleft--; 
    //set the interval
    //once we hit 0, we call endGame function
    if (timeleft === 0) {
        clearInterval(interval);
        endGame();
    }
}, 1000);  
    //hide the start buttom
    startButton.style.display = 'none';
    //Reveal the options, questions h1
    questionE1.style.display = 'block';
    //change the questions
    questionE1.textContent = questions(currentQuestion);
    //change the choices
    for (var i = o; i < choices.length; i++) {
        var option = document.createElement("li"); // Created new option element
        option.textContent = answerChoices[i];
        // Add Event listener to each option
        option.addEventListener("click", nextQuestion);
        //Append the option to the option list
        option.appendChild(option);
}
    }

function nextQuestion(event) {
    //triggered when the user selects any answer 
    //Find out what answer the user chose
    var selectedAnswer = event.target.textContent;
    //Find out if the answer is right or wrong
    if (selectedAnswer === correctAnswer[currentQuestion]){
        //if its wrong, reduce the time, and show message "Wrong!"
        //if its right, add that to score, then the show message "Correct!" (time left at the end is the user's score)
        scores++; // Increases the Score!
        feedback.textContent = "Correct!";
    } else {
        //if answer is Wrong, Reduced time by 10 seconds
        timeleft -= 10 
        feedback.textContent = "Wrong!";
    }
    //increment the current quesongtion by 1
    currentQuestion++;

    //Check if all the questions havebeen answered 
    if (currentQuestion === questions.length) {
        endGame(); //Call the endGame function
    } else {
    //channge the question
     question.textContent = questions[currentQuestion];
     //change the choices   
     var options = document.getElementById("options");
     option.innerHTML = ""; 
     for (var i = 0; i < answerChoices.length; i++) {
        var option = document.createElement("li");
        option.textContent = answerChoices[i];
        option.addEventListener("click", nextQuestion);
        options.appendChild(option);
     }
    }
}
function endGame() {
    // triggered when timer gets to 0 OR just finishing the last question (if else put in the timers?)
    // Prompts the user for initials
    var initials = prompt("Enter your Initials:");
    // displays the score
    alert("Your score is: + scores");
    // Hide the question
    question.style.display = "none";
    // If the usser finishes before the timer runs out, stop the timer from running
clearInterval(timerInterval);
    // Save the scores and initials to the local storage
    var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.push({ initials: initials, score: scores });
    localStorage.setItem("highScores", JSON.stringify(highScores));
    // Take the user to the highscore.html page
    window.location.href = "highscore.html";
}

function saveInitials() {
    //triggered when user submitted their initials
    var initials = document.getElementById("initials").value;
    //save the scores and their initials to the local storage
    var highScores = JSON.parse(localStorage.getItem("highScores")) || [];

        //Read (save them to another var) the existing score
        //add the mew scores to the end of the array
        //now overwrite the scores with the new array

        localStorage.setItem("highScores", JSON.stringify(highScores));

    //take the user to the highscore .html page
    window.location.href = "highscore.html";
}

start();




//add event listener after the function we want to attach it too