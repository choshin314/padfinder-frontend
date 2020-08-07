import React, {useState} from 'react'
import {Switch, Route} from 'react-router-dom'
import styled from 'styled-components'

import Map from '../components/map/Map'
import PropertyCard from '../components/properties/PropertyCard'
import PropertyModal from '../components/properties/PropertyModal'

import {dummyProperties} from '../components/dummyProperties'

const MapView = props => {
    const [modalOpen, setModalOpen] = useState(false);
    const toggleModal = () => setModalOpen(!modalOpen);

    return (
        <>
        <GridContainer>
            <MapDiv>
                <Map mainMap/>
            </MapDiv>
            <SidePanel>
                {dummyProperties.map(p => <PropertyCard property={p} toggleModal={toggleModal}/>)}
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
    position: absolute;
    bottom: 0;
    top: 4rem;
    grid-row-gap: 5px;
    @media (min-width: 980px) {
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

    @media(min-width: 620px) {
        grid-template-columns: 1fr 1fr;
    }
    @media(min-width: 980px) {
        grid-template-columns: 1fr;
    }
    @media(min-width: 1244px) {
        grid-template-columns: 1fr 1fr;
    }
`

export default MapView