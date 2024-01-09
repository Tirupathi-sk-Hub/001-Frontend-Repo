import {getPassword} from "./data.js"


const generateButton = document.querySelector('.js-button');
const passwordLength = document.getElementById('number');


//This adds Click event to Generate button and execute the attached function:
generateButton.addEventListener('click', (event) => {
    event.preventDefault();

    const lengthVal = passwordLength.value;

    if (lengthVal < 8 || lengthVal > 60) {
        document.querySelector('.js-output-msg').innerHTML = 'Please enter a number greater than 8!';
    }   else {
        document.querySelector('.js-output-msg').innerHTML = getValues(lengthVal);
    }
    
});


//This adds Enter-Event to input element and execute the same functions as the Generate button does:
passwordLength.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const lengthVal = passwordLength.value;

        if (lengthVal < 8 || lengthVal > 60) {
            document.querySelector('.js-output-msg').innerHTML = 'Please enter a number greater than 8!';
        }   else {
            document.querySelector('.js-output-msg').innerHTML = getValues(lengthVal);
        }
    }
});




//This function takes password-Length as lengthVal parameter and divides the lengthVal into 3-numbers, which adds upto the same lengthVal. It return's an array of 3-numbers:
function generateNumbers(lengthVal) {

    let num1 = 0;
    let num2 = 0;
    let num3 = 0;

    while (num1 === 0 || num2 === 0 || num3 ===0) {

        num1 = Math.floor(Math.random() * lengthVal);
        num2 = Math.floor(Math.random() * (lengthVal - num1));
        num3 = lengthVal - num1 - num2;
    }

    // console.log(num1, num2, num3);
    return [num1, num2, num3]
    
}


//This function takes password-Length as lengthVal parameter, Generaters 3-numbers which adds upto the lengthValt, generates an array of password-charaters and return's the password:
function getValues(lengthVal) {

    const NumberVal = generateNumbers(lengthVal);
       
    const pass = getPassword(NumberVal);
    
        let password= '';
        for(let i=0; i<pass.length; i++) {
            // console.log(pass[i]);
            password += pass[i];
        }
    
    return password;
}


