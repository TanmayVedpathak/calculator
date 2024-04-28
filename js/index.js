const calculator__expression = document.querySelector(
  ".calculator__expression"
);
const calculator__result = document.querySelector(".calculator__result");

const number__keys = document.querySelectorAll("[data-key-number]");
const operator__keys = document.querySelectorAll("[data-key-operator]");

const decimal__key = document.querySelector("[data-key-decimal]");
const clear__key = document.querySelector("[data-key-clear]");
const delete__key = document.querySelector("[data-key-delete]");
const result__key = document.querySelector("[data-key-result]");
const bracket__key = document.querySelector("[data-key-bracket]");
const calculator__input = document.querySelector(
  "[data-input='calculator__input']"
);
const calculator__input1 = document.getElementById("calculator__input");

const history__btn = document.querySelector(".history__btn");
const history = document.querySelector(".history");
const history__list = document.querySelector(".history__list");

const operators = ["+", "-", "*", "/", "%"];

const parenthesisArr = [];

var expression = "";

function arithmeticOperation(operator, variable1, variable2) {
  switch (operator) {
    case "+":
      return variable1 + variable2;
    case "-":
      return (variable1 - variable2) % 1 === 0
        ? variable1 - variable2
        : (variable1 - variable2).toFixed(2);
    case "*":
      return variable1 * variable2;
    case "/":
      return (variable1 / variable2) % 1 === 0
        ? variable1 / variable2
        : (variable1 / variable2).toFixed(2);
    case "%":
      return variable1 % variable2;
    default:
      return "Invalid";
  }
}

function clearFunction() {
  expression = "";
  calculator__result.children[0].innerHTML = "0";
  calculator__input.value = 0;
}

function backSpaceFunction() {
  expression = expression.substring(0, expression.length - 1);
  if (expression) {
    calculator__input.value = expression;
  } else {
    calculator__input.value = 0;
  }
}

function numberPress(number__key) {
  if (number__key !== ".") {
    expression += number__key;
    calculator__input.value = expression;
  } else {
    if (!operators.includes(expression[expression.length - 1])) {
      expression += number__key;
      calculator__input.value = expression;
    }
  }
}

function operatorPress(operator__key) {
  if (
    operators.includes(expression[expression.length - 1]) &&
    expression[expression.length - 1] !== operator__key
  ) {
    expression = expression.substring(0, expression.length - 1) + operator__key;

    calculator__input.value = expression;
  } else if (
    expression[expression.length - 1] !== operator__key &&
    expression[expression.length - 1] !== "."
  ) {
    expression += operator__key;
    calculator__input.value = expression;
  }
}

