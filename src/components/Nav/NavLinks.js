import React, {useContext} from 'react'
import {Link, useHistory} from 'react-router-dom'
import styled, {css} from 'styled-components'

import {AuthContext} from '../../context/AuthContext'
import {useLoginLogout} from '../../hooks/useLoginLogout'

const NavLinks = ({border, inverse}) => {
    const authContext = useContext(AuthContext);
    const {logout} = useLoginLogout();
    let history = useHistory();

    return (
        <>
        <NavItem border={border} inverse={inverse}><Link to="/favorites">Favorites</Link></NavItem>
        <NavItem border={border} inverse={inverse}><Link to="/listings">Manage Listings</Link></NavItem>
        <NavItem border={border} inverse={inverse}><Link to="/listings/new">Add Listing</Link></NavItem>
        {!authContext.user ?
            <NavItem border={border} inverse={inverse}><Link to="/authenticate">Sign In / Register</Link></NavItem> :
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
        &::before {
            content: '';
            display: block;
            height: 2px;
            width: 100%;
            background-color: ${props => props.inverse ? 'white' : 'var(--primary-color)'};
        }
        &:last-child::after {
            content: '';
            display: block;
            height: 2px;
            width: 100%;
            background-color: ${props => props.inverse ? 'white' : 'var(--primary-color)'};
        }
    `}
    a {
        color: ${props => props.inverse ? 'white' : 'var(--primary-color)'};
        text-decoration: none;
        text-transform: uppercase;
    }
    button {
        color: ${props => props.inverse ? 'white' : 'var(--primary-color)'};
        text-transform: uppercase;
        border: none;
        background: transparent;
        cursor: pointer;
    }
`

export default NavLinks