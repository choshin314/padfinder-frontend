import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

const Logo = () => (
    <StyledLink to="/">PadFinder</StyledLink>
)

const StyledLink = styled(Link)`
    display: block;
    text-decoration: none;
    color: white;
    flex: 1 0 auto;
    cursor: pointer;
    font-weight: bold;
`

export default Logo;