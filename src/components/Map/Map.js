import React, {useContext, useEffect, useState, useRef} from 'react'
import styled from 'styled-components'

import {MapContext} from '../../context/MapContext'

const Map = props => {
    const mapContext = useContext(MapContext);
    const mapRef = useRef(null);
    const [coordinates, setCoordinates] = useState(mapContext.coordinates)
    //map coordinates will be based on 'coordinates' state value, which is initialized w/ value from mapContext
    //on mount, map search bar will be prefilled with formatted address of previous search
    //initialize coordinates with the value received from context
    //can enter new search coordinates within the loaded Map (i.e. rewrite 'coordinates' state)

    //render map on mount and rerender map on each 'coordinates' update
    const initMap = (coordinates) => {
        let map = new window.google.maps.Map(mapRef.current, {
            zoom: 10,
            center: coordinates
        })
    };

    useEffect(() => {
        initMap(coordinates);    
    }, [coordinates]);

    return (
        <Div ref={mapRef} ></Div>
    )
}

const Div = styled.div`
    width: 100%;
    height: 100vh;
`

export default Map