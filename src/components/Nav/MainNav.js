import React from 'react'
import styled from 'styled-components'

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
    background-color: white;
    
    overflow: hidden;
    padding: 0 2rem;
    position: fixed;
    z-index: 100;
    box-shadow: 0px 2px 10px 0px var(--dark-grey);

    & > a {
        font-size: 2rem;
        color: var(--primary-color);
    }
`

const NavBarFull = styled.ul`
    color: var(--primary-color);
    flex: 1 1 auto;
    list-style: none;
    padding: 0;
    display: none;
    font-weight: bold;
    font-size: 1.1rem;
    letter-spacing: 1.5px;
    button {
        font-weight: inherit;
        font-size: inherit;
        font-family: inherit;
        letter-spacing: inherit;
    }
    @media (min-width: 800px) {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
    }
`

export default MainNav