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
       this.currentNumber = this.currentNumber
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

    updateDisplay(){
        this.currentNumberText.innerText = this.currentNumber;
        if(this.operation != null) {
            this.previousNumberText.innerText  = `${this.previousNumber} ${this.operation}`
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