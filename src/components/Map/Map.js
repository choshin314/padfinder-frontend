import React, {useState, useContext, useEffect, useRef, useCallback} from 'react'
import {GoogleMap, useLoadScript, Marker, InfoWindow} from '@react-google-maps/api'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import usePlacesAutocomplete, {getGeocode, getLatLng} from 'use-places-autocomplete'

import {MapContext} from '../../context/MapContext'
import SearchInput from '../SearchInput'
import house from '../../assets/home-solid.svg'
import aptBldg from '../../assets/building-solid.svg'

const dummyProperties = [
    {
        address: '1557 Sanford Ave, St. Louis, MO',
        coordinates: {
            lat: 38.6224608,
            lng: -90.298468
        },
        type: 'house',
        id: 'p1',
        image: 'https://specials-images.forbesimg.com/imageserve/1026205392/960x0.jpg'
    },
    {
        address: '7355 Manchester Rd, Maplewood, MO',
        coordinates: {
            lat: 38.6140832,
            lng: -90.31923739999999
        },
        type: 'apartment',
        id: 'p2',
        image: 'https://specials-images.forbesimg.com/imageserve/1026205392/960x0.jpg'
    },
    {
        address: '6554 Manchester Rd, Maplewood, Mo',
        coordinates: {
            lat: 38.61923,
            lng: -90.30013
        },
        type: 'apartment',
        id: 'p3',
        image: 'https://specials-images.forbesimg.com/imageserve/1026205392/960x0.jpg'
    }
]


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
    const {coordinates, setCoordinates} = mapContext;
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
        if (coordinates.lat) {
            localStorage.setItem('coordinates', JSON.stringify({coordinates: coordinates}))
        } else {
            let localCoordinates = JSON.parse(localStorage.getItem('coordinates'));
            setCoordinates(localCoordinates.coordinates);
        }
    }, [coordinates])

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
        >
            {props.mainMap && dummyProperties.map(property => (
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
                            <h2>{selected.address}</h2>
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
    left: 0;
    z-index: 10;
    width: 350px;
`

export default Map





