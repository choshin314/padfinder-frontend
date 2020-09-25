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
          <Switch>
              <Route exact path="/">
                <Main>
                  <Home />
                </Main>
                <Footer />
              </Route>
              <Route exact path="/authenticate">
                <Main>
                  <Authentication />
                </Main>
                <Footer />
              </Route>
              <Route exact path="/listings/edit/:propertyId">
                <Main>
                  <UpdateListing />
                </Main>
                <Footer />
              </Route>
              <Route exact path="/listings/new">
                <Main>
                  <NewListing />
                </Main>
                <Footer />
              </Route>
              <Route exact path="/listings">
                <Main>
                  <ManageListings />
                </Main>
                <Footer />
              </Route>
              <Route exact path="/favorites">
                <Main>
                  <ManageFavs />
                </Main>
                <Footer />
              </Route>
          </Switch>
          <Route exact path="/search/:searchQuery"><MapView /></Route>  
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
