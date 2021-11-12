import "./styles.css";
import React, { useState } from "react";
import { CalcButton } from "./components/button.js";

export default function App() {
  const [display, setDisplay] = useState("0");
  const [operation, setOperation] = useState("");
  const [count, setCount] = useState();
  const [displayReset, setDisplayReset] = useState(false);
  const [float, setFloat] = useState(false);
  const numbersBtns = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];
  const operationsBtns = [
    ["+", "suma"],
    ["-", "resta"],
    ["x", "multiplicacion"],
    ["/", "division"],
    ["=", ""]
  ];

  if (display !== "0" && display.startsWith("0")) {
    setDisplay(display.substring(1));
  } else if (display.startsWith("-0")) {
    setDisplay(display.replace("-0", "-"));
  } else if (display.startsWith("--")) {
    setDisplay(display.replace("--", ""));
  }

  function operate(number, operation) {
    let result;
    switch (operation) {
      case "suma":
        result = count === undefined ? number : count + number;
        setCount(result);
        return result;

      case "resta":
        result = count === undefined ? number : count - number;
        setCount(result);
        return result;

      case "multiplicacion":
        result = count === undefined ? number : count * number;
        setCount(result);
        return result;

      case "division":
        result = count === undefined ? number : count / number;
        setCount(result);
        return result;

      default:
        setCount(number);
        return number;
    }
  }

  function percentage(number, operation, count) {
    switch (operation) {
      case "suma":
      case "resta":
        setDisplay(String((Number(number) / 100) * count));
        break;
      default:
        setDisplay(String(Number(number) / 100));
    }
  }

  function handleNumberButton(btn) {
    if (btn === "." && float) {
      return;
    }

    if (btn === ".") {
      setFloat(true);
    }

    if (displayReset) {
      setDisplay(btn);
    } else {
      setDisplay(display + btn);
    }
    setDisplayReset(false);
  }

  return (
    <div className="App">
      <div className="screen">{display}</div>
      <div className="container">
        <div className="option-buttons-grid">
          <CalcButton
            value="C"
            onClick={() => {
              setDisplay("0");
              setCount(0);
              setDisplayReset(false);
              setFloat(false);
            }}
          />
          <CalcButton
            value="+/-"
            onClick={() => {
              setDisplay("-" + display);
            }}
          />
          <CalcButton
            value="%"
            onClick={() => {
              percentage(display, operation, count);
            }}
          />
        </div>
        <div className="numbers-grid">
          {numbersBtns.map((number) => {
            return (
              <CalcButton
                value={number}
                onClick={() => {
                  handleNumberButton(number);
                }}
              />
            );
          })}
        </div>
        <div className="operators-grid">
          {operationsBtns.map((operacion) => {
            return (
              <CalcButton
                value={operacion[0]}
                onClick={() => {
                  const operationResult = operate(Number(display), operation);
                  setOperation(operacion[1]);
                  setDisplay(String(operationResult));
                  setDisplayReset(true);
                  setFloat(false);
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
