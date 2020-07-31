import React, {useState} from 'react'

const MapContext = React.createContext();

const MapContextProvider = props => {
    const [coordinates, setCoordinates] = useState({});
    const [displayAddress, setDisplayAddress] = useState('');

    return (
        <MapContext.Provider value={{coordinates, setCoordinates, displayAddress, setDisplayAddress}} >
            {props.children}
        </MapContext.Provider>
    )
}

export {MapContextProvider, MapContext};