import React from 'react'
import styled, {css} from 'styled-components'

const HeroSection = (props) => {
    return (
        <StyledSection bg={props.bg} overlay={props.overlay}>  
            {props.children}
        </StyledSection>
    )
}

export default HeroSection


const StyledSection = styled.section`
    width: 100%;
    padding: 15% 0;
    min-height: 300px;
    max-height: 450px;
    position: relative;
    background: ${props => props.bg ? props.bg : 'white'};
    background-size: cover;
    background-position: center;

    ${props => props.overlay && css`
        &::after {
            content: '';
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: rgba(255,255,255,.2);
        }
    `}
`
