import React from 'react';
import ReactDOM from 'react-dom';
import Greeting from './greeting';

console.log( 'IS This Executing' );
ReactDOM.render(
  <Greeting name="World"/>,
  document.getElementById('app')
);
