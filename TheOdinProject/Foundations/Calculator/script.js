/**
 * Control if an input is of type Number
 * @param {any} value        - value to test
 * @param {string} paramName - Parameter to test
 * @throws {TypeError}       In case of invalid value.
 */
function assertNumber(value, paramName = 'value') {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    throw new TypeError(
      `Parameter '${paramName}' must be a valid number. Received: ${typeof value} (${value})`
    );
  }
}

let store = "0";
let input = "0";
let op = "None";
let first_op = true;
let decimal = false;

/**
 * Cancel all operations
 */
function cancel() {
    store = "0";
    input = "0";
    op = "None";
    first_op = true;
    decimal = false;
}

/**
 * 
 * @param {id} id - button tag id 
 * @returns convret the button id into digit
 */
function digitsMap(id) {
    if(id == "zero") return "0";
    if(id == "one") return "1";
    if(id == "two") return "2";
    if(id == "three") return "3";
    if(id == "four") return "4";
    if(id == "five") return "5";
    if(id == "six") return "6";
    if(id == "seven") return "7";
    if(id == "eight") return "8";
    if(id == "nine") return "9";
}

function add(a, b) {
    assertNumber(a);
    assertNumber(b);
    return a + b;
}

function substract(a, b) {
    assertNumber(a);
    assertNumber(b);
    return a - b;
}

function multiply(a, b) {
    assertNumber(a);
    assertNumber(b);
    return a * b;
}

function divide(a, b) {
    assertNumber(a);
    assertNumber(b);
    if(b == 0)
    {
        return Number.NaN;
    }
    return a / b;
}

function operate(operation, a, b) {
    if (typeof window[operation] === 'function') {
        return window[operation](a, b); 
    }
}

function clickOperationEvent(e) {

    if(op != "None") {
        const a = Number(store);
        const b = Number(input);
        store = String(operate(op, a, b));    
        input = "0";
        op = e.target.id;
    }

    if(e.target.id == "evaluate") {
        if(input != "0" && store == "0") {
            store = input;
        }
        op = "None";
        first_op = true;
        return;
    }

    if(op == "None") {
        if(first_op) {
            store = input;
            input = "0";
            first_op = false;
        }
        op = e.target.id;
        return;
    }
}

function updateSign() {
    if(input != "0") {
        if(input.slice(0, 1) == "-"){
            input = input.slice(1);
        }
        else {
            input = "-" + input;
        }
        return;
    }
    if(store.slice(0, 1) == "-"){
        store = store.slice(1);
    }
    else {
        store = "-" + store;
    }
    input = store;
    store = "0";
    return;
}

function point(){
    if(!decimal) {
        decimal = true;
        if(store != "0" && input == "0") {
            store += ".";
            return;
        }
        input += ".";
        return;
    }
}

function backslash(){
    if((input == "0" || input == "0.") && (store == "0" || store == "0.")) return;
    if(input == "0" || input == "0.") return;
    if(store != "0" || store == "0.") {
        store = store.slice(0, -1);
        return;
    }
    input = input.slice(0, -1);
    return;
}

function clickDigitEvent(e) {
    if(e.target.id == "cancel") return cancel();
    if(op == "None"){
        if(e.target.id == "zero" && input == "0") return;
        if(e.target.id == "sign") return updateSign();
        if(e.target.id == "point") return point();
        if(e.target.id == "return") return backslash();
        if(store != "0" && input == "0") {
            input = store + digitsMap(e.target.id);
            store = "0";
            return;
        }
        if(input == "0" && decimal){
            input = "0." + digitsMap(e.target.id);
            decimal = false;
            return;
        }
        if(input == "0") {
            input = digitsMap(e.target.id);
            return;
        }
        input += digitsMap(e.target.id);
        return;
    }
    if(e.target.id == "sign") return updateSign();
    if(e.target.id == "point") return point();
    if(e.target.id == "return") return backslash();
    if(input == "0") {
        input = digitsMap(e.target.id);
        return;
    }
    if(input == "0.") {
        input = digitsMap(e.target.id);
        return;

    }
    input += digitsMap(e.target.id);
    return;
}

function updatePrint() {
    const print = document.getElementById("print");
    if(store != "0" && input == "0") {
        print.textContent = store;
        return;
    }
    print.textContent = input;
}

updatePrint();

// Select all button with the class 'operation'
const operation = document.querySelectorAll('button.operation');
operation.forEach(element => {
    // listen to mouse enter event
    element.addEventListener('mouseenter', (e) => {
        e.target.style.backgroundColor = '#808080';
    });
    // listen to mouse leave event
    element.addEventListener('mouseleave', (e) => {
        e.target.style.backgroundColor = '#3B3B3B';
    });
    // listen to button click event
    element.addEventListener('click', (e) => {
        clickOperationEvent(e);
        updatePrint();
    });
});  

const digits = document.querySelectorAll('button.digit');
digits.forEach(element => {
    // listen to mouse enter event
    element.addEventListener('mouseenter', (e) => {
        e.target.style.backgroundColor = '#808080';
    });
    // listen to mouse leave event
    element.addEventListener('mouseleave', (e) => {
        e.target.style.backgroundColor = '#3B3B3B';
    });
    // listen to button click event
    element.addEventListener('click', (e) => {
        clickDigitEvent(e);
        updatePrint();
    });
});  