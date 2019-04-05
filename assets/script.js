$(document).ready(function() {
var questionCounter = 0;

// timeout 
var ansTimeout = 2000;

//score var's
var correct = 0;
var incorrect = 0;
var missed = 0;

//array of user's answers
var userAns = [];

//Creating an array of objects with the questions, answer options, and correct answer
var questions = [
{
	question: "What is Charlotte's Basketball team?",
	choices: ["The Bee's", "The Hornets", "The Clippers", "The Wasps", "The Panthers"],
	choicesAnswer: 1
},
{
	question: "The Charlotte Knight ________ Ballpark is in Uptown Charlotte.",
	choices: ["Bank of America", "Wells Fargo", "Charlotte Metro", "SunTrust", "BB&T"],
	choicesAnswer: 4
},
{
	question: "___________ Hall of Fame honors drivers.",
	choices: ["The Track", "The Muesum", "World Market", "NASCAR", "The Beer"],
	choicesAnswer: 3
},
{
	question: "Locals call Charlotte the ___________ City?",
	choices: ["King", "Queen", "Princess", "Begger's", "Prince"],
	choicesAnswer: 1
},
{
	question: "The best art scence and wall murals are found in which neighborhood? Hint: North Davidson",
	choices: ["South End", "Elizabeth", "Plaza Midwood", "Dilworth", "NoDa"],
	choicesAnswer: 4
},
{
	question: "Which is NOT in Charlotte",
	choices: ["I-99", "I-77", "I-85", "I-485", "I-277"],
	choicesAnswer: 0
}];

//Function to submit answers
function submitAns() {
	$("#submit").on("click", function(e) {
		e.preventDefault();
		userAns.length = 0;
			
		//users answer to my quesitons
		var userSelection = $("#responses input:radio[name=optionsRadios]:checked").val();
		//value
		userAns.push(userSelection);
		console.log(userAns);
		nextQ();
	});
};
	
//variables & functions
var timeLeft = 10;
var increment;

function runTimer() {
	increment = setInterval(decrement, 1000);
};

function decrement() {
	timeLeft--;
	$("#time-left").html("Time remaining: " + timeLeft + " seconds");
	if (timeLeft === 0) {
		stopTimer();
		userAns.length = 0;		
		//Users answer to question
		var userSelection = $("#responses input:radio[name=optionsRadios]:checked").val(); //value
		userAns.push(userSelection);
		console.log(userAns);
		nextQ();
	};
};

function resetTimer() {
	timeLeft = 10;
	$("#time-left").html("Time remaining: " + timeLeft + " seconds");
};

function displayTimer() {
	$("#time-left").html("Answer Review");
};

function stopTimer() {
	clearInterval(increment);
};

//Function to show the users choices
function createRadios() {
	var responseOptions = $("#responses");
	responseOptions.empty();
		
	for (var i = 0; i < questions[questionCounter].choices.length; i++) {
		responseOptions.append('<label><input type="radio" name="optionsRadios" id="optionsRadios2" value="' + [i] +'"><div class="twd-opt">' + questions[questionCounter].choices[i] + '</div></input><br></label>');
	};
};

//Function to display the given question
function displayQ() {
	clearQ();
	resetTimer();
	$(".questionX").html(questions[questionCounter].question);
	createRadios();

	$("#submit-div").append('<button type="submit" class="btn btn-warning" id="submit">' + "Submit" + '</button>');
	runTimer()
	submitAns();
};

//Start page
function displayStart() {
	$("#content").append('<a href="#" class="btn btn-warning btn-lg" id="start-button">' + "Start" + '</a>');
	//Start game
	$("#start-button").on("click", function(event) {
		event.preventDefault();
		//shows the first question
		firstQ();
		resetTimer();
	});
};

//Game reset
function reset() {
	questionCounter = 0;
	correct = 0;
	incorrect = 0;
	missed = 0;
	userAns = [];
	resetTimer();
};

//End page
function displayEnd() {
	clearQ();
	$("#content").append('<h3>' + "Correct Answers: " + correct + '</h3><br><h3>' + "Incorrect Answers: " + incorrect + '</h3><br><h3>' + "Skipped Questions: " + missed + '</h3><br><br><a href="#" class="btn btn-primary btn-lg" id="restart-button">' + "Restart Game" + '</a>');
	//restart game
	$("#restart-button").on("click", function(event) {
		event.preventDefault();
		reset();
		clearQ();
		displayStart();
	});
};

//clearing section
function clearQ() {
	var questionDiv = $(".questionX");
	questionDiv.empty();

	var responsesDiv = $("#responses");
	responsesDiv.empty();

	var submitDiv = $("#submit-div");
	submitDiv.empty();

	var contentDiv = $("#content");
	contentDiv.empty();

	stopTimer();
};

//checking section
function checkQ() {
	clearQ();
	var correctAnswer = questions[questionCounter].choicesAnswer;
	if (userAns[0] == questions[questionCounter].choicesAnswer) {
		$("#content").append('<h3>'+"Congratulations! You're an Expert!" + '</h3>');
		correct++;
		displayTimer();
	}
	else if (userAns[0] === undefined) {
		$("#content").append('<h3>'+"Time's Up! Try Again!" + '</h3><br><br><h3>' + "The correct answer is: " + questions[questionCounter].choices[correctAnswer] + '</h3>');
		missed++;
		displayTimer();
	}
	else {
		$("#content").append('<h3>'+"" + '</h3><br><br><h3>' + "The correct answer is: " + questions[questionCounter].choices[correctAnswer] + '</h3>');
		incorrect++;
		displayTimer();
	};
};

//Function to change the question shown 
function nextQ() {
	checkQ();
	questionCounter++;
	
	if (questionCounter === questions.length) {
		setTimeout(displayEnd, ansTimeout);
	} 
	else {
		setTimeout(displayQ, ansTimeout);
	};
};

//calling the first question
function firstQ() {
	var startContent = $("#content");
	startContent.empty(); 
	displayQ();
};

//shows the start page
displayStart();

});