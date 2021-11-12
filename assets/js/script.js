var startBtn = document.querySelector("#startBtn");
var clickBtn1 = document.querySelector("#examBtn1");
var clickBtn2 = document.querySelector("#examBtn2");
var clickBtn3 = document.querySelector("#examBtn3");
var clickBtn4 = document.querySelector("#examBtn4");

var examQuestion = document.querySelector("#examQuestion");

//need an event to start the quiz

startBtn.addEventListener('click', startQuiz());
//need to hide start button after clicking it

// I couldn't even make this first concept work. I even tried to copy and paste it right in and change what I needed and I couldn't figure it out.
function startBtnHide() {
if (startBtn === "visible") {
    element.textContent = "";
 element.dataset.state = "hidden";
} else {
element.dataset.state = "visible";
}
    
}
//need to populate question and answers

function startQuiz() {
    startBtnHide();

}

//need an event to select answers



//need an event move to next question