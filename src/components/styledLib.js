import React from 'react'
import styled from 'styled-components'

export const devices = {
    lgPhone: '600px',
    tablet: '768px',
    laptop: '1400px',
    wide: '1800px'
}

export const Wrapper = styled.div`
    width: 100%;
    max-width: ${props => props.maxWidth ? props.maxWidth : '1000px'};
    margin-left: auto;
    margin-right: auto;
    padding: 1rem;
    position: relative;
`
