import React, {useState, useContext, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import styled from 'styled-components'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons'

import {MapContext} from '../context/MapContext'

const Searchbox = () => {
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
        let queryString = inputText.trim().replace(' ', '+');
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
        <Div>
            <h1>Find your new pad today</h1>
            <SearchForm onSubmit={handleSubmit}>
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
        </Div>
    )
}

const Div = styled.div`
    width: 90%;
    min-width: 480px;
    margin: 0 auto;
    color: var(--primary-color);
    z-index: 1;
    position: relative;
    transform: translateY(-50%);

    & h1 {
        font-size: 3rem;
        font-weight: bold;
        text-align: center;
        z-index: 100;
    }
`
const SearchForm = styled.form`
    line-height: 1.5;
    height: 3rem;
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
        font-size: 1.2rem;
    }
    & button {
        background-color: transparent;
        border: none;
        cursor: pointer;
    }
`


export default Searchbox