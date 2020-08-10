import React, {useState, useContext, useEffect, useRef, useCallback} from 'react'
import {GoogleMap, useLoadScript, Marker, InfoWindow} from '@react-google-maps/api'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

import {MapContext} from '../../context/MapContext'
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
            const response = await fetch(`http://localhost:5000/api/properties/nearby/${newCoords.lat}-${newCoords.lng}`);
            const nearbyProperties = await response.json();
            // mapContext.setNearbyProperties(nearbyProperties);
            dispatch({ type: "UPDATE_NEARBY", value: nearbyProperties })
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
            zoom={13}
            options={options}
            onLoad={onMapLoad}
            onDragEnd={saveNewCoords}
        >
            {props.mainMap && nearbyProperties.map(property => (
                <Marker 
                    key={property.id} 
                    position={property.address.coordinates}
                    icon={icon(property)}
                    onClick={() => setSelected(property)}
                />
            ))}
            {selected && (
                <InfoWindow 
                    position={selected.address.coordinates}
                    onCloseClick={() => setSelected(null)}
                >
                    <InfoCard>
                        <Link to={`/properties/${selected.id}`}>
                            <h2>{selected.address.street}</h2>
                            <ul>
                                { 
                                    !selected.details.rent[1] ? 
                                    <>
                                    <li>${selected.details.rent}/MO</li>
                                    <li>{selected.details.beds}BR / {selected.details.baths}BA</li>
                                    </> :
                                    <>
                                    <li>${selected.details.rent[0]}-${selected.details.rent[1]}/MO</li>
                                    <li>{selected.details.beds[0]}-{selected.details.beds[1]}BR / {selected.details.baths[0]}-{selected.details.baths[1]}BA</li>
                                    </> 
                                }
                            </ul>
                        </Link>
                    </InfoCard>
                </InfoWindow>
            )}
        </GoogleMap>
        </>
    )
}

const InfoCard = styled.div`
    max-width: 100px;
    & a {
        text-decoration: none;
    }
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

const SearchDiv = styled.div`
    position: absolute;
    top: 2rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 5;
    width: 350px;
`

export default Map





