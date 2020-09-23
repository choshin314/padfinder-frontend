import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

import {convertToQueryString} from '../../helpers'
import {MapContext} from '../../context/MapContext'
import Logo from '../nav/Logo'
import featuredCities from '../../assets/featuredCities.json'
import {devices} from '../shared/styledLib'

const Footer = () => {
    const {displayAddress} = useContext(MapContext);
    const navLinks = [ 
        { path: `/search/${convertToQueryString(displayAddress)}`, name: 'Nearby' },
        { path: '/favorites', name: 'Favorites' }, 
        { path: '/listings', name: 'Manage Listings'}, 
        { path: '/listings/new', name: 'Add Listing'},
    ]
    return (
        <FooterWrapper>
            <NavContainer>
                <NavSection align="right">
                    <NavSectionTitle>EXPLORE</NavSectionTitle>
                    {navLinks.map(link => (
                        <NavItem key={"footer_" + link.name}>
                            <Link to={link.path}>{link.name}</Link>
                        </NavItem>
                    ))}
                </NavSection>
                <LogoWrapper>
                    <Logo white />
                    <p>© 2020 PadFinder</p>
                </LogoWrapper>
                <NavSection align="left">
                    <NavSectionTitle marginTop>FEATURED CITIES</NavSectionTitle>
                    {featuredCities.map(city => (
                        <NavItem key={"featuredCity_" + city}>
                            <Link to={`/search/${convertToQueryString(city)}`}>{city}</Link>
                        </NavItem>
                    ))}
                </NavSection>
            </NavContainer>
        </FooterWrapper>
    )
}

export default Footer

const FooterWrapper = styled.footer`
    min-height: 200px;
    padding: 2rem;
    background-color: var(--primary-color);
    color: white;
    display: flex;
    flex-direction: column;
    @media(min-width: ${devices.tablet}) {
        flex-direction: row;
    }
`

const NavContainer = styled.div`
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    @media(min-width: ${devices.tablet}) {
        flex-direction: row;
        justify-content: center;
    }
`

const NavSection = styled.nav`
    display: flex;
    flex-direction: column;
    margin: 0 2rem 2rem 2rem;
    text-align: center;
    @media(min-width: ${devices.tablet}) {
        text-align: ${props => props.align};
    }
    
`

const NavSectionTitle = styled.h3`
    color: var(--accent);
    font-size: 1.5rem;
    font-weight: bold;
`
const NavItem = styled.span`
    display: inline-block;
    grid-column: span 1;
    justify-self: center;

    a {
        text-decoration: none;
        font-family: 'Open Sans', sans-serif;
        font-weight: 600;
        font-size: 1.1rem;
        color: white;

        &:hover {
            color: #DEB887;
        }
    }
`
const LogoWrapper = styled.div`
    align-self: center;
    text-align: center;
    a {
        height: 4rem;
    }
`

