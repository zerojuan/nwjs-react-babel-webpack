import promise from 'es6-promise';
promise.polyfill();

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';


import App from './app.jsx';
import HomePage from './pages/home.jsx';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();
render( (
    <Router>
      <Route component={App} path='/' name='Container'>
        <IndexRoute component={HomePage} name='Home'/>
      </Route>
    </Router>
), document.getElementById( 'app' ) );
