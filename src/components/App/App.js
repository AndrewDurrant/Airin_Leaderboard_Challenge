import { useState, useEffect } from 'react';
import useSort from '../../hooks/useSort';
import LeaderBoardApiService from '../../services/leader-board-api-service';
import Player from '../Player/Player';
import Loading from '../Loading/Loading';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import './App.css';

function App() {
  const [state, setState] = useState({
    players: [],
    view: 'score',
    error: null,
    isLoading: false,
  })
  
  // Sorts players for high score (could be used for other metrics as well)
  const handleSort = (players) => {
    return players.sort((a,b) => {
      return b[state.view] - a[state.view]
    })
  }

  // Get page players data and profile picture
  const getPageData = async () => {
    setState({ ...state, isLoading: true, error: null })
    try {
      const players = await LeaderBoardApiService.getLeaderBoardData();
      const playerDetails = await Promise.all(players.map(async (el) => {
        const profile = await LeaderBoardApiService.getProfilePicture(el.uid)
        return { ...el, url: profile}
      }))
      setState({ ...state, players: handleSort(playerDetails), isLoading: false })
    } catch (error) {
      setState({ ...state, error: error, isLoading: false })
    }
  }

  useEffect(() => {
    getPageData()
  }, [])

  useSort(state.players, state.view);


  return (
    <>
      <header className="lb-header">
        <h1>airin.ai ~ leaderboard</h1>
      </header>
      <main>
        <section className="player-list">
          {state.isLoading && <Loading />}
          {state.error && <ErrorMessage />}
          {state.players.map((p, i) => (
            <Player key={p.uid} player={p} position={i + 1}/>
          ))}
        </section>
      </main>
    </>
  );
}

export default App;
