import React, {useState, useContext, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import styled from 'styled-components'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons'

import {MapContext} from '../../context/MapContext'

const SearchInput = (props) => {
    const mapContext = useContext(MapContext);
    let history = useHistory();

    const [inputText, setInputText] = useState('');

    const handleInput = e => {
        let value = e.target.value;
        setInputText(value);
    }

    //on search form submit, send value to context - Maps component will need to consume this
    const handleSubmit = async (e) => {
        e.preventDefault();
        let queryString = inputText.trim().replace(/ /g, '+');
        try {
            const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${queryString}&key=${process.env.REACT_APP_MAPS_KEY}`);
            const responseData = await response.json();
            const coords = responseData.results[0].geometry.location;
            const displayAddress = responseData.results[0].formatted_address;
            mapContext.setCoordinates(coords);
            mapContext.setDisplayAddress(displayAddress);
            history.push(`/search/${queryString}`)
        } catch(err) {
            console.log(err);
        }
    };

    return (
        <SearchForm onSubmit={handleSubmit} mini={props.mini ? true:false}>
            <input
                type="text"
                value={inputText}
                name="query"
                placeholder="Enter an address, city, or ZIP code"
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
    display: flex;
    background-color: white;
    border: var(--primary-color) solid 2px;
    & input {
        height: 100%;
        flex: 1 1 auto;
        padding-left: 1rem;
        border: none;
        font-size: ${props => props.mini ? '1rem' : '1.2rem'};
    }
    & button {
        background-color: transparent;
        border: none;
        cursor: pointer;
    }
`

export default SearchInput