let questionAnswer = [{
    Question: "1)Inside which HTML element do we put the JavaScript?",
    Options: ["scripting", "script", "js", "javascript"],
    Answer: "script"
},

{
    Question: "2)Where is the correct place to insert a JavaScript?",
    Options: ["body ", "head", "both", "none"],
    Answer: "both"
},

{
    Question: "3)How many days in month?",
    Options: ["30", "45", "15", "7"],
    Answer: "30"
},

{
    Question: "4)How many days in week?",
    Options: ["30", "45", "15", "7"],
    Answer: "7"
},

{
    Question: "5)How many months in year?",
    Options: ["30", "12", "15", "7"],
    Answer: "12"
}
]


let score = 0;
let currentIndex = 0;
let timeInterval;
let timeLeft = 120;


//start quiz
function startQuiz() {
    let startTime = new Date().toLocaleTimeString();
    localStorage.setItem('currentTime', JSON.stringify(startTime));
    //console.log(startTime)
    score = 0;
    currentIndex = 0;
    document.getElementById("scorecard").style.display = "none";
    document.getElementById("restartBtn").style.display = "none";
    showQuestion();
}


//question card show
function showQuestion() {
    clearInterval(timeInterval);
    timeLeft = 120;
    let questionCard = document.getElementById("questioncard");
    questionCard.style.display = "block"
    let nextBtn = document.getElementById("nextBtn");
    nextBtn.style.display = "none";

    let questionData = questionAnswer[currentIndex];

    let startBtn = document.getElementsByClassName("container")[0];
    startBtn.style.display = "none";

    let options = "";
    for (let i = 0; i < 4; i++) {
        options += `<div class="customContainer"><div class="form-check"><input class="form-check-input" type="radio" name="radioDefault" id="radioDefault${currentIndex}${i}"><label class="form-check-label" for="radioDefault${currentIndex}${i}">${questionData.Options[i]}</label></div></div>`
    }

    questionCard.innerHTML = `<div><h4>Question ${currentIndex+1}  out of 5</h4></div><div id="questionOptions"><h4>${questionData.Question}</h4><div>${options}</div></div><button id="submitBtn" class="btn btn-success" onclick="submitAction()">Submit</button>`;



    //2 min after switch the question if not submitted any answer
    timeInterval = setInterval(() => {
        timeLeft--;
        timetoDisplay();
        if (timeLeft <= 0) {
            nextAction();
        }

    }, 1000);

}


function timetoDisplay() {
    let timer = document.getElementById("timerOfQuestion");
    timer.style.display="block"
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    timer.innerHTML = `<h4>timer:${minutes}:${seconds}</h4> `;
    if(timeLeft<=10){
        timer.innerHTML = `<h4>Timer:<span class="fail">${minutes}:${seconds}</span></h4> `
    }
}



//submit button action 
function submitAction() {
    clearInterval(timeInterval);
    let timer = document.getElementById("timerOfQuestion");
    timer.style.display="none"
    //checks the question number to ensure it doesn't exit 5
    if (currentIndex < 4) {
        document.getElementById("correctAnswer").style.display = "block";
        let questionData = questionAnswer[currentIndex];
        let selectedOption = document.querySelector('input[name=radioDefault]:checked');
        let selectedAnswer = selectedOption?.nextElementSibling?.innerText;
        let radios = document.querySelectorAll('input[name="radioDefault"]');
        radios.forEach(radio => radio.disabled = true);
        if (selectedAnswer == questionData.Answer) {
            score++;
        }

        let submitBtn = document.getElementById("submitBtn");
        submitBtn.style.display = "none"
        let nextBtn = document.getElementById("nextBtn");
        nextBtn.style.display = "block"

        let correctAnswer = document.getElementById("correctAnswer");
        correctAnswer.innerHTML = `<h2>Correct Answer:<span class="answer">${questionData.Answer}</span></h2>`

    }

    //when questions are over it shows time taken and the score
    else if (currentIndex === 4) {
        let endTime = new Date().toLocaleTimeString();
        console.log(endTime);
        document.getElementById("questioncard").style.display = "none";
        document.getElementById('scorecard').style.display = "block";
        document.getElementById("restartBtn").style.display = "block";

        
        if(score<=3){
            document.getElementById("scorecard").innerHTML = `<h2>Your score:<span class="fail">${score}</span>/5</h2>`
        document.getElementById("scorecard").innerHTML += `<h4><span class="fail">Retake the test</span></h4>`

        }
else{
    document.getElementById("scorecard").innerHTML = `<h2>Your score:<span class="pass">${score}</span>/5</h2>`
        document.getElementById("scorecard").innerHTML += `<h4><span class="pass">Congratulations🎉🎉</span></h4>`
}

        let timer = document.getElementById("timer");
        timer.style.display = "block";
        let startTime = JSON.parse(localStorage.getItem('currentTime'));
        startTime = startTime.split(":")
        //console.log("start in array", startTime)
        startTime = (startTime[0] * 3600) + (startTime[1] * 60) + (startTime[2].slice(0, 2));
        //console.log("start in sec", startTime);
        endTime = endTime.split(":");
        //console.log("end in array")
        endTime = (endTime[0] * 3600) + (endTime[1] * 60) + (endTime[2].slice(0, 2));
        //console.log("end in sec", endTime);
        let timeDifference = endTime - startTime;
        //console.log("diff", timeDifference)
        let d = parseInt(Math.floor(timeDifference / 3600));

        //console.log("d", d)
        let c = parseInt(timeDifference % 60);
        //console.log("c", c)
        timer.innerHTML = `<h2>you took <span class="pass">${d}</span> minutes <span class="pass">${c}</span> seconds</h2>`


    }

}

//next btn onclick action
function nextAction() {

    //on last question goes to submit the test
    if (currentIndex === 4) {
        clearInterval(timeInterval);
        document.getElementById("timerOfQuestion").style.display = "none";
        submitAction();
        return;
    }

    currentIndex++;
    document.getElementById("correctAnswer").style.display = "none";
    let submitBtn = document.getElementById("submitBtn");
    submitBtn.style.display = "none"
    let nextBtn = document.getElementById("nextBtn");
    nextBtn.style.display = "block"
    showQuestion();
}


//onclick function of restart button
function restart() {

    document.getElementById("timer").style.display = "none"
    let startBtn = document.getElementsByClassName("container")[0];
    startBtn.style.display = "block";
    document.getElementById("scorecard").style.display = "none";
    document.getElementById("restartBtn").style.display = "none";
}

