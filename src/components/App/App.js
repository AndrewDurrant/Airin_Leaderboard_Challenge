import { useState, useEffect } from 'react';
import LeaderBoardApiService from '../../services/leader-board-api-service';
import Nav from '../Nav/Nav';
import Player from '../Player/Player';
import './App.css';

function App() {
  const [state, setState] = useState({
    players: [],
  })

  // Get page players data and profile picture
  const getPageData = async () => {
    const players = await LeaderBoardApiService.getLeaderBoardData();

    const playerDetails = await Promise.all(players.map(async (el) => {
      const profile = await LeaderBoardApiService.getProfilePicture(el.uid)
      console.log('SDFDDD', el);
      return { ...el, url: profile}
    }))
    setState({ players: playerDetails })
  }

  useEffect(() => {
    getPageData()
  }, [])

  console.log(state.players);
  return (
    <>
      <header>
        <h1>Airin Leaderboard</h1>
      </header>
      <Nav />
      <main>
        <section className="leaderboard-container">
          <ul className="player-list">
            {state.players.map((p) => (
              <li key={p.uid}>
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
