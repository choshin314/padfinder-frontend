import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import styled from 'styled-components'

import ScrollToTop from './components/shared/ScrollToTop'
import {AuthContextProvider} from './context/AuthContext'
import {MapContextProvider} from './context/MapContext'
import {PropertyContextProvider} from './context/PropertyContext'
import MainNav from './components/nav/MainNav'
import Footer from './components/nav/Footer'
import Home from './pages/Home'
import MapView from './pages/MapView'
import NewListing from './pages/NewListing'
import ManageListings from './pages/ManageListings'
import ManageFavs from './pages/ManageFavs'
import UpdateListing from './pages/UpdateListing'
import Authentication from './pages/Authentication'

function App() {
  return (
    <AuthContextProvider>
    <MapContextProvider>
    <PropertyContextProvider>
      <Router>
        <ScrollToTop />
        <PageWrapper>
          <MainNav />
          <Main>
            <Switch>
                <Route exact path="/"><Home /><Footer /></Route>
                <Route exact path="/authenticate"><Authentication /><Footer /></Route>
                <Route exact path="/listings/edit/:propertyId"><UpdateListing /><Footer /></Route>
                <Route exact path="/listings/new"><NewListing /><Footer /></Route>
                <Route exact path="/listings"><ManageListings /><Footer /></Route>
                <Route exact path="/favorites"><ManageFavs /><Footer /></Route>
            </Switch>
            <Route exact path="/search/:searchQuery"><MapView /></Route>  
          </Main>
        </PageWrapper>
      </Router>  
    </PropertyContextProvider>
    </MapContextProvider>
    </AuthContextProvider>
  );
}

export default App;

const Main = styled.main`
  flex: 1;
  width: 100%;
  height: 100%;
  padding-top: 4rem;
  display: flex;
  flex-flow: column;
`

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-flow: column;
`
