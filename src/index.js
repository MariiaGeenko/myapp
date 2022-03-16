import React, { useEffect, useState, useLayoutEffect, useCallback, useMemo, useRef } from "react";
import ReactDOM from "react-dom";

import "./index.css";

const FunctionComponent = ({ onClick }) => {
  const [count, setCount] = useState(0);
  const [films, setFilms] = useState(["film 1"]);
  const [messages, setMessages] = useState(["message 1"]);

  const cb = useCallback(() => {
    console.log('click')
  }, [])

  const result = useMemo(() => {
    return 1 + 1
  }, [])

  // const result = 1 + 1

  
  useEffect(() => {
    const TEXT = "hello from bot";
    const lastMessages = messages[messages.length - 1];
    let timerId = null

    if (lastMessages !== TEXT) {
      timerId = setTimeout(() => {
        setMessages([...messages, TEXT]);
      }, 1000)
    }   
    return () => {
      clearInterval(timerId)
    } 
  }, [messages]);

  useEffect(() => {
    const listener = () => {
      console.log("click");
    };
    document.addEventListener("click", listener);

    return () => {
      console.log("componentWillUnmount");
      document.removeEventListener("click", listener);
    };
  }, []);

  useEffect(() => {
    const listener = () => {
      console.log('click')
    }
    document.addEventListener('click', listener)

    return () => {
      console.log('componentWillUnmount')
      document.removeEventListener("click", listener); 
    }
  }, [])

  useLayoutEffect(() => {
    console.log('useLayoutEffect')
  }, [])

  const increment = () => {
    setCount((c) => c + 1);
  };

  const addFilms = () => {
    setFilms([...films, "new film"]);
  };

  const removeFilms = (name) => {
    setFilms(films.filter((film) => film !== name));
  };

  const sendMessage = (message) => {
    setMessages([...messages, message]);
  };

  return (
    <div>
      <h1>FunctionComponent</h1>
      <h2>count {count}</h2>
      <button onClick={() => sendMessage("test")}>sendMessage</button>
      <h2>{messages.map(m => <h1> {m} </h1>)}</h2>
      <button onClick={increment}>increment</button>
      
      

      {/* <button onClick={() => onClick("FunctionComponent")}>click</button> */}
    </div>
  );  
};


class ClassComponent extends React.Component {
  constructor(props) {
    console.log("constructor");
    super(props);

    this.state = {
      count: 0,
      firstName: "firstName",
      lastName: "lastName",
      films: ["film 1", "film 2"],
      tree: {
        prev: "tree prev",
        child: {
          current: null,
          prev: "child prev",
        },
        parent: null,
      },
    };
    // this.increment = this.increment.bind(this);
  }

  listener = () => {
    console.log("click")
  };

  static getDerivedStateFromProps(props, state) {
    console.log("getDerivedStateFromProps");
    // return null;
    return {
      ...state,
      next: "some next",
    };
  }

  componentDidMount() {
    console.log("componentDidMount");

    document.addEventListener("click", this.listener);
  }

  // this.increment();


shouldComponentUpdate(nextProps, nextState) {
  console.log("shouldComponentUpdate")
    if (nextState.count > 10) {
   //return false;
    return true
  };
  return true
}

getSnapshotBeforeUpdate(prevProps, prevState)
{
  console.log("getSnapshotBeforeUpdate");
  // return null
  return {
    scroll: 10,
  };
}

componentDidUpdate(prevProps, prevState, snapshot)
{
  console.log("componentDidUpdate", snapshot);
  if (this.state.count === 1) {
    this.increment();
  }
}

componentWillUnmount() {
  console.log("componentWillUnmount")
  document.removeEventListener("click", this.listener)
}

increment = () => {
  this.setState((state) => ({
    count: state.count + 1,
    // firstName: `firstName ${this.state.count}`,
    // lastName: `lastName ${this.state.count}`,
  }));
  // this.setState(() => ({}))
  // this.setState(() => ({}), () => {})
};

decrement = () => {
  this.setState({
    count: this.state.count - 1,
  });
};

addFilm = () => {
  this.setState({
    films: [...this.state.films, new Date().toLocaleString()],
  });
};
removeFilm = (name) => {
  this.setState({
    films: this.state.films.filter((film) => film !== name),
  });
};

updateCurrent = () => {
  const { tree } = this.state;

  this.setState({
    tree: { ...tree, child: { ...tree.child, current: "new child current" } },
  });
};
updateParent = () => {
  const { tree } = this.state;

  this.setState({
    tree: { ...tree, parent: "new parent" },
  });
};

render(){
  // console.log("class props", this.props);
  const { onClick } = this.props;
  const { count, lastName, firstName, films, tree } = this.state;
  console.log("render", this.state);
  return (
    <div>
      <h1>ClassComponent</h1>
      <h2>count {count}</h2>
      <h2>firstName {firstName}</h2>
      <h2>lastName {lastName}</h2>
      <button onClick={this.increment}>increment</button>
      <button onClick={this.decrement}>decrement</button>

      <hr />

      <button onClick={this.addFilm}>add</button>
      {films.map((film) => (
        <div>
          <h3>{film}</h3>
          <button onClick={() => this.removeFilm(film)}>x</button>
        </div>
      ))}

      <hr />
      <h2>tree</h2>
      <h2>{JSON.stringify(tree)}</h2>
      <button onClick={this.updateCurrent}>updateCurrent</button>
      <button onClick={this.updateParent}>updateParent</button>
    </div>
  );
}
}

const App = () => {
  const [visible, setVisible] = useState(true);

  return (
    <>
      <button onClick={() => setVisible(!visible)}>setVisible</button>
      <FunctionComponent />
      {visible && <ClassComponent />}
      {visible && <FunctionComponent />}
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

