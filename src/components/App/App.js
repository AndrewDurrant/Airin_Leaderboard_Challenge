import { useState, useEffect } from 'react';
import LeaderBoardApiService from '../../services/leader-board-api-service';
import Player from '../Player/Player';
import './App.css';

function App() {
  const [state, setState] = useState({
    players: [],
    view: 'score', // options: score, games_won, seconds_played
  })
  
  const handleSort = (players) => {
    return players.sort((a,b) => {
      console.log(a[state.view], typeof a[state.view]);
      return b[state.view] - a[state.view]
    })
  }

  // Get page players data and profile picture
  const getPageData = async () => {
    const players = await LeaderBoardApiService.getLeaderBoardData();

    const playerDetails = await Promise.all(players.map(async (el) => {
      const profile = await LeaderBoardApiService.getProfilePicture(el.uid)
      return { ...el, url: profile}
    }))
    setState({ players: handleSort(playerDetails) })
  }

  useEffect(() => {
    getPageData()
  }, [])

  // usePlayerSort(state.players, state.view);

  // TODO: See if you can refactor the below code block into usePlayerSort


  return (
    <>
      <header className="lb-header">
        <h1>airin.ai leaderboard</h1>
      </header>
      <main>
        <section className="lb-container">
          <ul className="player-list">
            {state.players.map((p) => (
              <li key={p.uid} className="player-wrapper">
                <Player player={p} />
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}

export default App;
