import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import styled from 'styled-components'

import {AuthContextProvider} from './context/AuthContext'
import {MapContextProvider} from './context/MapContext'
import {PropertyModalContextProvider} from './context/PropertyModalContext'
import MainNav from './components/nav/MainNav'
import Home from './pages/Home'
import MapView from './pages/MapView'
import NewListing from './pages/NewListing'
import ManageListings from './pages/ManageListings'
import Authentication from './pages/Authentication'

function App() {
  
  return (
    <AuthContextProvider>
    <MapContextProvider>
    <PropertyModalContextProvider>
      <Router>
        <MainNav />
        <Main>
          <Switch>
            <Route exact path="/"><Home /></Route>
            <Route exact path="/authenticate"><Authentication /></Route>
            <Route exact path="/search/:searchquery"><MapView /></Route>  
            <Route exact path="/listings/new"><NewListing /></Route>
            <Route exact path="/listings"><ManageListings /></Route>
          </Switch>
        </Main>
      </Router>  
    </PropertyModalContextProvider>
    </MapContextProvider>
    </AuthContextProvider>
  );
}

export default App;

const Main = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 4rem;
`
