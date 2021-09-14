const $input = document.querySelector("input");

document.querySelectorAll(".num").forEach(
    el => {
        el.onclick = () => ($input.value = $input.value !==
        "0" ? $input.value + el.innerText : el.innerText);
    });

const buffer = [];

const opCallBack = opName => () => {
    // return input as floating number
    let currentVal = parseFloat($input.value);

    if (opName === "percent") {
        currentVal *= 0.01;
        $input.value = currentVal;
    }
    else {
    // Check if there is buffer
        if(buffer && buffer.length) {
            // Object literals
            buffer.push({value: currentVal});

            const result = evaluate(buffer);

            buffer.push({ value:result});
            buffer.push({ value: opName});
        }
        else {
            buffer.push({value: currentVal});
            buffer.push({ value: opName});

            $input.value = "";
        }
    }
};

const evaluate = buffer => {
    const secondOperand = buffer.pop().value;
    const operator = buffer.pop().value;
    const firstOperand = buffer.pop().value;

switch (operator) {
    case "add":
        return firstOperand + secondOperand;
        break;
    case "subtract":
        return firstOperand - secondOperand;
        break;
    case "multiply":
        return firstOperand * secondOperand;
        break;
    case "divide":
        return firstOperand / secondOperand;
        break;
    default:
        return secondOperand;
    }
};


for(const opName of ["add", "subtract", "multiply", "divide", "percent"]) {
    document.querySelector(`.op__key[op=${opName}]`)
    .onclick = opCallBack(opName);
}


document.querySelector(".equals").onclick = 
    () => {
        //check if the buffer is there
        if (buffer && buffer.length) {
            buffer.push({ value: parseFloat($input.value)
            });
            //to see the results
            $input.value = evaluate(buffer);
        }
    }

document.querySelector(".op__key[op=clear]")
.onclick = () => {
    $input.value = 0;
    buffer.length = 0;
};

document.querySelector(".op__key[op=negate]")
.onclick = () => {
    ($input.value = -parseFloat($input.value));
}

// divideBtn = document.getElementsByClassName("divide");
// timesBtn = document.getElementsByClassName("times");
// minusBtn = document.getElementsByClassName("minus");
// plusBtn = document.getElementsByClassName("plus");
// equalsBtn = document.getElementsByClassName("equals");

// clearBtn = document.getElementsByClassName("clear");
// posnegBtn = document.getElementsByClassName("pos-neg");
// percentBtn = document.getElementsByClassName("percent");

// decimalBtn = document.getElementsByClassName("decimal");


// function inputNum(e) {
//     const num = document.querySelector(`.num[data-key="${e.keyCode}"]`);
    
// }


// window.addEventListener('keydown', inputNum);
