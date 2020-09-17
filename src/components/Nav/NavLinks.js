import React, {useContext} from 'react'
import {Link, useHistory} from 'react-router-dom'
import styled, {css} from 'styled-components'

import {AuthContext} from '../../context/AuthContext'
import {useLoginLogout} from '../../hooks/useLoginLogout'

const NavLinks = ({border}) => {
    const authContext = useContext(AuthContext);
    const {logout} = useLoginLogout();
    let history = useHistory();

    return (
        <>
        <NavItem border={border}><Link to="/favorites">Favorites</Link></NavItem>
        <NavItem border={border}><Link to="/listings">Manage Listings</Link></NavItem>
        <NavItem border={border}><Link to="/listings/new">Add Listing</Link></NavItem>
        {!authContext.user ?
            <NavItem border={border}><Link to="/authenticate">Sign In / Register</Link></NavItem> :
            <NavItem border={border}><button onClick={() => {
                logout();
                history.push('/');
            }}>Logout</button></NavItem>
        }
        </>
    )
}

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
    button {
        color: white;
        text-transform: uppercase;
        border: none;
        background: transparent;
        cursor: pointer;
    }
`

export default NavLinks