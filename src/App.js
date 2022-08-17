import React from "react";
import BucketList from "./BucketList";
import './style.css'


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: ["영화관 가기", "매일 책읽기", "수영 배우기"],
    };

    this.text = React.createRef();
  }

  componentDidMount() { 
  }

  addBucket = () => {
    console.log(this.text.current.value);
    const new_item = this.text.current.value;
    // ... => 스프레드 문법
    // [...this.state.list, 넣고 싶었던 어떤 값]
    this.setState({ list: [...this.state.list, new_item] });
  }

  render() {

    return (
      <div className="App">
      <div className="Container">
        <h1> TodoList </h1>
        <hr className="line" />
        <BucketList list={this.state.list} />
      </div>

      <div className="InputWrap">
        <input type="text" ref={this.text} />
        <button onClick={this.addBucket}>ADD</button>
      </div>
      </div>
    );
  }
}

export default App;
