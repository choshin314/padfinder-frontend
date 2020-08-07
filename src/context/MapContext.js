import React, {useState, useEffect} from 'react'

const MapContext = React.createContext();

function reducer(state, action) {
    switch(action.type) {
        case "UPDATE_COORDS": {
            return { ...state, coordinates: action.value }
        };
        case "UPDATE_NEARBY": {
            return { ...state, nearbyProperties: action.value }
        }; 
    }
}

const MapContextProvider = props => {
    const [coordinates, setCoordinates] = useState({});
    const [displayAddress, setDisplayAddress] = useState('');
    const [nearbyProperties, setNearbyProperties] = useState([]);


    //need to save coordinates + nearbyProperties to local storage or map & sidebar will blank out on reload bc context will reset on reload
    //only reset local storage w/ context values if we actually have new context values
    //if we don't have new coordinates, we need to use our value saved in local storage to set context state again after a reload
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

    return (
        <MapContext.Provider value={{coordinates, setCoordinates, displayAddress, setDisplayAddress, nearbyProperties, setNearbyProperties}} >
            {props.children}
        </MapContext.Provider>
    )
}

export {MapContextProvider, MapContext};