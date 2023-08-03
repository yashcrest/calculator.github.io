class Calculator {
    constructor(previousNumberText, currentNumberText){
        this.previousNumberText = previousNumberText;
        this.currentNumberText = currentNumberText;
        this.clear();
    }

    clear(){
        this.currentNumber = '';
        this.previousNumber = '';
        this.operation = undefined;
        this.isResultDisplayed = false;
    }

    appendNumber(number){
        if(number ===  '.' && this.currentNumber.includes('.')) return 
        if(this.isResultDisplayed){
            this.currentNumber = ''
            this.isResultDisplayed = false;
        }
        this.currentNumber = this.currentNumber.toString() + number.toString(); //we are changing these numbers as string cause at first while taking the input from the user we do not want it to add the number like (1+1 = 2) instead we just want it to diplay (1+1 = 11) and so 

    }

    deleteNumber(){
       this.currentNumber =  this.currentNumber.toString().slice(0, -1);
    }

    chooseOperations(operation){
        if(this.currentNumber === '') return
        if(this.previousNumber !== ''){
            this.computeNumber();
        }
        this.operation = operation;
         this.previousNumber = this.currentNumber;
         this.currentNumber = ''
    }
    
    computeNumber(){
        let result
        let currentNumberParse = parseFloat(this.currentNumber);
        let previousNumberParse = parseFloat(this.previousNumber);

        if (isNaN(currentNumberParse) && isNaN(previousNumberParse)) return
        switch(this.operation){
            case '+' : 
                result = previousNumberParse + currentNumberParse;
                break;
            case '-' : 
                result = previousNumberParse - currentNumberParse;
                break;
            case '÷' : 
                result = previousNumberParse / currentNumberParse;
                break;
            case '×' : 
                result = previousNumberParse * currentNumberParse;
                break;
            default : 
            return;
        }
        this.currentNumber = result;
        this.operation = undefined;
        this.previousNumber = '';
        this.isResultDisplayed = true;
    }

    getCorrectedNumber(number){
        const stringNumber = number.toString();
        const integerNumber = parseFloat(stringNumber.split('.')[0]);
        const decimalNumber = stringNumber.split('.')[1];
        let integerDisplay 
        if(isNaN(integerNumber)){
            integerDisplay = ''
        } else {
            integerDisplay = integerNumber.toLocaleString('en' , {maximumFractionDigits : 0} )
        }
        if(decimalNumber != null){
            return `${integerDisplay}.${decimalNumber}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay(){
        this.currentNumberText.innerText = this.getCorrectedNumber(this.currentNumber);
        if(this.operation != null) {
            this.previousNumberText.innerText  = `${this.getCorrectedNumber(this.previousNumber)} ${this.operation}`
        } else {
            this.previousNumberText.innerText = ''
        }
    } 
}




//Mapping HTML elements
const numbersBtn = document.querySelectorAll('[data-number]');
const operationsBtn = document.querySelectorAll('[data-operations]');
const previousNumberText = document.querySelector('[data-previous-number]');
const currentNumberText = document.querySelector('[data-current-number]');
const allClearBtn = document.querySelector('[data-all-clear]')
const deleteBtn = document.querySelector('[data-delete]')
const equalsBtn = document.querySelector('[data-equals]')


//New Calculator object 
const calculator = new Calculator(previousNumberText, currentNumberText)

numbersBtn.forEach(number => {
    number.addEventListener('click' , ()=>{
        calculator.appendNumber(number.value);
        calculator.updateDisplay();
    })
})

operationsBtn.forEach(operation => {
    operation.addEventListener('click' , ()=>{
        calculator.chooseOperations(operation.value);
        calculator.updateDisplay();
    })
})

allClearBtn.addEventListener('click' , ()=>{
    calculator.clear();
    calculator.updateDisplay();
})

deleteBtn.addEventListener('click' , ()=> {
    calculator.deleteNumber();
    calculator.updateDisplay();
})

equalsBtn.addEventListener('click' , ()=> {
    calculator.computeNumber();
    calculator.updateDisplay();
})


//Getting Keyboard input
const keys = {
    '0' : () => calculator.appendNumber('0'),
    '1' : () => calculator.appendNumber('1'),
    '2' : () => calculator.appendNumber('2'),
    '3' : () => calculator.appendNumber('3'),
    '4' : () => calculator.appendNumber('4'),
    '5' : () => calculator.appendNumber('5'),
    '6' : () => calculator.appendNumber('6'),
    '7' : () => calculator.appendNumber('7'),
    '8' : () => calculator.appendNumber('8'),
    '9' : () => calculator.appendNumber('9'),
    '0' : () => calculator.appendNumber('0'),
    '+' : () => calculator.chooseOperations('+'),
    '-' : () => calculator.chooseOperations('-'),
    '/' : () => calculator.chooseOperations('÷'),
    '*' : () => calculator.chooseOperations('×'),
    '.' : () => calculator.appendNumber('.'),
    'Enter' : () => calculator.computeNumber(),
    'Backspace' : () => calculator.deleteNumber()
}


document.addEventListener('keyup' , (e) => {
    const button = keys[e.key];

    if (button) {
        button()
        calculator.updateDisplay();
    }
})