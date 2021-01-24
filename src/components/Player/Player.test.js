import React from 'react';
import ReactDOM from 'react-dom';
import Player from './Player';


describe('<Player />', () => {
  const player = {
    uid: 123,
    url: 'http://donovaneatstacos.com',
    username: 'Donovan',
    score: 23456,
    seconds_played: 1000,
    games_won: 23,
    games_lost: 11,
  }
  const index = 1;
  
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
    <Player key={player.uid} player={player} position={index}/>
    , div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
