import { useState, useContext, useEffect } from 'react';
import './App.css';

function App() {
  const [state, setState] = useState({
    players: null,
  })

  const getLeaderBoardData = () => {
    return fetch(`https://us-central1-airin-rec-sandbox.cloudfunctions.net/leaderboard/`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    }).then((res) => 
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  }

  const getProfilePicture = (uid) => {
    return fetch(`https://us-central1-airin-rec-sandbox.cloudfunctions.net/leaderboard/img/${uid}.png`, {
      method: 'GET',
      headers: {
        'content-type': 'image/png',
      }
    }).then((res) => 
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.url
    )
  }

  // Get page data
  const getPageData = async () => {
    const players = await getLeaderBoardData();

    const playerDetails = await Promise.all(players.map(async (el) => {
      const profile = await getProfilePicture(el.uid)
      return { ...el, url: profile}
    }))
    setState({ players: playerDetails })
  }

  useEffect(() => {
    getPageData()
  }, [])

  console.log(state.players);
  return (
    <div className="App">
      
    </div>
  );
}

export default App;
