document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('button');
    let currentInput = '';
    let previousInput = '';
    let operator = null;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent.trim();

            if (!isNaN(value) || value === '.') {
                handleNumber(value);
            } else if (value === 'C') {
                clearDisplay();
            } else if (value === '') {
                deleteLast();
            } else if (value === '=') {
                calculate();
            } else {
                handleOperator(value);
            }
            updateDisplay();
        });
    });

    function handleNumber(value) {
        if (value === '.' && currentInput.includes('.')) return;
        currentInput += value;
    }

    function handleOperator(value) {
        if (currentInput === '') return;
        if (previousInput !== '') {
            calculate();
        }
        operator = value;
        previousInput = currentInput;
        currentInput = '';
    }

    function calculate() {
        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        if (isNaN(prev) || isNaN(current)) return;

        switch (operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case 'x':
                result = prev * current;
                break;
            case '/':
                result = prev / current;
                break;
            default:
                return;
        }
        currentInput = result.toString();
        operator = null;
        previousInput = '';
    }

    function clearDisplay() {
        currentInput = '';
        previousInput = '';
        operator = null;
    }

    function deleteLast() {
        currentInput = currentInput.slice(0, -1);
    }

    function updateDisplay() {
        display.textContent = currentInput;
    }
});
