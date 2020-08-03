import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'

import {MapContextProvider} from './context/MapContext'
import MainNav from './components/nav/MainNav'
import Home from './pages/Home'
import MapView from './pages/MapView'
import PropertyView from './pages/PropertyView'

function App() {
  return (
    <MapContextProvider>
      <Router>
        <MainNav />
        <Switch>
          <Route exact path="/"><Home /></Route>
          <Route exact path="/search/:searchquery"><MapView /></Route>
          <Route exact path="/properties/:propertyid"><PropertyView /></Route>
        </Switch>
      </Router>
    </MapContextProvider>
  );
}

export default App;
