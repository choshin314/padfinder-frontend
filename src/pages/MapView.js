import React, {useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import styled from 'styled-components'

import Map from '../components/map/Map'
import PropertyCard from '../components/properties/PropertyCard'
import PropertyModal from '../components/properties/PropertyModal'
import LoadingSpinner from '../components/shared/LoadingSpinner'
import {devices} from '../components/shared/styledLib'
import {MapContext} from '../context/MapContext'
import {PropertyContext} from '../context/PropertyContext'

const MapView = props => {
    const [loading, setLoading] = useState(false);
    const {nearbyProperties, dispatch} = useContext(MapContext);
    const {modalOpen, toggleModal} = useContext(PropertyContext);
    const {searchQuery} = useParams()

    useEffect(() => {
        setLoading(true);
        async function getProperties() {
            try {
                const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/properties/nearby?queryString=${searchQuery}`);
                if (response.status === 404) return dispatch({ type: "UPDATE_NEARBY", value: [] });
                const data = await response.json();
                if (response.status !== 200) throw new Error(data.message);
                dispatch({ type: "UPDATE_COORDS+ADDRESS", value: [data.coordinates, data.formatted_address] });
                dispatch({ type: 'UPDATE_NEARBY', value: data.nearbyProperties });
                setLoading(false);
            } catch(err) {
                console.log(err);
                setLoading(false);
            }
        }
        getProperties()
    }, [searchQuery])

    return (
        <>
        <GridContainer>
            <MapDiv>
                <Map mainMap/>
            </MapDiv>
            <SidePanelContainer>
                <SidePanelTitle>Rentals Nearby</SidePanelTitle>
                {loading && <LoadingWrapper><LoadingSpinner/></LoadingWrapper>}
                {!loading && nearbyProperties.length === 0 && (
                    <NoResultsMsg>
                        <h4>Sorry, we couldn't find any listings nearby.</h4>
                        <p>Try searching a different location!</p>
                    </NoResultsMsg>
                )}
                {!loading && nearbyProperties.length > 0 && (
                    <SidePanel>
                        {nearbyProperties.map(p => <PropertyCard key={p._id} property={p} />)}
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
    @media (min-width: ${devices.laptop}) {
        grid-column: span 3;
    }
`

const SidePanelContainer = styled.div`
    max-height: 100%;
    grid-column: span 2;
    position: relative;
    @media(min-width: ${devices.laptop}) {
        grid-column: span 3;
        overflow-y: auto;
    }
    @media(min-width: ${devices.wide}) {
        padding: 1rem;
    }
`

const SidePanelTitle = styled.h1`
    text-align: center;
`

const SidePanel = styled.div`
    min-height: 50vh;
    display: grid;
    align-content: start;
    grid-gap: 5px;
    grid-template-columns: 1fr;
    color: var(--primary-color);
    position: relative;
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
const LoadingWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`

export default MapView