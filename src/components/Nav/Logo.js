import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import logoGreen from '../../assets/logoGreen.png'
import logoWhite from '../../assets/logoWhite.png'

const Logo = ({white}) => (
    <StyledLink to="/"><img src={!white ? logoGreen : logoWhite } alt="padfinder logo" /></StyledLink>
)

const StyledLink = styled(Link)`
    display: block;
    text-decoration: none;
    color: white;
    flex: 1 0 auto;
    cursor: pointer;
    & img {
        height: 100%;
    }
`

export default Logo;