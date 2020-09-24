import React, {useContext} from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import styled, {css} from 'styled-components'

import {AuthContext} from '../../context/AuthContext'
import {useLoginLogout} from '../../hooks/useLoginLogout'

const activeStyle = {
    fontWeight: "800",
    color: "var(--accent)"

}

const NavLinks = ({border, inverse}) => {
    const authContext = useContext(AuthContext);
    const {logout} = useLoginLogout();
    let history = useHistory();

    return (
        <>
        <NavItem border={border} inverse={inverse}><NavLink to="/favorites" activeStyle={activeStyle}>Favorites</NavLink></NavItem>
        <NavItem border={border} inverse={inverse}><NavLink exact to="/listings" activeStyle={activeStyle}>Manage Listings</NavLink></NavItem>
        <NavItem border={border} inverse={inverse}><NavLink exact to="/listings/new" activeStyle={activeStyle}>Add Listing</NavLink></NavItem>
        {!authContext.user ?
            <NavItem border={border} inverse={inverse}><NavLink to="/authenticate" activeStyle={activeStyle}>Sign In / Register</NavLink></NavItem> :
            <NavItem border={border} inverse={inverse}><button onClick={() => {
                logout();
                history.push('/');
            }}>Logout</button></NavItem>
        }
        </>
    )
}

const NavItem = styled.li`
    ${props => props.border && css`
        &::after {
            content: '';
            display: block;
            height: 2px;
            width: 100%;
            background-color: ${props => props.inverse ? 'white' : 'var(--primary-color)'};
            &:hover {
                color: var(--accent);
            }
        }
    `}
    a {
        color: ${props => props.inverse ? 'white' : 'var(--primary-color)'};
        text-decoration: none;
        text-transform: uppercase;
        &:hover {
            color: var(--accent);
        }
    }
    button {
        color: ${props => props.inverse ? 'white' : 'var(--primary-color)'};
        text-transform: uppercase;
        border: none;
        background: transparent;
        cursor: pointer;
        &:hover {
            color: var(--accent);
        }
    }
`

export default NavLinks