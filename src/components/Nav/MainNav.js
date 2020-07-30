import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

import MobileNav from './MobileNav'
import NavLinks from './NavLinks'
import Logo from './Logo'

const MainNav = () => (
    <Nav>
        <Logo />
        <NavBarFull>
            <NavLinks />
        </NavBarFull>
        <MobileNav />
    </Nav>
)

const Nav = styled.nav`
    height: 4rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--primary-color);
    color: white;
    position: relative;
    overflow: hidden;
    padding: 0 2rem;

    & > a {
        font-size: 2rem;
    }
`

const NavBarFull = styled.ul`
    flex: 1 1 auto;
    list-style: none;
    padding: 0;
    display: none;
    @media (min-width: 800px) {
        display: flex;
        justify-content: space-between;
    }
`

export default MainNav