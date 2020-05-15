const numberButtons = document.querySelectorAll('#numbers input');
let firstNumber, secondNumber, number=[], currentNumber=0;

//REGISTER BUTTON CLICKS
numberButtons.forEach(function(button){
    button.addEventListener('click', function(){
        
        if(button.value<10){
            if(number[currentNumber]==undefined 
            || number[currentNumber]===answer) number[currentNumber]=button.value;

            else number[currentNumber]+=button.value;
        }
        else if(button.value==='.' && number[currentNumber]!==undefined){
            if(!toString(number[currentNumber]).includes('.')){
                number[currentNumber]+=button.value
            }
        }
        else if(button.value==='∓' && number[currentNumber]!==undefined){
            number[currentNumber]*=-1;
        }
        
        
    
    })
})

//OPERATIONS
const operationsButtons = document.querySelectorAll('#operations input')
let operationClicked, displayOperator;
operationsButtons.forEach(function(button){
    button.addEventListener('click', function(){
        if (number[0]===undefined && answer!==undefined){//operation to answer
            operationClicked=button.id;
            displayOperator=button.value;
            number[0]=answer;
            currentNumber=1;
            console.log('mae')
        }
        else if (number[0]!==undefined){
            operationClicked=button.id;
            displayOperator=button.value;
            currentNumber=1;
        }
    });
})

//EQUALS SIGN
let answer;
document.querySelector('#equals').addEventListener('click', function(){
    answer = operate(number[0], number[1], operationClicked)
    console.log(answer);
    number=[answer];
    currentNumber=0;
})


function operate(a, b, operator){
    let firstNumber = parseFloat(a);
    let secondNumber = parseFloat(b);
    if (isNaN(secondNumber)) return firstNumber;
    switch(operator){
        case 'add':
            return firstNumber+secondNumber;
        break;
        
        case 'subtract':
            return firstNumber-secondNumber;
        break;

        case 'multiply':
            return firstNumber*secondNumber;
        break;

        case 'divide':
            return firstNumber/secondNumber;
        break;
    }
}


//UPDATE SCREEN
const answerText = document.querySelector('#answer_box')
answerText.value = '';
const allButtons = document.querySelectorAll('input[type="button"]')
allButtons.forEach(function(button){
    button.addEventListener('click', function(){
        if(button.parentElement.id==="numbers" && button.classList.includes!=="not_really"){
            (currentNumber===0)
            ? answerText.value = number[currentNumber] 
            : answerText.value = `${number[0]} ${displayOperator} ${number[1]}`;
            console.log(button.classList); 
        }
        else if (button.parentElement.id==="operations" && number[0]!==undefined){
            console.log(number[0])
            answerText.value += ` ${displayOperator}`
        }
        else if (button.id==="equals"){
            answerText.value = parseFloat(answer.toFixed(10));
        }
        else if(button.id==="clear"){
            answerText.value = (currentNumber===0) ? '' : `${number[0]} ${displayOperator}` 
        }
        else if(button.id==="reset"){
            answerText.value = '' 
        }


    });

});

document.querySelector('#clear').addEventListener('click', function(){
    if (number[0] === answer) answer=undefined
    number[currentNumber]=undefined;
    
})

document.querySelector('#reset').addEventListener('click', function(){
    number=[];
    currentNumber=0;
    answer=undefined;
})