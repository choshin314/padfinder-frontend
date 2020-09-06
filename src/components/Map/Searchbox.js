import React from 'react'
import styled from 'styled-components'

import SearchInput from './SearchInput'

const Searchbox = () => {

    return (
        <Div>
            <h1>Find your new pad today</h1>
            <SearchInput />
        </Div>
    )
}

const Div = styled.div`
    width: 90%;
    min-width: 300px;
    margin: 0 auto;
    color: var(--primary-color);
    z-index: 1;
    position: relative;
    transform: translateY(-50%);
    @media(max-width: 768px) {
        margin-top: 3rem;       
    }

    & h1 {
        font-size: 3rem;
        font-weight: bold;
        text-align: center;
        z-index: 100;
        text-shadow: 2px 2px 2px #00ffff;
    }
`


export default Searchbox