function validateExpression(exp) {
  const validate__parenthesis = [];
  if (operators.includes(exp[exp.length - 1])) {
    return false;
  } else if (exp !== "" && !/[0-9]/g.test(exp)) {
    return false;
  } else if (/[\(\)]/g.test(exp)) {
    for (let i = 0; i < exp.length; i++) {
      if (exp[i] === "(") {
        validate__parenthesis.push("(");
      } else if (exp[i] === ")" && validate__parenthesis.length !== 0) {
        validate__parenthesis.pop();
      } else if (exp[i] === ")" && validate__parenthesis.length === 0) {
        return false;
      }
    }

    if (validate__parenthesis.length === 0) {
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
}

function solveExp(miniExpression) {
  const operatorReg = /[+\-*\/%]/g;
  const containOperator = miniExpression.match(operatorReg) || [];

  let value = 0;
  if (miniExpression === "") {
    // calculator__result.children[0].innerText = 0;
    return 0;
  } else if (containOperator.length === 0) {
    // calculator__result.children[0].innerText = miniExpression;
    // value = numbers[0];
    return miniExpression;
  } else {
    let numbers = miniExpression.split(/[^0-9.]+/);

    numbers = numbers.filter((number) => number !== "");

    if (numbers.length === containOperator.length) {
      numbers[0] = containOperator.shift() + numbers[0];
    }

    numbers = numbers.map((number) => Number(number));

    // for multiplication
    if (containOperator.includes("*")) {
      for (let i = 0; i < containOperator.length; i++) {
        if (containOperator[i] === "*") {
          let variable1 = numbers[i];
          let variable2 = numbers[i + 1];
          let operator = containOperator[i];
          numbers.splice(
            i,
            2,
            arithmeticOperation(operator, variable1, variable2)
          );
          containOperator.splice(i, 1);
          i--;
        }
      }
    }

    // for division
    if (containOperator.includes("/")) {
      for (let i = 0; i < containOperator.length; i++) {
        if (containOperator[i] === "/") {
          let variable1 = numbers[i];
          let variable2 = numbers[i + 1];
          let operator = containOperator[i];

          numbers.splice(
            i,
            2,
            arithmeticOperation(operator, variable1, variable2)
          );
          containOperator.splice(i, 1);
          i--;
        }
      }
    }

    // for addition
    if (containOperator.includes("+")) {
      for (let i = 0; i < containOperator.length; i++) {
        if (containOperator[i] === "+") {
          let variable1 = numbers[i];
          let variable2 = numbers[i + 1];
          let operator = containOperator[i];
          numbers.splice(
            i,
            2,
            arithmeticOperation(operator, variable1, variable2)
          );
          containOperator.splice(i, 1);
          i--;
        }
      }
    }

    // for subtraction
    if (containOperator.includes("-")) {
      for (let i = 0; i < containOperator.length; i++) {
        if (containOperator[i] === "-") {
          let variable1 = numbers[i];
          let variable2 = numbers[i + 1];
          let operator = containOperator[i];
          numbers.splice(
            i,
            2,
            arithmeticOperation(operator, variable1, variable2)
          );
          containOperator.splice(i, 1);
          i--;
        }
      }
    }

    // for modulus
    if (containOperator.includes("%")) {
      for (let i = 0; i < containOperator.length; i++) {
        if (containOperator[i] === "%") {
          let variable1 = numbers[i];
          let variable2 = numbers[i + 1];
          let operator = containOperator[i];
          numbers.splice(
            i,
            2,
            arithmeticOperation(operator, variable1, variable2)
          );
          containOperator.splice(i, 1);
          i--;
        }
      }
    }

    value = numbers[0];
    return String(value);
  }
}

function evaluateExpression(exp) {
  let newExp = exp;
  if (!validateExpression(newExp)) {
    calculator__result.children[0].innerText = "Invalid";
  } else {
    let re = /([0-9.\)]\()|(\)[0-9.\)])/g;
    let match;
    let matches = [];

    while ((match = re.exec(newExp)) !== null) {
      matches.push(match);
    }
    matches.reverse();

    matches.forEach((ele) => {
      newExp =
        newExp.substring(0, ele.index + 1) +
        "*" +
        newExp.substring(ele.index + 1);
    });

    while (/[\(\)+\-*\/%]/g.test(newExp) && !/^-\d+$/.test(newExp)) {
      if (!/[+\-*/%]/g.test(newExp)) {
        newExp = newExp.replaceAll("(", "").replaceAll(")", "");
      } else if (/[\(\)]/g.test(newExp)) {
        let valid__para = [];
        for (let i = 0; i < newExp.length; i++) {
          if (newExp[i] === "(") {
            valid__para.push({ sign: newExp[i], index: i });
          } else if (newExp[i] === ")") {
            let minExp = newExp.substring(
              valid__para[valid__para.length - 1]["index"] + 1,
              i
            );
            let result = solveExp(minExp);

            newExp =
              newExp.substring(
                0,
                valid__para[valid__para.length - 1]["index"]
              ) +
              result +
              newExp.substring(i + 1);

            valid__para.pop();
            break;
          }
        }
        valid__para = [];
      } else {
        newExp = solveExp(newExp);
      }
    }

    result = newExp;
    calculator__result.children[0].innerText = result;
    history__list.innerHTML += `<li>${expression}</li>`;
    expression = String(result);

    calculator__input.value = expression;
  }
}

calculator__input.addEventListener("input", function (event) {
  const inputRegex = /[0-9.+\-\*\/\(\)%]/g;
  if (!inputRegex.test(event.target.value)) {
    event.target.value = event.target.value.slice(0, -1);
  }
  expression = event.target.value;
});

history__btn.addEventListener("click", function () {
  history.classList.toggle("history-active");
});

clear__key.addEventListener("click", clearFunction);

delete__key.addEventListener("click", backSpaceFunction);

number__keys.forEach(function (number__key) {
  number__key.addEventListener("click", function () {
    numberPress(number__key.innerText);
  });
});

operator__keys.forEach(function (operator__key) {
  operator__key.addEventListener("click", function () {
    operatorPress(operator__key.innerText);
  });
});

bracket__key.addEventListener("click", function () {
  if (parenthesisArr.length === 0) {
    parenthesisArr.push("(");
    expression += "(";

    calculator__input.value = expression;
  } else if (parenthesisArr[parenthesisArr.length - 1] === "(") {
    expression += ")";

    calculator__input.value = expression;
    parenthesisArr.pop();
  }
});

result__key.addEventListener("click", function () {
  evaluateExpression(expression);
});

function keydownEventListener(event) {
  let numberReg = /[0-9.]/;
  let operatorReg = /[+\-*\%\/]/;

  if (event.key === "Backspace") {
    backSpaceFunction();
  } else if (numberReg.test(event.key)) {
    numberPress(event.key);
  } else if (operatorReg.test(event.key)) {
    operatorPress(event.key);
  }
}

document.addEventListener("keydown", keydownEventListener);
document.addEventListener("keydown", function (event) {
  const key = document.querySelector(`[data-keys="${event.key}"]`);
  const bracket__key = document.querySelector(`[data-key-bracket="bracket"]`);

  if (key) {
    key.classList.add("calculator__key-active");

    setTimeout(function () {
      key.classList.remove("calculator__key-active");
    }, 250);
  }

  if (event.key === "(" || event.key === ")") {
    bracket__key.classList.add("calculator__key-active");

    setTimeout(function () {
      bracket__key.classList.remove("calculator__key-active");
    }, 250);
  }

  if (event.key === "c") {
    clearFunction();
  } else if (event.key === "Enter") {
    evaluateExpression(expression);
  }
});

calculator__input1.addEventListener("focus", function () {
  document.removeEventListener("keydown", keydownEventListener);
});

calculator__input1.addEventListener("blur", function () {
  document.addEventListener("keydown", keydownEventListener);
});

