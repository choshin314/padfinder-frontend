import React, {useState, useContext, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import styled from 'styled-components'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons'

import {MapContext} from '../../context/MapContext'

const SearchInput = (props) => {
    const { coordinates, nearbyProperties, displayAddress, dispatch } = useContext(MapContext);
    let history = useHistory();
    const [inputText, setInputText] = useState('');

    const handleInput = e => {
        let value = e.target.value;
        setInputText(value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let queryString = inputText.trim().replace(/ /g, '+').replace(/,/g, '+');
        let coordinates;

        //send search query to backend. backend will return:
        //1. converted search coordinates, 2. formatted search address, 3. properties within 3.2 miles
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/properties/nearby/string/${queryString}`);
            if (response.status === 404) return dispatch({ type: "UPDATE_NEARBY", value: [] });
            const { coordinates, formatted_address, nearbyProperties } = await response.json();
            dispatch({ type: "UPDATE_COORDS+ADDRESS", value: [coordinates, formatted_address] });
            dispatch({ type: 'UPDATE_NEARBY', value: nearbyProperties });
            history.push(`/search/${queryString}`)
        } catch(err) {
            console.log(err);
        }
    };

    useEffect(() => {
        setInputText(displayAddress)
    }, [displayAddress])

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