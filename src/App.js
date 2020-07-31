import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'

import {MapContextProvider} from './context/MapContext'
import MainNav from './components/Nav/MainNav'
import Home from './pages/Home'

function App() {
  return (
    <MapContextProvider>
      <Router>
        <MainNav />
        <Switch>
          <Route exact path="/"><Home /></Route>
        </Switch>
      </Router>
    </MapContextProvider>
  );
}

export default App;
