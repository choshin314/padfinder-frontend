import React, {useContext} from 'react'
import styled from 'styled-components'

import Map from '../components/map/Map'
import PropertyCard from '../components/properties/PropertyCard'
import PropertyModal from '../components/properties/PropertyModal'
import {devices} from '../components/shared/styledLib'
import {MapContext} from '../context/MapContext'
import {PropertyContext} from '../context/PropertyContext'

const MapView = props => {
    const {nearbyProperties} = useContext(MapContext);
    const {modalOpen, toggleModal} = useContext(PropertyContext);

    return (
        <>
        <GridContainer>
            <MapDiv>
                <Map mainMap/>
            </MapDiv>
            <SidePanelContainer>
                <SidePanelTitle>Pads Nearby</SidePanelTitle>
                {nearbyProperties.length === 0 && (
                    <NoResultsMsg>
                        <h4>Sorry, we couldn't find any listings within 3 miles of your search.</h4>
                        <p>Try searching a different location!</p>
                    </NoResultsMsg>
                )}
                {nearbyProperties.length > 0 && (
                    <SidePanel>
                        {nearbyProperties.length > 0 && nearbyProperties.map(p => <PropertyCard key={p._id} property={p} toggleModal={toggleModal}/>)}
                    </SidePanel>
                )}
            </SidePanelContainer>
            
        </GridContainer>
        {modalOpen && <PropertyModal toggleModal={toggleModal}/>}
        </>
    )
}



const GridContainer = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr;
    padding-top: 4rem;
    position: absolute;
    bottom: 0;
    grid-row-gap: 5px;
    @media (min-width: ${devices.tablet}) {
        grid-template-columns: repeat(6, 1fr);
    }
`

const MapDiv = styled.div`
    position: relative;
    height: 100%;
    min-height: 50vh;
    @media (min-width: ${devices.tablet}) {
        grid-column: span 4;
    }
`

const SidePanelContainer = styled.div`
    grid-column: span 2;
    @media(min-width: ${devices.wide}) {
        padding: 1rem;
    }
`

const SidePanelTitle = styled.h1`
    text-align: center;
    color: var(--primary-color);
    
`

const SidePanel = styled.div`
    position: relative;
    height: 100%;
    min-height: 50vh;
    display: grid;
    align-content: start;
    grid-gap: 5px;
    grid-template-columns: 1fr;
    color: var(--primary-color);

    @media(min-width: ${devices.lgPhone}) {
        grid-template-columns: 1fr 1fr;
    }
    @media(min-width: ${devices.tablet}) {
        grid-template-columns: 1fr;
        overflow-y: auto;
    }
    @media(min-width: ${devices.laptop}) {
        grid-template-columns: 1fr 1fr;
    }
`

const NoResultsMsg = styled.div`
    padding: 1rem;

    text-align: center;
    & > h4 {
        color: var(--primary-color);
        font-weight: bold;
    }
`

export default MapView