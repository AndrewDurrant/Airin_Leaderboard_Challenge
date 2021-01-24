import React from 'react';
import './Player.css';

function Player({ player, position }) {
  
  return (
    <div key={player.uid} className="player-card">
      <span className="player-position">{position}</span>
      <img className="player-pic" src={player.url} alt="profile pic" />
      <div className="player-content">
        <h2 className="player-heading">{player.username}</h2>
        <div className="player-content-inner">
          <p className="player-metric">Score: {player.score}</p>
          <p className="player-metric">Playtime: {player.seconds_played}</p>
        </div>
        <div className="player-content-inner">
          <p className="player-metric">Wins: {player.games_won}</p>
          <p className="player-metric">Losses: {player.games_lost}</p>
        </div>
      </div>
    </div>
  );
}

export default Player;