import React from "react";
import styled from "styled-components";
import { Route, Switch } from "react-router-dom";
import {useDispatch} from "react-redux";
import { createBucket } from "./redux/modules/bucket";

import BucketList from "./BucketList";
import Detail from "./Detail";
import NotFound from "./NotFound";

function App() {

  const text = React.useRef(null);
  const dispatch = useDispatch();

  const addBucketList = () => {
    dispatch(createBucket(text.current.value));
  };

  return (
    <div className="App">
      <Container>
        <Title>내 버킷리스트</Title>
        <Line />
        <Switch>
          <Route exact path="/" component={BucketList} />
          <Route exact path="/detail/:index" component={Detail} />
          <Route component={NotFound} />
        </Switch>
      </Container>
      <Input>
        <input type="text" ref={text} />
        <button onClick={addBucketList}>추가하기</button>
      </Input>
    </div>
  );
}

const Input = styled.div`
  max-width: 350px;
  min-height: 10vh;
  background-color: #fff;
  padding: 16px;
  margin: 20px auto;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const Container = styled.div`
  max-width: 350px;
  min-height: 60vh;
  background-color: #fff;
  padding: 16px;
  margin: 20px auto;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const Title = styled.h1`
  color: slateblue;
  text-align: center;
`;

const Line = styled.hr`
  margin: 16px 0px;
  border: 1px dotted #ddd;
`;

export default App;


// import React from "react";
// import BucketList from "./BucketList";
// import './style.css'


// class App extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       list: ["영화관 가기", "매일 책읽기", "수영 배우기"],
//     };

//     this.text = React.createRef();
//   }

//   componentDidMount() { 
//   }

//   addBucket = () => {
//     console.log(this.text.current.value);
//     const new_item = this.text.current.value;
//     this.setState({ list: [...this.state.list, new_item] });
//   }

//   render() {

//     return (
//       <div className="App">
//         <div className="Container">
//           <h1> TodoList </h1>
//           <hr className="line" />
//           <BucketList list={this.state.list} />
//         </div>

//         <div className="InputWrap">
//           <input type="text" ref={this.text} />
//           <button onClick={this.addBucket}>ADD</button>
//         </div>
//       </div>
//     );
//   }
// }

// export default App;
