import React from 'react';
import './Player.css';

function Player({ player }) {
  console.log('in player component', player);
  return (
    <div key={player.uid} className="player-card">
      <h2>{player.username}</h2>
      <p>Score: {player.score}</p>
      <p>Wins: {player.games_won}</p>
      <p>Losses: {player.games_lost}</p>
      <p>Seconds Played: {player.seconds_played}</p>
    </div>
  );
}

export default Player;