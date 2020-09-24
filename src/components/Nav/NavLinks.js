import React, {useContext} from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import styled, {css} from 'styled-components'

import {AuthContext} from '../../context/AuthContext'
import {useLoginLogout} from '../../hooks/useLoginLogout'

const NavLinks = ({border, inverse}) => {
    const authContext = useContext(AuthContext);
    const {logout} = useLoginLogout();
    let history = useHistory();

    return (
        <>
        <NavItem border={border} inverse={inverse}><NavLink to="/favorites" activeClassName="activeNavLink">Favorites</NavLink></NavItem>
        <NavItem border={border} inverse={inverse}><NavLink exact to="/listings"activeClassName="activeNavLink">Manage Listings</NavLink></NavItem>
        <NavItem border={border} inverse={inverse}><NavLink exact to="/listings/new"activeClassName="activeNavLink">Add Listing</NavLink></NavItem>
        {!authContext.user ?
            <NavItem border={border} inverse={inverse}><NavLink to="/authenticate"activeClassName="activeNavLink">Sign In / Register</NavLink></NavItem> :
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
        position: relative;
        &:hover {
            color: var(--accent);
        }
    }
    a::after {
        transition: transform .2s ease-in-out;
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background: var(--accent);
        transform: scaleX(0);
    }
    a.activeNavLink {
        color: var(--accent);
        font-weight: 800;
        &::after {
            transform: scaleX(1);
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