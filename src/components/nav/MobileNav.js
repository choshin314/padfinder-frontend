import React, {useState} from 'react'
import styled from 'styled-components'

import NavLinks from './NavLinks'

const MobileNav = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(prev => !prev);
    }

    return (
        <>
        <BurgerBtn onClick={toggleOpen} className={isOpen && 'isOpen'}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </BurgerBtn>
        <Container isOpen={isOpen} onClick={toggleOpen}>
            <MenuWrapper>
                
                <ul><NavLinks border inverse/></ul>
            </MenuWrapper>
        </Container>
        </>
    )
}

const BurgerBtn = styled.div`
    width: 40px;
    height: 30px; 
    position: relative;
    cursor: pointer;
    span {
        display: block;
        position: absolute;
        width: 100%;
        height: 6px;
        background: var(--primary-color);
        border-radius: 20px;
        transition: all 0.2s ease-in-out;
    }
    span:first-child {
        top: 0px;
    }
    span:nth-child(2), span:nth-child(3) {
        top: 12px;
    }
    span:nth-child(4) {
        top: 24px;
    }
    &.isOpen {
        span:first-child {
            transform: translateY(22px) scale(0);
        }
        span:nth-child(2) {
            transform: rotate(45deg);
        }
        span:nth-child(3) {
            transform: rotate(-45deg);
        }
        span:nth-child(4) {
            transform: translateY(-22px) scale(0);
        }
    }
    @media (min-width: 800px) {
        display: none;
    }
`

const Container = styled.div`
    width: 100vw;
    height: calc(100vh - 4rem);
    position: fixed;
    top: 4rem;
    left: 0;
    background: var(--primary-color);
    transition: transform .2s ease-in-out;
    transform: ${props => props.isOpen ? 'scaleY(1)' : 'scaleY(0)'};
    transform-origin: top;
    z-index: 10;
`

const MenuWrapper = styled.nav`
    width: 100%;
    height: 50vh;
    font-size: 2.5rem;
    display: flex;
    flex-direction: column;
    padding: 1rem 2.5rem;

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