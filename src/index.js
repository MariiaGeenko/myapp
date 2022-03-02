import React from "react";
import ReactDOM from "react-dom";
// import { App } from "./App";

import "./index.css";

const age = 12;
const obj = { name: "test" };
const arr2 = [1, 2, 3];
const films = [
  { title: "film 1", age: 2020 },
  { title: "film 2", age: 2021 },
];

const ComponentWitoutJSX = () => {
  return React.createElement(
    "div",
    {},
    React.createElement("h1", {}, `age: ${age}`)
  );
};

const Message = ({ title }) => {
  return (
    <div>
      <h1>Hello from {title}</h1>
      <h2>age: {age}</h2>
      <h2>name: {obj.name}</h2>
      {arr2}
    </div>
  );
};

const Films = () => {
  return (
    <div>
      <h2>Films:</h2>
      {films.map((film) => (
        <div>
          <h2>{film.title}</h2>
          <h2>{film.age}</h2>
        </div>
      ))}
    </div>
  );
};

const FunctionComponent = ({ onClick }) => {
  return (
    <div>
      <Message title="FunctionComponent" />
      <Films />
      <button onClick={() => onClick("FunctionComponent")}>click</button>
    </div>
  );
};

class ClassComponent extends React.Component {
  render() {
    console.log("class props", this.props);

    const { onClick } = this.props;

    return (
      <div>
        <Message title="ClassComponent" />
        <Films />
        <button onClick={() => onClick("ClassComponent")}>click</button>
      </div>
    );
  }
}

// const obj = { name: "test" };

// const ReactElement = (
//   <div>
//     <h1>Hello World</h1>
//     <h2>age: {age}</h2>
//   </div>
// );

// const FunctionComponent = () => {
//   return ReactElement;
// };

ReactDOM.render(
  <React.StrictMode>
    <ComponentWitoutJSX />
    <hr />
    <FunctionComponent
      test={{ age: 12 }}
      onClick={(target) => {
        console.log("click from:", target);
      }}
    />
    <hr />
    <ClassComponent
      test={{ age: 12 }}
      test2={[]}
      test3={false}
      test4={null}
      onClick={(target) => {
        console.log("click from:", target);
      }}
    />
  </React.StrictMode>,
  document.getElementById("root")
);

// bpvtybkb
