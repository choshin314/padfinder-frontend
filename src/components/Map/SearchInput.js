import React, {useState, useContext} from 'react'
import {useHistory} from 'react-router-dom'
import styled from 'styled-components'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons'

import {MapContext} from '../../context/MapContext'

const SearchInput = (props) => {
    const { coordinates, nearbyProperties, displayAddress, dispatch } = useContext(MapContext);
    let history = useHistory();

    const startingText = () => { return (displayAddress.length > 1 ? displayAddress : null )}
    const [inputText, setInputText] = useState(startingText);

    const handleInput = e => {
        let value = e.target.value;
        setInputText(value);
    }

    //on search submit, send value to context - Maps component will need to consume this
    const handleSubmit = async (e) => {
        e.preventDefault();
        let queryString = inputText.trim().replace(/ /g, '+').replace(/,/g, '');
        let newCoords;

        //convert queried address to lat lng and store in mapcontext.  Map component will need coordinates as center.
        try {
            const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${queryString}&key=${process.env.REACT_APP_MAPS_KEY}`);
            const responseData = await response.json();
            newCoords = responseData.results[0].geometry.location;
            const displayAddy = responseData.results[0].formatted_address;
            dispatch({ type: "UPDATE_COORDS+ADDRESS", value: [newCoords, displayAddy] })
        } catch(err) {
            console.log(err);
        }

        //retrieve array of properties that are within 3(ish) miles from queried property. Store it in mapcontext.
        //need to display these in map markers/infowindows and property cards for the sidebar
        try {
            const response = await fetch(`http://localhost:5000/api/properties/nearby/${newCoords.lat}-${newCoords.lng}`);
            const nearbyProperties = await response.json();
            // mapContext.setNearbyProperties(nearbyProperties);
            dispatch({ type: "UPDATE_NEARBY", value: nearbyProperties })
        } catch(err) {
            console.log(err, 'Failed to fetch nearby properties');
        }

        history.push(`/search/${queryString}`)
    };

    return (
        <SearchForm onSubmit={handleSubmit} mini={props.mini ? true:false}>
            <input
                type="text"
                value={inputText}
                name="query"
                placeholder="Address, city, or ZIP code"
                onChange={handleInput}
            />
            <button type="submit">
                <FontAwesomeIcon icon={faSearch} size="2x" />
            </button>
        </SearchForm>
    )
}

const SearchForm = styled.form`
    line-height: 1.5;
    height: ${props => props.mini ? '2rem' : '3rem'};
    width: 80%;
    max-width: 600px;
    margin: 0 auto;
    position: relative;
    background-color: white;
    border: var(--primary-color) solid 2px;
    & input {
        height: 100%;
        width: 100%;
        padding-left: 1rem;
        border: none;
        font-size: ${props => props.mini ? '1rem' : '1.2rem'};
    }
    & button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        & > svg {
            color: rgba(0,0,0,0.5);
        }
    }
`

export default SearchInput