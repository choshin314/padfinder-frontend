import React, {useState, useContext, useEffect, useRef, useCallback} from 'react'
import {GoogleMap, useLoadScript, Marker, InfoWindow} from '@react-google-maps/api'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import usePlacesAutocomplete, {getGeocode, getLatLng} from 'use-places-autocomplete'

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
    const {coordinates, setCoordinates, nearbyProperties, setNearbyProperties} = mapContext;
    const [selected, setSelected] = useState();

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_MAPS_KEY,
        libraries: libraries
    });

    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, []);

    //need to save coordinates to local storage or it'll blank out on reload bc context will reset on reload
    //only reset local storage w/ context coordinates if we actually have new coordinates
    //if we don't have new coordinates, we need to use our value saved in local storage to set state again after a reload
    useEffect(()=> {
        if (coordinates.lat && nearbyProperties) {
            localStorage.setItem('coordinates', JSON.stringify({coordinates: coordinates}));
            localStorage.setItem('nearbyProperties', JSON.stringify({nearbyProperties}));
        } else {
            let localCoordinates = JSON.parse(localStorage.getItem('coordinates'));
            setCoordinates(localCoordinates.coordinates);
            let localNearbyProperties = JSON.parse(localStorage.getItem('nearbyProperties'));
            setNearbyProperties(localNearbyProperties.nearbyProperties)
        }
    }, [coordinates, nearbyProperties])

    useEffect(() => {
        console.log(nearbyProperties);
    }, [nearbyProperties])

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
        >
            {props.mainMap && nearbyProperties.map(property => (
                <Marker 
                    key={property.id} 
                    position={property.coordinates}
                    icon={icon(property)}
                    onClick={() => setSelected(property)}
                />
            ))}
            {selected && (
                <InfoWindow 
                    position={selected.coordinates}
                    onCloseClick={() => setSelected(null)}
                >
                    <InfoCard>
                        <Link to={`/properties/${selected.id}`}>
                            <h2>{selected.address.split(',')[0]}</h2>
                            <ul>
                                <li>Rent: {selected.rent}</li>
                                <li>{selected.bedrooms}BR / {selected.bathrooms}BA</li>
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





