import React, { useEffect, useReducer, useState } from 'react'

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
        default: return state;
    }
}

function checkLocalStorage(key, orValue) {
    let localItem = localStorage.getItem(key);
    return ( localItem ? JSON.parse(localItem) : orValue );
}

const MapContextProvider = props => {
    //if it's saved in localstorage, initialize it w/ that.  Otherwise, initialize state fresh.

    const [ state, dispatch ] = useReducer(reducerFunction, {
        coordinates: checkLocalStorage('coordinates', {}),
        nearbyProperties: checkLocalStorage('nearbyProperties', []),
        displayAddress: checkLocalStorage('displayAddress', '')
    })
    const { coordinates, nearbyProperties, displayAddress } = state;

    //need to save coordinates, nearbyProperties & displayAddy to local storage or map & sidebar will blank out on reload bc context will reset on reload
    //only reset local storage w/ context values if we actually have new context values
    //if we don't have new coordinates, we need to use our value saved in local storage to set context state again after a reload
    useEffect(()=> {
        if (coordinates.lat && nearbyProperties && displayAddress) {
            localStorage.setItem('coordinates', JSON.stringify(coordinates));
            localStorage.setItem('nearbyProperties', JSON.stringify(nearbyProperties));
            localStorage.setItem('displayAddress', JSON.stringify(displayAddress));
        } 
    }, [coordinates, nearbyProperties, displayAddress])

    return (
        <MapContext.Provider value={{
            coordinates, 
            nearbyProperties, 
            displayAddress, 
            dispatch
        }} >
            {props.children}
        </MapContext.Provider>
    )
}

export {MapContextProvider, MapContext};