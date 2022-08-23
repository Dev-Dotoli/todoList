import "./App.css";
import { useState } from "react";

function Header(props) {
  return (
    <header className="header">
      <h1>
        <a
          href="/"
          onClick={function (event) {
            event.preventDefault();
            props.onChangeMode();
          }}
        >
          {props.title}
        </a>{" "}
      </h1>
    </header>
  );
}

function Nav(props) {
  const lis = [];
  for (let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(
      <li key={t.id}>
        <a
          id={t.id}
          href={"/read/" + t.id}
          onClick={function (event) {
            event.preventDefault();
            props.onChangeMode(Number(event.target.id)); // (t.id) no p
          }}
        >
          {t.title}
        </a>
      </li>
    );
  }
  return (
    <nav className="nav">
      <ol className="ol">{lis}</ol>
    </nav>
  );
}

function Article(props) {
  return (
    <article className="article">
      <h2>{props.title}</h2>
      {props.body}
    </article>
  );
}

function Create(props) {
  return (
    <article className="article">
      <h2>Add</h2>
      <form
        onSubmit={function (event) {
          event.preventDefault();
          const title = event.target.title.value;
          const body = event.target.body.value;
          props.onCreate(title, body);
        }}
      >
        <p>
          <input type="text" name="title" placeholder="title" />
        </p>
        <p>
          <textarea
            className="textarea"
            name="body"
            placeholder="body"
          ></textarea>
        </p>
        <p>
          <input type="submit" value="Add"></input>
        </p>
      </form>
    </article>
  );
}

function Update(props) {
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);
  return (
    <article className="article">
      <h2>Update</h2>
      <form
        onSubmit={function (event) {
          event.preventDefault();
          const title = event.target.title.value;
          const body = event.target.body.value;
          props.onUpdate(title, body);
        }}
      >
        <p>
          <input
            type="text"
            name="title"
            placeholder="title"
            value={title}
            onChange={function (event) {
              setTitle(event.target.value);
            }}
          />
        </p>
        <p>
          <textarea
            className="textarea"
            name="body"
            placeholder="body"
            value={body}
            onChange={function (event) {
              setBody(event.target.value);
            }}
          ></textarea>
        </p>
        <p>
          <input type="submit" value="Update"></input>
        </p>
      </form>
    </article>
  );
}

function App() {
  const [mode, setMode] = useState("WELCOME");
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(8);
  const [topics, setTopics] = useState([
    { id: 1, title: "Todolist", body: "Todolist done" },
    { id: 2, title: "Workout byceps", body: "Work out byceps every day" },
    { id: 3, title: "Protein", body: "Eat protein at every meal" },
    { id: 4, title: "Workout triceps", body: "Work out triceps every day" },
    { id: 5, title: "Clean up", body: "Clean up every day..." },
    { id: 6, title: "Today I Learned", body: "Write TIL on my board" },
    { id: 7, title: "Sleep", body: "Sleep tight" },
  ]);

  let content = null;
  let contextControl = null;

  if (mode === "WELCOME") {
    content = (
      <Article title="Don't forget it" body="You should do these"></Article>
    );
  } else if (mode === "READ") {
    let title,
      body = null;
    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}></Article>;
    contextControl = (
      <>
        <li className="footlistbtn">
          <a
            href={"/update" + id}
            onClick={function (event) {
              event.preventDefault();
              setMode("UPDATE");
            }}
          >
            <button>Update</button>
          </a>
        </li>
        <li className="footlistbtn">
          <input
            type="button"
            value="Delete"
            onClick={function () {
              const newTopics = [];
              for (let i = 0; i < topics.length; i++) {
                if (topics[i].id !== id) {
                  newTopics.push(topics[i]);
                }
              }
              setTopics(newTopics);
              setMode("WELCOME");
            }}
          />
        </li>
      </>
    );
  } else if (mode === "CREATE") {
    content = (
      <Create
        onCreate={function (_title, _body) {
          const newTopic = { id: nextId, title: _title, body: _body };
          const newTopics = [...topics];
          newTopics.push(newTopic);
          setTopics(newTopics);
          setMode("READ");
          setId(nextId);
          setNextId(nextId + 1);
        }}
      ></Create>
    );
  } else if (mode === "UPDATE") {
    let title,
      body = null;
    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = (
      <Update
        title={title}
        body={body}
        onUpdate={function (title, body) {
          console.log(title, body);
          const newTopics = [...topics];
          const updatedTopic = { id: id, title: title, body: body };
          for (let i = 0; i < newTopics.length; i++) {
            if (newTopics[i].id === id) {
              newTopics[i] = updatedTopic;
              break;
            }
          }
          setTopics(newTopics);
          setMode("READ");
        }}
      ></Update>
    );
  }

  return (
    <div className="App">
      <Header
        title="Todolist"
        onChangeMode={function () {
          setMode("WELCOME");
        }}
      ></Header>
      <Nav
        topics={topics}
        onChangeMode={function (_id) {
          setMode("READ");
          setId(_id);
        }}
      ></Nav>
      {content}
      <ul className="ulfoot">
        <li className="footlistbtn">
          <a
            href="/create"
            onClick={function (event) {
              event.preventDefault();
              setMode("CREATE");
            }}
          >
            <button>Add</button>
          </a>
        </li>
        {contextControl}
      </ul>
    </div>
  );
}

export default App;
