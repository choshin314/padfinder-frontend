import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'

import {MapContextProvider} from './context/MapContext'
import MainNav from './components/Nav/MainNav'
import Home from './pages/Home'
import MapViewer from './pages/MapViewer'

function App() {
  return (
    <MapContextProvider>
      <Router>
        <MainNav />
        <Switch>
          <Route exact path="/"><Home /></Route>
          <Route exact path="/search/:searchquery"><MapViewer /></Route>
        </Switch>
      </Router>
    </MapContextProvider>
  );
}

export default App;
