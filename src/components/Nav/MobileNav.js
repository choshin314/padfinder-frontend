import React, {useState} from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

import NavLinks from './NavLinks'
import Logo from './Logo'

const MobileNav = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(prev => !prev);
    }

    return (
        <>
        <BurgerBtn onClick={toggleOpen}><FontAwesomeIcon icon={faBars} size="3x"/></BurgerBtn>
        <Container isOpen={isOpen} onClick={toggleOpen}>
            <MenuWrapper>
                <Logo />
                <ul><NavLinks border/></ul>
            </MenuWrapper>
        </Container>
        </>
    )
}

const BurgerBtn = styled.button`
    position: relative;
    height: 100%;
    width: 4rem;
    background: transparent;
    border: none;
    cursor: pointer;

    & svg {
        color: white;
    }

    @media (min-width: 800px) {
        display: none;
    }
`
const Container = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    right: 0;
    background: var(--primary-color);
    transition: transform .2s ease-in-out;
    transform: ${props => props.isOpen ? 'scaleX(1)' : 'scaleX(0)'};
    transform-origin: right;
`

const MenuWrapper = styled.div`
    width: 100%;
    height: 50vh;
    font-size: 2.5rem;
    display: flex;
    flex-direction: column;
    padding: 2.5rem;

    & ul {
        padding: 0;
        display: flex;
        flex-direction: column;
        list-style: none;
        font-size: 2rem;

        & li {
            line-height: 2.5;
        }
        & button {
            font-size: 2rem;
            padding: 0;
        }
    }
`

export default MobileNav