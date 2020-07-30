import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'

import MainNav from './components/Nav/MainNav'

function App() {
  return (
    <Router>
      <MainNav />
    </Router>
  );
}

export default App;
