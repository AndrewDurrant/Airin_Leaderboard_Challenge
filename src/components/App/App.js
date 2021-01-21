import { useState, useContext, useEffect } from 'react';
import './App.css';

function App() {
  const [state, setState] = useState({
    data: null,
  })

  function fetchData() {
    return fetch(`https://us-central1-airin-rec-sandbox.cloudfunctions.net/leaderboard/`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    }).then((res) => 
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  }

  useEffect(() => {
    fetchData().then((data) => console.log(data))
  }, [])

  return (
    <div className="App">
      
    </div>
  );
}

export default App;
