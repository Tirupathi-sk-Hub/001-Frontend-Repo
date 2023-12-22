import {question_Bank} from "../data/questionBank.js";
import {ansCart} from "../data/questionBank.js";

//This is a Cart that takes user-submitted-answers:
let userCart =  [];


//Is an Accumulator variable that takes Question-Data:
let html = '';


//Is a stroage that displays data stored in localstroage, when the page loads:
getStroage();


//This code loops through question-bank and adds HTML code to the accumulator variable:
question_Bank.forEach((question) => {

    html += `
        <div class="question-container">

            <span class="Question">${question.question}</span>

            <div class="ans-container">
                <input type="radio" name="optn${question.id}" id="optn1" 
                    class="optn1 js-optn1"
                    data-question-Id="${question.id}"
                    data-question-ans="${question.Ans}">
                <div class="ans">${question.Ans}</div>
            </div>

            <div class="ans-container">
                <input type="radio" name="optn${question.id}" id="optn1" 
                    class="optn1 js-optn1"
                    data-question-Id="${question.id}"
                    data-question-ans="${question.Ans1}">
                <div class="ans">${question.Ans1}</div>
            </div>
            
        </div>
    `;
});

//This displays all HTML code on to the page:
document.querySelector('.js-container').innerHTML = html;


//This code takes control of every radio-buttons & look for click event:
//If event happens, it saves associated data of the option into the user-cart, even the user changes to other option of the same question:
document.querySelectorAll('.js-optn1').forEach((option) => {
    option.addEventListener('click', () => {

        const questionId = option.dataset.questionId;
        const questionAns = option.dataset.questionAns;

        let matchingAnswer;

        ansCart.forEach((answer) => {
            if (answer.id === questionId) {
                matchingAnswer = answer;
            }
        });

        const correctAns = matchingAnswer.Ans;
        
        let matchingItem ;
            
        userCart.forEach((Item) => {
            if (Item.questionId === questionId) {
                matchingItem = Item;
            }
        });

        if(!matchingItem) {
            userCart.push({
                questionId : questionId,
                questionAns : questionAns,
                correctAns : correctAns
            });
            saveToStorage();

        }   else {
                if(matchingItem.questionAns !== questionAns) {
                    let matchingQstn;
                    userCart.forEach((Item) => {
                        if(Item.questionId === questionId) {
                            matchingQstn = Item;
                            matchingQstn.questionAns = questionAns;
                        }
                    });
                }
                saveToStorage();
            }
    });
});

//This code checks for submit event:
//If event happens, it checks for the user-submitted-answer & actual-answer of the questions:
//And display's, the Number-of-Questions-Attended, Number-of-Questions that answered correctly & Number-of-Questions that are missed:
const main = document.getElementById('main');

main.addEventListener('submit' , (event) => {
    
    event.preventDefault();
    document.title = "Result-Page";

    if (userCart.length === 0) { 
        let Msg = 'I know you are Smart 🧠, please check the Answers and Click submit.👍';

        document.querySelector('.js-error').innerHTML = Msg;
        setTimeout(() => {
            Msg = ''
            document.querySelector('.js-error').innerHTML = Msg;
        }, 3000);
        
    }   else {
        let rightAns = 0;
        let wrongAns = 0;

        userCart.forEach((Item) => {

            if (Item.questionAns === Item.correctAns) {
                rightAns++;
            } else {
                wrongAns++;
            }
        });


    let userHTML = '';
    userCart.forEach((Item) => {
        const userQuestionId = Item.questionId;

        question_Bank.forEach((question) => {
            const questionId = question.id;

            if (userQuestionId === questionId) {
                const Question = question.question;

                userHTML +=`
                    <p class="question">${Question}</p>
                    <div class="result-container">
                        <div class="ans">"Your Answer is : ${Item.questionAns}"</div>
                        <div class="ans">"Correct answer is : ${Item.correctAns}"</div>
                    </div>
                `;
            }
        });
        
    });
    


    const totalQuestion = question_Bank.length;
    document.querySelector('.js-result').innerHTML = `Total Questions : ${totalQuestion} - - - 
                    You have answered ${rightAns} correctly And you Missed ${wrongAns}`;

    document.querySelector('.js-container').innerHTML = userHTML;

    const displayElem = document.querySelector('.js-result');
    displayElem.classList.add('board');

    const displayElem2 = document.querySelector('.js-container');
    displayElem2.classList.add('board');

    document.querySelector('.js-submit-button').innerText = 'Submitted';

}

saveToStorage();
getStroage();
});  


//Function that saves to stroage:
function saveToStorage() {
    localStorage.setItem('userCart', JSON.stringify(userCart));
}


//Function that get's data from the stroage:
function getStroage() {
    const previousData = JSON.parse(localStorage.getItem('userCart'));
    console.log(previousData);
}