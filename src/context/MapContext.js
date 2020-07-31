import React, {useState} from 'react'

const MapContext = React.createContext();

const MapContextProvider = props => {
    const [searchQuery, setSearchQuery] = useState('');
    const [coordinates, setCoordinates] = useState('');
    const [displayAddress, setDisplayAddress] = useState('');

    const convertAddress = async address => {
        const formattedAddress = address.trim().replace(' ','+');
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${formattedAddress}&key=${process.env.REACT_APP_MAPS_KEY}`);
        const responseData = await response.json();
        const coords = responseData.results[0].geometry.location;
        const displayAddress = responseData.results[0]['formatted_address'];
        setCoordinates(coords);
        setDisplayAddress(displayAddress);
    }

    return (
        <MapContext.Provider value={{searchQuery, setSearchQuery, coordinates, displayAddress, convertAddress}} >
            {props.children}
        </MapContext.Provider>
    )
}

export {MapContextProvider, MapContext};