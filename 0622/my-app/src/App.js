import "./index.css";
import { useState } from "react";
function Left1(props) {
  return (
    <div>
      <h1>Left1</h1>
      <Left2
        onUp={() => {
          props.onUp();
        }}
      ></Left2>
    </div>
  );
}
function Left2(props) {
  return (
    <div>
      <h1>Left1</h1>
      <Left3
        onUp={() => {
          props.onUp();
        }}
      ></Left3>
    </div>
  );
}
function Left3(props) {
  return (
    <div>
      <h1>Left3</h1>
      <button
        onClick={() => {
          props.onUp();
        }}
      >
        +
      </button>
    </div>
  );
}
function Right1(props) {
  return (
    <div>
      <h1>Right1</h1>
      <Right2 count={props.count}></Right2>
    </div>
  );
}
function Right2(props) {
  return (
    <div>
      <h1>Right2</h1>
      <Right3 count={props.count}></Right3>
    </div>
  );
}
function Right3(props) {
  return (
    <div>
      <h1>Right3</h1>
      {props.count}
    </div>
  );
}
export default function App() {
  const [count, setCount] = useState(0);
  return (
    <div id="app">
      <h1>Root</h1>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        <Left1
          onUp={() => {
            setCount((_count) => _count + 1);
          }}
        ></Left1>
        <Right1 count={count}></Right1>
      </div>
    </div>
  );
}
