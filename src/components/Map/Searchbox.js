import React from 'react'
import styled from 'styled-components'

import {devices} from '../shared/styledLib'
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
    z-index: 1;
    position: relative;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    

    & h1 {
        margin-top: 0;
        font-size: 2rem;
        font-weight: bold;
        text-align: center;
        z-index: 100;
        color: white;
        text-shadow: 3px 3px 3px #006D79;
        @media(min-width: ${devices.tablet}) {
            font-size: 3rem;
        }
    }
`


export default Searchbox