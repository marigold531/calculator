let equalAction = false;
let currentNum1 = 0;
let currentOP = "";
let currentNum2 = 0;


const numBtns = document.querySelectorAll(".number-btn");

numBtns.forEach(element => {
    element.addEventListener("click", () => {
        if(equalAction) {
            const botScreen = document.querySelector(".bot-screen");
            botScreen.textContent = "";
            equalAction = false;
        }
        addNumToScreen(element.textContent);
    })
});

function addNumToScreen(input) {
  const screen = document.getElementById("calc-screen");
  const calculator = document.querySelector(".container");
  
  
  const maxLength = 20;
  let currentContent = screen.textContent;
  
  if (currentContent.length < maxLength) {
    if(currentContent === "0") {
        currentContent = "";
    }
    const newContent = currentContent + input;
    screen.textContent = newContent;
  }
};


const operatorBtns = document.querySelectorAll(".operator");
operatorBtns.forEach(element => {
    element.addEventListener("click", () => {
        addOpeartor(element.textContent);
    });
});

function addOpeartor(input) {

    const topScreen = document.querySelector(".top-screen");
    const botScreen = document.querySelector(".bot-screen");
    
    if(topScreen.textContent && botScreen.textContent) {
        let result = eval();
        currentNum1 = result;
        console.log(`n1: ${currentNum1}, op: ${currentOP}, n2: ${currentNum2}`);
        const newContent = currentNum1 + " " + input;
        topScreen.textContent = newContent;
        botScreen.textContent = "";

        currentOP = input;
        return;
    }
    if(topScreen.textContent && !botScreen.textContent) {
        currentOP = input;
        const newContent = currentNum1 + " " + input;
        topScreen.textContent = newContent;
        console.log(`n1: ${currentNum1}, op: ${currentOP}, n2: ${currentNum2}`);
        return;
    }
    currentOP = input;
    currentNum1 = parseFloat(botScreen.textContent);

    if(botScreen.textContent === "") {
        return;
    }

    const newContent = botScreen.textContent + " " + input;
    topScreen.textContent = newContent;
    botScreen.textContent = "";

}

const clearBtn = document.getElementById("ac");
clearBtn.addEventListener("click", () => {
    const topScreen = document.querySelector(".top-screen");
    const botScreen = document.querySelector(".bot-screen");
    topScreen.textContent = "";
    botScreen.textContent = "0";
})

const deleteBtn = document.getElementById("del");
deleteBtn.addEventListener("click", () => {
    const topScreen = document.querySelector(".top-screen");
    if(topScreen.textContent !== "") {
        topScreen.textContent = "";
    }
    else {
        const botScreen = document.querySelector(".bot-screen");
        if(botScreen.textContent.length > 0) {
            botScreen.textContent = botScreen.textContent.slice(0, -1);
            if(botScreen.textContent <= 0) {
                botScreen.textContent = "0";
            }
        }
    }
})

function eval() {
    const botScreen = document.querySelector(".bot-screen");
    currentNum2 = parseFloat(botScreen.textContent);
    let result;
    if(!currentNum1 || !currentNum2) {
        return;
    }
    switch (currentOP) {
        case "+":
            result = (currentNum1 * 10 + currentNum2 * 10) / 10;
            break;
        case "-":
            result = (currentNum1 * 10 - currentNum2 * 10) / 10;
            break;
        case "x":
            result = (currentNum1 * 10 * currentNum2 * 10) / 100;
            break;
        case "÷":
            result = (currentNum1 * 10) / (currentNum2 * 10);
            break;
        case "%":
            result = currentNum1 % currentNum2;
            break;
        default:
            console.log("ERR");
            result = "ERROR";
            break;
    }
    equalAction = true;

    return result;
}

const equalBtn = document.getElementById("equal");
equalBtn.addEventListener("click", () => {
    if(equalAction) {
        return;
    }
    const result = eval();
    const topScreen = document.querySelector(".top-screen");
    topScreen.textContent = "";
    const botScreen = document.querySelector(".bot-screen");
    botScreen.textContent = result;
});

const dotBtn = document.getElementById("dot");
dotBtn.addEventListener("click", () => {
    const botScreen = document.querySelector(".bot-screen");
    for(let i = 0; i < botScreen.textContent.length; i++) {
        if(botScreen.textContent[i] === ".") {
            return;
        }
    }
    botScreen.textContent += dotBtn.textContent;
})
