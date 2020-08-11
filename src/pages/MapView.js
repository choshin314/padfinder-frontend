import React, {useState, useContext} from 'react'
import styled from 'styled-components'

import Map from '../components/map/Map'
import PropertyCard from '../components/properties/PropertyCard'
import PropertyModal from '../components/properties/PropertyModal'
import {devices} from '../components/styledLib'

import {MapContext} from '../context/MapContext'

const MapView = props => {
    const mapContext = useContext(MapContext);
    const {nearbyProperties, modalOpen, toggleModal} = mapContext;

    return (
        <>
        <GridContainer>
            <MapDiv>
                <Map mainMap/>
            </MapDiv>
            <SidePanel>
                {nearbyProperties.map(p => <PropertyCard property={p} toggleModal={toggleModal}/>)}
            </SidePanel>
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
    grid-column: span 4;
    position: relative;
    height: 100%;
    min-height: 50vh;
`

const SidePanel = styled.div`
    grid-column: span 2;
    position: relative;
    height: 100%;
    min-height: 50vh;
    display: grid;
    align-content: start;
    grid-gap: 5px;
    grid-template-columns: 1fr;

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

export default MapView