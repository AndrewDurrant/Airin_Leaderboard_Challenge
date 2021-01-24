import { useState, useEffect } from 'react';
import LeaderBoardApiService from '../../services/leader-board-api-service';
import Player from '../Player/Player';
import './App.css';

function App() {
  const [state, setState] = useState({
    players: [],
    view: 'score', // options: score, games_won, seconds_played (stretch goal)
  })
  
  // Sorts players for high score (could be used for other metrics as well)
  const handleSort = (players) => {
    return players.sort((a,b) => {
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


  return (
    <>
      <header className="lb-header">
        <h1>airin.ai ~ leaderboard</h1>
      </header>
      <main>
        <section className="player-list">
          {state.players.map((p, i) => (
            <Player key={p.uid} player={p} position={i + 1}/>
          ))}
        </section>
      </main>
    </>
  );
}

export default App;
