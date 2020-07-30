import React, {useState, useContext} from 'react'
import styled from 'styled-components'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons'

import {SearchContext} from '../context/SearchContext'

const Searchbox = () => {
    const searchContext = useContext(SearchContext);

    const [inputText, setInputText] = useState('');

    const handleInput = e => {
        const value = e.target.value;
        setInputText(value);
    }

    //on search form submit, send value to context - Maps component will need to consume this
    const handleSubmit = e => {
        e.preventDefault();
        searchContext.setSearchQuery(inputText);
        setInputText('');
    };

    console.log(searchContext.searchQuery);


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