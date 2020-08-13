import React from 'react'
import {Link} from 'react-router-dom'
import styled, {css} from 'styled-components'

const NavLinks = ({border}) => (
    <>
    <NavItem border={border}><Link to="/favorites">My Favorites</Link></NavItem>
    <NavItem border={border}><Link to="/listings">Manage Listings</Link></NavItem>
    <NavItem border={border}><Link to="/listings/new">Add Listing</Link></NavItem>
    <NavItem border={border}><Link to="/authenticate">Sign In / Register</Link></NavItem>
    </>
)

const NavItem = styled.li`
    ${props => props.border && css`
        &::before {
            content: '';
            display: block;
            height: 2px;
            width: 100%;
            background-color: white;
        }
        &:last-child::after {
            content: '';
            display: block;
            height: 2px;
            width: 100%;
            background-color: white;
        }
    `}
    a {
        color: white;
        text-decoration: none;
        text-transform: uppercase;
    }
`

export default NavLinks