const question = [
    {
        question:"How to write an IF statement in JavaScript?",
        answers : [
            { text :"if(i == 5)" , correct:true},
            { text :"if i == 5 then" , correct:false},
            { text :"if i = 5 then" , correct:false},
            { text :"if i = 5" , correct:false},

        ]
    },
    {
        question:"How do you write 'Hello World' in an alert box?",
        answers : [
            { text :"msgBox('Hello World')" , correct:false},
            { text :"msg('Hello World')" , correct:false},
            { text :"alert('Hello World')" , correct:true},
            { text :"alertBox('Hello World')" , correct:false},

        ]
    },
    {
        question:"How do you create a function in JavaScript?",
        answers : [
            { text :"function myFunction()" , correct:true},
            { text :"function:myFunction()" , correct:false},
            { text :"function = myFunction()" , correct:false},
            { text :"function = my()Function" , correct:false},

        ]
    },
    {
        question:"How does a WHILE loop start?",
        answers : [
            { text :"while (i <= 10;i++)" , correct:false},
            { text :"while i = 1 to 10" , correct:false},
            { text :"while(i <= 10)" , correct:true},
            { text :"while(i == 10)" , correct:false},

        ]
    },
    {
        question:"How does a FOR loop start?",
        answers : [
            { text :"for(i <=5;i++)" , correct:false},
            { text :"for(i=0;i<=5)" , correct:false},
            { text :"for(i=0;i<=5;i++)" , correct:true},
            { text :"for i = 1 to 5" , correct:false},

        ]
    },

]

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = question[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
        
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct ==="true";

    if(isCorrect){
        selectBtn.classList.add("correct");
        score++;
    }
    else{
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `you scored ${score} out of ${question.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}
function handleNextButton(){
    currentQuestionIndex++;

    if(currentQuestionIndex < question.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click" , ()=>{
    if(currentQuestionIndex < question.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
});
startQuiz();
