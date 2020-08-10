import React, { useEffect, useReducer } from 'react'

const MapContext = React.createContext();

function reducerFunction(state, action) {
    switch(action.type) {
        case "UPDATE_COORDS": {
            return { ...state, coordinates: action.value }
        };
        case "UPDATE_COORDS+ADDRESS": {
            return { ...state, coordinates: action.value[0], displayAddress: action.value[1] }
        };
        case "UPDATE_NEARBY": {
            return { ...state, nearbyProperties: action.value }
        }; 
        case "EXPAND_PROPERTY": {
            return { ...state, expandedProperty: action.value }
        };
    }
}

const MapContextProvider = props => {
    //if it's saved in localstorage, initialize it w/ that.  Otherwise, initialize state fresh.
    const [ state, dispatch ] = useReducer(reducerFunction, {
        coordinates: JSON.parse(localStorage.getItem('coordinates')).coordinates || {},
        nearbyProperties: JSON.parse(localStorage.getItem('nearbyProperties')).nearbyProperties || [],
        displayAddress: JSON.parse(localStorage.getItem('displayAddress')).displayAddress || '',
        expandedProperty: null
    })

    const { coordinates, nearbyProperties, displayAddress, expandedProperty } = state;

    //need to save coordinates, nearbyProperties & displayAddy to local storage or map & sidebar will blank out on reload bc context will reset on reload
    //only reset local storage w/ context values if we actually have new context values
    //if we don't have new coordinates, we need to use our value saved in local storage to set context state again after a reload
    useEffect(()=> {
        if (coordinates.lat && nearbyProperties && displayAddress) {
            localStorage.setItem('coordinates', JSON.stringify({coordinates: coordinates}));
            localStorage.setItem('nearbyProperties', JSON.stringify({nearbyProperties}));
            localStorage.setItem('displayAddress', JSON.stringify({displayAddress}));
        } 
    }, [coordinates, nearbyProperties, displayAddress])

    return (
        <MapContext.Provider value={{coordinates, nearbyProperties, displayAddress, expandedProperty, dispatch}} >
            {props.children}
        </MapContext.Provider>
    )
}

export {MapContextProvider, MapContext};