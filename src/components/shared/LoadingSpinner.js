import React from 'react'
import styled, {keyframes} from 'styled-components'

const LoadingSpinner = () => {
    return (
        <Spinner></Spinner>
    )
}

export default LoadingSpinner

const spin = keyframes`
    0% { 
        transform: rotate(0deg); 
        -webkit-transform: rotate(0deg);
    }
    100% { 
        transform: rotate(360deg); 
        -webkit-transform: rotate(360deg);
    }
`

const Spinner = styled.div`
    width: 100px;
    height: 100px;
    border: 16px solid #f3f3f3;
    border-top: 16px solid #3498db;
    border-radius: 50%;
    animation: ${spin} 2s linear infinite;
`