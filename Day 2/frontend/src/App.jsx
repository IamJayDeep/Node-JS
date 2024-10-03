import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [jokes, setJokes] = useState([]);

  useEffect(() => {
    axios
      .get("/api/jokes")
      .then((response) => {
        setJokes(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(`Axios Error: ${error}`));
  }, []);

  return (
    <>
      <div>
        <h1>Practice</h1>
        <p>Jokes: {jokes.length}</p>
        {jokes.map((joke) => (
          <div key={joke.id}>
            <p>{joke.title}</p>
            <p>{joke.content}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
