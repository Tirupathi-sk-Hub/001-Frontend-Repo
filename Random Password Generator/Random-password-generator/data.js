export const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

export const alphabet = ['a', 'A', 'b', 'B', 'c', 'C', 'd', 'D', 'e', 'E', 'f', 'F', 'g', 'G', 'h', 'H', 'i', 'I', 'j', 'J', 'k', 'K', 'l', 'L', 'm', 'M', 'n', 'N', 'o', 'O', 'p', 'P', 'q', 'Q', 'r', 'R', 's', 'S', 't', 'T','u', 'U', 'v', 'V', 'w', 'W', 'x', 'X', 'y', 'Y', 'z', 'Z'];

export const specialChar = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '>', '<', '/'];


//This function takes an array of 3-numbers as NumberVal-parameter, generates password according to the 3-numbers and return's an array of password-characters:
export function getPassword(NumberVal){
    let pass = [];

    const num1 = NumberVal[0];
    const num2 = NumberVal[1];
    const num3 = NumberVal[2];

        for(let i=0; i<num1; i++){
            
            const val1 = Math.floor(Math.random() * numbers.length);
            pass.push(numbers[val1]);
        }

        for(let i=0; i<num2; i++) {
            const val2 = Math.floor(Math.random() * alphabet.length);
            pass.push(alphabet[val2]);
        }

        for(let i=0; i<num3; i++) {
            const val3 = Math.floor(Math.random() * specialChar.length);
            // console.log(val3);
            pass.push(specialChar[val3]);
        }

    console.log(pass);
    // console.log(pass.length);
    return pass
}