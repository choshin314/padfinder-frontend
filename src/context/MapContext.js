import React, {useState} from 'react'

const MapContext = React.createContext();

const MapContextProvider = props => {
    const [coordinates, setCoordinates] = useState({});
    const [displayAddress, setDisplayAddress] = useState('');
    const [nearbyProperties, setNearbyProperties] = useState([]);

    return (
        <MapContext.Provider value={{coordinates, setCoordinates, displayAddress, setDisplayAddress, nearbyProperties, setNearbyProperties}} >
            {props.children}
        </MapContext.Provider>
    )
}

export {MapContextProvider, MapContext};