import React, {useState, useContext, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import styled from 'styled-components'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons'

import {MapContext} from '../../context/MapContext'

const SearchInput = (props) => {
    const { displayAddress } = useContext(MapContext);
    const [inputText, setInputText] = useState('');
    let history = useHistory();

    const handleInput = e => {
        let value = e.target.value;
        setInputText(value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let queryString = inputText.trim().replace(/ /g, '+').replace(/,/g, '+');
        history.push(`/search/${queryString}`)
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