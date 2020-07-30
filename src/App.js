import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'

import {SearchContextProvider} from './context/SearchContext'
import MainNav from './components/Nav/MainNav'
import Home from './pages/Home'

function App() {
  return (
    <SearchContextProvider>
      <Router>
        <MainNav />
        <Switch>
          <Route exact path="/"><Home /></Route>
        </Switch>
      </Router>
    </SearchContextProvider>
  );
}

export default App;
