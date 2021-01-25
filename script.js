// class Calculator
class Calculator {
//   constructor
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear() //when class object is called constructor is called aswell and initiates clear function which deletes label and output text
    }

//   clear function
    clear(){
        this.currentOperand = '' //sets ouput and label texts to empty strings
        this.previousOperand = ''
        this.operation = undefined //operation is undefined after clear button is clicked
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1); //takes output text converts it to string and removes last character with slice method
    }

    appendNumber(number) {
        if(number === '.' && this.currentOperand.includes('.')) return //if number includes decimal and output text includes decimal return nothing which basically will not allow to enter another decimal
        this.currentOperand = this.currentOperand.toString() + number.toString(); //output is equal to output text with added number which they are both converted to string
    }

    chooseOperation(operation) { //for + - * /
        if(this.currentOperand === '') return //if output text is blank return nothing will not allow to choose operation
        if(this.previousOperand !== ''){ //if label text is not equal to empty string then it will execute compute function
            this.compute()
        }
        this.operation = operation //this.operation is equal to operation we will pass in
        this.previousOperand = this.currentOperand //it means that when we choose operator we will overwrite label text with output text
        this.currentOperand = '' //and output text will be blank

    }

    compute() {
        let computation //it will be result of our compute function
        const prev = parseFloat(this.previousOperand) //converting label string value to float value
        const current = parseFloat(this.currentOperand) //converting output string value to float value
        if(isNaN(prev) || isNaN(current)) return //if label and output values are not numbers, basically not added then will return nothing / will not execute
        switch (this.operation) { //will check which operation is clicked
            case'+': //if +
                computation = prev + current //then sum is output + label values, which are now float values
                break
            case'-':
                computation = prev - current
                break
            case'*':
                computation = prev * current
                break
            case'/':
                computation = prev / current
                break
            default:
                return  //if none of operations are not used
        }
        this.currentOperand = computation //output text will be updated with computation result
        this.operation = undefined //after calculation result will appear and operation will be undefined again
        this.previousOperand = '' //label will be blank after calculation
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString() //for splitting decimal character
        const integerDigits = parseFloat(stringNumber.split('.')[0]) //
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)){ //checks if is not a number
            integerDisplay = '' //if yes then print out nothing
        }else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0 }) //no decimal places after value gets converted to string
        }
        if(decimalDigits != null){ //if decimal digits are not equal to null
            return `${integerDisplay}.${decimalDigits}` //then
        }else{ //if no decimal digits
            return integerDisplay //print out only integer digits
        }
    }

    updateDisplay(){
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if(this.operation != null){ //if operation is choosed
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}` //then ouput(HTML elements innerText) text is equal to acutal value plus the clicked operation
            //we concatenate them together with string literals
        } else {
            this.previousOperandTextElement.innerText = '' //label text is blank
        }
    }

}

//creating variables / HTML elements
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement) //object from class Calculator is been created

numberButtons.forEach(button => { //loop through the number buttons
    button.addEventListener('click', () => { //when clicked
        calculator.appendNumber(button.innerText) //will take buttons innerText and add it to the ouput text
        calculator.updateDisplay() //it will show it data in output and label text areas
    })
})

operationButtons.forEach(button => { //loop through the operation buttons
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText) //class Calculator object calculator invokes default constructor
        calculator.updateDisplay() //and functions are passed to this object aswell
    })
})

equalsButton.addEventListener('click', button=> { //when clicked
    calculator.compute() //will execute compute function
    calculator.updateDisplay() //and updateDisplay function
})

allClearButton.addEventListener('click', button=> { //same logic as above
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button=> { ////same logic as above
    calculator.delete()
    calculator.updateDisplay()
})