const question1 = {
    text: 'which knife is used for removing excess fatand and itssue when preparing boneless chicken breasts?',
    choices: [{
        text: 'Paring Knife',
        status: true
    }, {
        text: 'Chefs Knife',
        status: false
    }, {
        text: 'Boning Knife',
        status: false
    }, {
        text: 'Serrated knife',
        status: false
    }]
};

const question2 = {
    text: 'To maintain a 29% food cost, what must the menu price be of an item costing $1.00 to produce?',
    choices: [{
        text: '$2.95',
        status: false
    }, {
        text: '$3.45',
        status: true
    }, {
        text: '$4.35',
        status: false
    }, {
        text: '$5.45',
        status: false
    }]
};

const question3 = {
    text: 'What flour has the highest protein content?',
    choices: [{
        text: 'Cake',
        status: false
    }, {
        text: 'Pastry',
        status: false
    }, {
        text: 'Bread',
        status: true
    }, {
        text: 'All-purpose',
        status: false
    }]
};

const question4 = {
    text: 'What is done to curdle (break) a hollandaise sauce?',
    choices: [{
        text: 'Cook over direct heat',
        status: true
    }, {
        text: 'Whisk in the clarified butter slowly',
        status: false
    }, {
        text: 'Reduce acid and aromatics au sec',
        status: false
    }, {
        text: 'Whisk slowly over low heat',
        status: false
    }]
};

const question5 = {
    text: 'How is raw groud beef stored in a refrigerator?',
    choices: [{
        text: 'By storing below ready-to-serve products',
        status: true
    }, {
        text: 'By coving with a cloth',
        status: false
    }, {
        text: 'By storing below raw poultry',
        status: false
    }, {
        text: 'by storing in origianl shipping container',
        status: false
    }]
};

//set up all button variables
var startBtn = document.getElementById('startQuiz'); 
var goBackBtn = document.getElementById('goBackBtn');
var clearBtn = document.getElementById('clearBtn');
var highScoresBtn = document.getElementById('viewHighScores');

//set up all Section Variables
var quizStartSec = document.querySelector('.quizStart');
var questionViewSec = document.querySelector('.questionView');
var highScorseFormSec = document.querySelector('.highScoresForm');
var highScoresSec = document.querySelector('.highScores');

//set up all quiz element variables
var choice1 = document.getElementById('choice1');
var choice2 = document.getElementById('choice2');
var choice3 = document.getElementById('choice3');
var choice4 = document.getElementById('choice4');
var choice5 = document.getElementById('choice5');
var questionText = document.getElementById('questionText');
var answerDisplay = document.getElementById('answerDisplay');
var hsForm = document.getElementById('hsForm');
var yourScore = document.getElementById('yourScore');
var choiceButtons = [choice1, choice2, choice3, choice4, choice5];

//sets up post quiz results
var initialsField = document.getElementById('initials');
var hsForm = document.getElementById('hsForm');
var scoreHolder = document.getElementById('scoreHolder');

//set up variables for score and time data
var timerDisplay = document.getElementById('timer');
var showTime = null;
var sectionArray = [quizStartSec, questionViewSec, highScorseFormSec, highScoresSec];
var questions = [question1, question2, question3, question4 ,question5];
var timeLeft = 45;
var score = 0;
var highScores = [];
var currentQuestion = 0;
var score = 0;


//This section contains all of my button event listeners except for the choices
highScoresBtn.addEventListener('click', function() {
    loadScores();
    populateScores();
    showSection(highScoresSec);
});

startBtn.addEventListener('click', function() {
    showSection(questionViewSec);
    showQuestion(questions[currentQuestion]);
    showTime = setInterval(startTimer, 1000);
});

goBackBtn.addEventListener('click', function() {
    resetValues();
    showSection(quizStartSec);
});

clearBtn.addEventListener('click', function() {
    highScores = [];
    saveScores();
    populateScores();
});

choice1.addEventListener("click", function() {
    choice1.classList.add('selectedBtn');
    answerSelected(questions[currentQuestion].choices[0].status);
});

choice2.addEventListener("click", function() {
    choice2.classList.add('selectedBtn');
    answerSelected(questions[currentQuestion].choices[1].status);
});

choice3.addEventListener("click", function() {
    choice3.classList.add('selectedBtn');
    answerSelected(questions[currentQuestion].choices[2].status);
});

choice4.addEventListener("click", function() {
    choice4.classList.add('selectedBtn');
    answerSelected(questions[currentQuestion].choices[3].status);
});

choice5.addEventListener("click", function() {
    choice5.classList.add('selectedBtn');
    answerSelected(questions[currentQuestion].choices[4].status);
});

