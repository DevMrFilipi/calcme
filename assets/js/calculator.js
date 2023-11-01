const DOM = () => {
  const start = {
    start() {
      this.display.setAttribute("readonly", "readonly");
      this.display.value = "0";
      this.controllerOfCalculatorEvent();
    },
  };
  const controllerOfCalculatorEvent = {
    controllerOfCalculatorEvent() {
      let controll = 0;
      let operator;
      let firstProduct = 0;
      let secondProduct = 0;

      const container = document.querySelector(".container");
      container.addEventListener("click", (e) => {
        const el = e.target;
        if (el.classList.contains("btn-ac")) {
          this.clearInput();
          this.setStateButtonsRadio(false);
          firstProduct = 0;
          secondProduct = 0;
          controll = 0;
          operator = "";
          this.display.value = "0";
        }
        if (el.classList.contains("btn-de")) {
          this.deleteLastElInput();
          this.setStateButtonsRadio(false);
          if (this.display.value === "") {
            this.display.value = "0";
          }
        }
        if (el.classList.contains("btn-num")) {
          if (this.display.value === "0") {
            this.clearInput();
          }
          this.insertNum(el);
          this.setStateButtonsRadio(false);
        }
        if (el.classList.contains("btn-dot")) {
          this.insertDot(el);
          this.setStateButtonsRadio(false);
        }
        if (el.classList.contains("btn-symbol")) {
          this.insertSimbol(el);
          operator = el.value;
          controll++;
          if (controll >= 2) {
            this.deleteLastElInput();
            firstProduct = this.obtainFirstValueOperation();
            secondProduct = this.obtainSecondValueOperation();
            this.tryExecutableOperation(firstProduct, secondProduct, operator);
            this.setStateButtonsRadio(false);
            firstProduct = 0;
            secondProduct = 0;
            controll = 0;
            operator = "";
          }
        }
        if (el.classList.contains("btn-eq")) {
          firstProduct = this.obtainFirstValueOperation();
          secondProduct = this.obtainSecondValueOperation();
          this.tryExecutableOperation(firstProduct, secondProduct, operator);
          this.setStateButtonsRadio(false);
          firstProduct = 0;
          secondProduct = 0;
          controll = 0;
          operator = "";
        }
      });
    },
  };
  const tryExecutableOperation = {
    tryExecutableOperation(firstValue, secondValue, operator) {
      try {
        let result = String(
          this.operationMath(firstValue, secondValue, operator)
        );
        if (
          result === "NaN" ||
          result === "undefined" ||
          result === "Infinity"
        ) {
          throw Error("Valores indefinidos ou inválidos.");
        }
        this.display.value = result;
      } catch (err) {
        this.clearInput();
        this.display.value = "0";
      }
    },
  };
  const operationMath = {
    operationMath(firstValue = 0, secondValue = 0, operator) {
      if (typeof firstValue !== "number" || typeof secondValue !== "number") {
        throw Error("Valores indefinidos ou incorretos.");
      }
      if (firstValue === 0 && secondValue === 0) {
        throw Error("Valores indefinidos ou incorretos.");
      }
      switch (operator) {
        case "%":
          return firstValue % secondValue;
        case "/":
          return firstValue / secondValue;
        case "*":
          return firstValue * secondValue;
        case "-":
          return firstValue - secondValue;
        case "+":
          return firstValue + secondValue;
      }
    },
  };
  const obtainFirstValueOperation = {
    obtainFirstValueOperation() {
      let displayValue = this.display.value;
      for (let product in displayValue) {
        if (
          displayValue[product] === "%" ||
          displayValue[product] === "/" ||
          displayValue[product] === "*" ||
          displayValue[product] === "-" ||
          displayValue[product] === "+"
        ) {
          let relativePositionProduct = Number(product);
          let cleanProduct = displayValue.slice(0, relativePositionProduct);
          return Number(cleanProduct);
        }
      }
    },
  };
  const obtainSecondValueOperation = {
    obtainSecondValueOperation() {
      let displayValue = this.display.value;
      for (let product in displayValue) {
        if (
          displayValue[product] === "%" ||
          displayValue[product] === "/" ||
          displayValue[product] === "*" ||
          displayValue[product] === "-" ||
          displayValue[product] === "+"
        ) {
          let sizeProduct = displayValue.length;
          let relativePositionProduct = Number(product) + 1;
          let cleanProduct = displayValue.slice(
            relativePositionProduct,
            sizeProduct
          );
          return Number(cleanProduct);
        }
      }
    },
  };
  const setStateButtonsRadio = {
    setStateButtonsRadio(option) {
      const btnMod = document.querySelector("#radioMod");
      const btnDiv = document.querySelector("#radioDiv");
      const btnMulti = document.querySelector("#radioMulti");
      const btnSub = document.querySelector("#radioSub");
      const btnSum = document.querySelector("#radioSum");

      btnMod.checked = option;
      btnDiv.checked = option;
      btnMulti.checked = option;
      btnSub.checked = option;
      btnSum.checked = option;
      return;
    },
  };
  const clearInput = {
    clearInput() {
      this.display.value = "";
    },
  };
  const deleteLastElInput = {
    deleteLastElInput() {
      let displayValue = this.display.value;
      this.display.value = displayValue.slice(0, -1);
    },
  };
  const insertNum = {
    insertNum(el) {
      this.display.value += el.innerText;
    },
  };
  const insertSimbol = {
    insertSimbol(el) {
      this.display.value += el.value;
    },
  };
  const insertDot = {
    insertDot(el) {
      this.display.value += el.innerText;
    },
  };
  const isValidInput = {
    isValidInput(input) {
      if (
        typeof input === "undefined" ||
        input === "" ||
        typeof input !== "string"
      )
        return;
    },
  };
  const calcProto = Object.assign(
    {},
    start,
    clearInput,
    deleteLastElInput,
    insertNum,
    insertSimbol,
    insertDot,
    isValidInput,
    controllerOfCalculatorEvent,
    setStateButtonsRadio,
    obtainFirstValueOperation,
    obtainSecondValueOperation,
    operationMath,
    tryExecutableOperation
  );
  function createCalculator(display) {
    return Object.create(calcProto, {
      display: {
        enumerable: false,
        configurable: false,
        get: function () {
          return display;
        },
        set: function (inputDisplay) {
          this.isValidInput(display);
          display = inputDisplay;
        },
      },
    });
  }

  const display = document.querySelector(".display");
  const calculator = createCalculator(display);
  calculator.start();
};
DOM();
