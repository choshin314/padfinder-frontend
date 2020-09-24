import React from 'react'
import styled, {css} from 'styled-components'

import {devices} from './styledLib'

const PhotoGrid = props => {
    return (
        <Grid reverseStacking={props.reverseStacking} onClick={props.onClick}>
            {props.children}
        </Grid>
    )
}

export default PhotoGrid

const Grid = styled.div`
    ${props => props.reverseStacking && css`grid-row-start: 2;`}
    
    display: grid;
    align-content: start;
    grid-template-columns: 1fr 1fr;
    grid-gap: 5px;
    margin-top: 2rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid rgba(0,0,0,0.3);
    overflow-y: auto;
    & div {
        grid-area: span 1 / span 1;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(0,0,0,.8);
        height: 200px;

        & img {
            object-fit: contain;
            max-width: 100%;
            max-height: 100%;
        }
    }
    @media(min-width: ${devices.tablet}){
        margin: none;
        border: none;
        ${props => props.reverseStacking && css`grid-row-start: 1;`}
    }
`