// var firebaseConfig = {
//     apiKey: "AIzaSyB3ASn72wt5p065pUeBswRrZ62bK116SLk",
//     authDomain: "quiz-application-e78ac.firebaseapp.com",
//     databaseURL: "https://quiz-application-e78ac-default-rtdb.firebaseio.com",
//     projectId: "quiz-application-e78ac",
//     storageBucket: "quiz-application-e78ac.appspot.com",
//     messagingSenderId: "863718456325",
//     appId: "1:863718456325:web:04aefe7573a1f3b9a5706c"
// };
// var app = firebase.initializeApp(firebaseConfig);
// console.log(database);
























var questions = [
    {
        question: "What is the capital of United Kingdom?",
        option1: "Manchester",
        option2: "Birmingham",
        option3: "London",
        correctAns: "Birmingham"
    },
    {
        question: "What is the capital of United States?",
        option1: "California",
        option2: "New York",
        option3: "Miami",
        correctAns: "California"
    }, {
        question: "What temperature does water boil at?",
        option1: "10 degrees Celcius",
        option2: "50 degrees Celcius",
        option3: "100 degrees Celcius",
        correctAns: "100 degrees Celcius"
    }, {
        question: "Who wrote Julius Caesar, Macbeth and Hamlet?",
        option1: "William Shakespeare",
        option2: "Dan Brown",
        option3: "Ngozi Chimamanda Adichie",
        correctAns: "William Shakespeare"
    }, {
        question: "What colour is a panda?",
        option1: "Black and White",
        option2:  "Green and White",
        option3:  "Blue and Red",
        correctAns: "Black and White"
    }
    , {
        question: "Who lived at 221B, Baker Street, London?",
        option1: "Tony Stark",
        option2: "lock Holmes",
        option3:"Sherlock Holmes",
        correctAns: "Sherlock Holmes"
    }]
var para = document.getElementById("ques");
var opt1 = document.getElementById("opt1");
var opt2 = document.getElementById("opt2");
var opt3 = document.getElementById("opt3");
var button = document.getElementById("btn");
var timer = document.getElementById("timer")
var index = 0;
var score = 0;
var min = 1;
var sec = 59;
setInterval(function () {
    timer.innerHTML = `${min}:${sec}`;
    sec--
    if (sec < 0) {
        min--;
        sec = 59
    }
    if (min < 0) {
        min = 1;
        sec = 59;
        nextQuestion()
    }

}, 1000)


function nextQuestion() {
    var getOptions = document.getElementsByName("options");
    for (var i = 0; i < getOptions.length; i++) {
        if (getOptions[i].checked) {
            var selectedValue = getOptions[i].value;
            var selectedQues = questions[index - 1]["question"];
            var selectedAns = questions[index - 1][`option${selectedValue}`]
            var correctAns = questions[index - 1]["correctAns"]
            if (selectedAns == correctAns) {
                score++
            }
        }
        getOptions[i].checked = false
    }
    button.disabled = true
    if (index > questions.length - 1) {
        Swal.fire(
        
            `Your percentage is ${((score / questions.length) * 100).toFixed(2)}`
           
        )
    }
    else {

        para.innerHTML = questions[index].question;
        opt1.innerText = questions[index].option1;
        opt2.innerText = questions[index].option2;
        opt3.innerText = questions[index].option3;
        index++
    }
}
function clicked() {
    button.disabled = false
}




function addquiz() {
    var userInput = document.getElementById("userInput")
    var database = firebase.database().ref('username')
    var marks =  score * 100;
    var key = database.push().key
    var quiz = {
        value: userInput.value,
        totalscore: marks,
        key: key
    }
    database.child(key).set(quiz)
    userInput.value = "";


}