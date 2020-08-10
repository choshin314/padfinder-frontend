import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import styled from 'styled-components'

import {MapContextProvider} from './context/MapContext'
import MainNav from './components/nav/MainNav'
import Home from './pages/Home'
import MapView from './pages/MapView'
import PropertyView from './pages/PropertyView'
import Authentication from './pages/Authentication'

function App() {
  
  return (
    <MapContextProvider>
      <Router>
        <MainNav />
        <Main>
          <Switch>
            <Route exact path="/"><Home /></Route>
            <Route exact path="/authenticate"><Authentication /></Route>
            <Route exact path="/search/:searchquery"><MapView /></Route>  
          </Switch>
        </Main>
      </Router>  
    </MapContextProvider>
  );
}

export default App;

const Main = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 4rem;
`
