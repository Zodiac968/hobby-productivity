import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/check")
      .then((res) => {
        return res.json();
      })
      .then((data) => setMessage(data.status))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <h2>{message}</h2>
    </>
  );
}

export default App;
