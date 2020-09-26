import React, {useState, useContext, useRef, useCallback} from 'react'
import {GoogleMap, useLoadScript, Marker, InfoWindow} from '@react-google-maps/api'
import styled from 'styled-components'

import {MapContext} from '../../context/MapContext'
import {PropertyContext} from '../../context/PropertyContext'
import SearchInput from './SearchInput'
import house from '../../assets/home-solid.svg'
import aptBldg from '../../assets/building-solid.svg'


//map properties (styles, libraries, options, icons, etc)
const containerStyle = {
    width: '100%',
    height: '100%'
}
const libraries = ["places"];
const options = {
    disableDefaultUI: true,
    zoomControl: true,
    streetViewControl: true,
    fullscreenControl: true
}

let icon = (property) => {
    return (property.type === 'apartment' ? {
        url: aptBldg,
        scaledSize: new window.google.maps.Size(30,30),
        fillColor: 'red'
    } : {
        url: house,
        scaledSize: new window.google.maps.Size(30,30),
        fillColor: 'red'
    })
}

//the actual map

const Map = props => {
    const mapContext = useContext(MapContext);
    const { coordinates, nearbyProperties, dispatch } = mapContext;
    const { toggleModal, setExpandedProperty } = useContext(PropertyContext);
    const [selected, setSelected] = useState();

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_MAPS_KEY,
        libraries: libraries
    });

    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, []);


    //set up handler to update map center coordinates and update nearby properties array whenever user drags the map.
    const saveNewCoords = async () => {
        let newCoords = mapRef.current.getCenter();
        newCoords = { lat: newCoords.lat(), lng: newCoords.lng()}
        dispatch({type: "UPDATE_COORDS", value: newCoords});
        try {
            const response = await fetch(`http://localhost:5000/api/properties/nearby?lat=${newCoords.lat}&lng=${newCoords.lng}`);
            if (response.status === 404) return dispatch({ type: "UPDATE_NEARBY", value: [] });
            const data = await response.json();
            dispatch({ type: "UPDATE_NEARBY", value: data.nearbyProperties });
        } catch(err) {
            console.log(err, 'Failed to fetch nearby properties');
        }
    }

    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading Maps";

    return (
        <>
        <SearchDiv>
            <SearchInput mini />
        </SearchDiv>
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={coordinates}
            zoom={15}
            options={options}
            onLoad={onMapLoad}
            onDragEnd={saveNewCoords}
        >
            {nearbyProperties.length > 0 && nearbyProperties.map(property => (
                <Marker 
                    key={property._id} 
                    position={{
                        lat: property.location.coordinates[1], 
                        lng: property.location.coordinates[0]
                    }}
                    icon={icon(property)}
                    onClick={() => setSelected(property)}
                >
                    {selected && selected._id === property._id && (
                        <InfoWindow 
                            position={selected.address.coordinates}
                            onCloseClick={() => setSelected(null)}
                        >
                            <InfoCard>
                                <h2>{selected.address.street}</h2>
                                <ul>
                                    { 
                                        selected.details.rent[1] === selected.details.rent[0] ? 
                                        <>
                                        <li>${selected.details.rent[0]}/MO</li>
                                        <li>{selected.details.beds[0]}BR / {selected.details.baths[0]}BA</li>
                                        </> :
                                        <>
                                        <li>${selected.details.rent[0]}-${selected.details.rent[1]}/MO</li>
                                        <li>{selected.details.beds[0]}-{selected.details.beds[1]}BR / {selected.details.baths[0]}-{selected.details.baths[1]}BA</li>
                                        </> 
                                    }
                                    <SeeMore onClick={()=> {
                                        toggleModal();
                                        setExpandedProperty(selected);
                                    }}>
                                        See details
                                    </SeeMore>
                                </ul>
                            </InfoCard>
                        </InfoWindow>
                    )}
                </Marker>
            ))}
        </GoogleMap>
        </>
    )
}

const InfoCard = styled.div`
    max-width: 100px;
    & h2 {
        font-size: .7rem;
        font-weight: bold;
    }
    & ul {
        font-size: .7rem;
        list-style: none;
        padding-left: 0;
    }
`
const SeeMore = styled.li`
    cursor: pointer;
    color: blue;
    font-weight: bold;
`

const SearchDiv = styled.div`
    position: absolute;
    top: 2rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 5;
    width: 350px;
`

export default Map





