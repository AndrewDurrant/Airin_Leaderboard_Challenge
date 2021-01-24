import React from 'react';
import './Player.css';

function Player({ player }) {
  
  return (
    <div key={player.uid} className="player-card">
      <img src={player.url} alt="" />
      <h2>{player.username}</h2>
      <p>Score: {player.score}</p>
      <p>Playtime: {player.seconds_played}</p>
      <p>Wins: {player.games_won}</p>
      <p>Losses: {player.games_lost}</p>
    </div>
  );
}

export default Player;