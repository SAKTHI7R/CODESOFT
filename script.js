let currentInput = '';
let currentOperation = null;
let storedInput = null;

function updateDisplay() {
    document.getElementById('display').innerText = currentInput;
}

function appendNumber(number) {
    if (currentInput === '0' || currentInput === 'Error') {
        currentInput = number;
    } else {
        currentInput += number;
    }
    updateDisplay();
}

function appendDecimal() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
        updateDisplay();
    }
}

function clearDisplay() {
    currentInput = '0';
    currentOperation = null;
    storedInput = null;
    updateDisplay();
}

function setOperation(operator) {
    if (currentInput !== 'Error') {
        if (currentOperation !== null) {
            calculateResult();
        }
        currentOperation = operator;
        storedInput = currentInput;
        currentInput = '0';
        updateDisplay();
    }
}

function calculateResult() {
    if (currentOperation !== null && storedInput !== null && currentInput !== 'Error') {
        const num1 = parseFloat(storedInput);
        const num2 = parseFloat(currentInput);

        switch (currentOperation) {
            case '+':
                currentInput = (num1 + num2).toString();
                break;
            case '-':
                currentInput = (num1 - num2).toString();
                break;
            case '*':
                currentInput = (num1 * num2).toString();
                break;
            case '/':
                if (num2 !== 0) {
                    currentInput = (num1 / num2).toString();
                } else {
                    currentInput = 'Error';
                }
                break;
            default:
                break;
        }

        currentOperation = null;
        storedInput = null;
        updateDisplay();
    }
}

function calculatePercentage() {
    if (currentInput !== 'Error') {
        currentInput = (parseFloat(currentInput) / 100).toString();
        updateDisplay();
    }
}

function calculateSquareRoot() {
    if (currentInput !== 'Error') {
        currentInput = Math.sqrt(parseFloat(currentInput)).toString();
        updateDisplay();
    }
}

function backspace() {
    if (currentInput !== 'Error' && currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
        updateDisplay();
    } else {
        currentInput = '0';
        updateDisplay();
    }
}

// Keyboard support
document.addEventListener('keydown', handleKeyPress);

function handleKeyPress(event) {
    const key = event.key;

    if (/[0-9]/.test(key)) {
        appendNumber(key);
    } else if (key === '.') {
        appendDecimal();
    } else if (key === 'Enter' || key === '=') {
        calculateResult();
    } else if (key === 'Backspace') {
        backspace();
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        setOperation(key);
    }
}

// Initial display update
updateDisplay();