//function that checks if time has expired, counts down clock by 1 second intervals.
function startTimer() {
    if(timeLeft < 1) {
        timeLeft = 0;
        endQuiz();
    } else {
        timeLeft--;
    }
    timerDisplay.innerHTML = timeLeft;
}

//When a wrong answer is selected, this function is called to remove 5 seconds off of the time
function wrongAnswer() {
    if(timeLeft < 6) {
        timeLeft = 0;
        timerDisplay.innerHTML = timeLeft;
        endQuiz();
    } else {
        timeLeft -= 5;
    }
}

//This function is used to hide the current screen, and show the requested screen
function showSection(screen) {
    for(var i = 0; i < sectionArray.length; i++) {
        if(screen === sectionArray[i]) {
            sectionArray[i].classList.remove('hidden');
        } else {
            if(!sectionArray[i].classList.contains('hidden')) {
                sectionArray[i].classList.add('hidden');
            }
        }
    }
}

//This function randomizes the choices, and then displays them for the user
function showQuestion(question) {
    var tempValue = null;

    for(var i = 0; i < question.choices.length; i++) {
        var randomNumber = Math.floor(Math.random() * (4));
        tempValue = question.choices[i];
        question.choices[i] = question.choices[randomNumber];
        question.choices[randomNumber] = tempValue;
    }

    questionText.innerHTML = question.text;
    choice1.innerHTML = question.choices[0].text;
    choice2.innerHTML = question.choices[1].text;
    choice3.innerHTML = question.choices[2].text;
    choice4.innerHTML = question.choices[3].text;
    choice5.innerHTML = question.choices[4].text;
}

//This function moves the user to the next question
function nextQuestion() {
    choice1.classList.remove('selectedBtn');
    choice2.classList.remove('selectedBtn');
    choice3.classList.remove('selectedBtn');
    choice4.classList.remove('selectedBtn');
    choice5.classList.remove('selectedBtn');
    if(currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion(questions[currentQuestion]);
    }
    else {
        endQuiz();
    }
}

//This function ends the quiz, stops the timer, calculates score, and pulls up hs form
function endQuiz() {
    clearInterval(showTime);
    yourScore.innerHTML = "Your final score is: " + score + "."; 
    showSection(highScorseFormSec);
}

/*checks for correct answer, displays results, and moves on to next question*/
function answerSelected(answer) {
    disableButtons();
    answerDisplay.classList.remove('hidden');
    if(answer) {
        answerDisplay.innerHTML = "<h2 style='color: green;'>Correct</h2>";
        answerDisplay.style.borderTop = "5px solid green";
        score++;
    } else {
        answerDisplay.innerHTML = "<h2 style='color: red;'>Incorrect</h2>";
        answerDisplay.style.borderTop = "5px solid red";
        wrongAnswer();
    }
    setTimeout(function() {
        answerDisplay.classList.add('hidden');
        enableButtons();
        nextQuestion();
    }, 1500);
}

//fixes spam clicking buttons, improved interaction
function disableButtons() {
    choice1.classList.add('disableBtn');
    choice2.classList.add('disableBtn');
    choice3.classList.add('disableBtn');
    choice4.classList.add('disableBtn');
    choice5.classList.add('disableBtn');
}
function enableButtons() {
    choice1.classList.remove('disableBtn');
    choice2.classList.remove('disableBtn');
    choice3.classList.remove('disableBtn');
    choice4.classList.remove('disableBtn');
    choice5.classList.remove('disableBtn');
}

//Add yourself to highscores
function addHighScore(event) { 
    event.preventDefault();
    if(!initialsField.value) {
        alert('Please enter your initials');
    } else {
        var newScore = {
            initials:  initialsField.value,
            score: score
        }
        highScores.push(newScore);
        populateScores();
        showSection(highScoresSec);
    }
}

function populateScores() {
    scoreHolder.innerHTML = "";
    if(highScores.length > 0) {
        for(var i = 0; i < highScores.length; i++) {
            scoreHolder.innerHTML += "<li>" + highScores[i].initials + " - " + highScores[i].score + "</li>";
        }
    } else {
        scoreHolder.innerHTML = "<li>There are not scores to display at this time</li>";
    }
    saveScores();
}

//Resets quiz but saves the highscores
function resetValues() {
    score = 0;
    timeLeft = 45;
    timerDisplay.innerHTML = timeLeft;
    currentQuestion = 0;
    initialsField.value = "";
}

function saveScores() {
    localStorage.setItem("scores", JSON.stringify(highScores));
    console.log(saveScores);
}

function loadScores() {
    var loadedScores = localStorage.getItem("scores");
    if(!loadedScores) {
        highScores = [];
    } else {
        highScores = JSON.parse(loadedScores);
    }
    populateScores();
}

loadScores();

hsForm.addEventListener("submit", addHighScore);