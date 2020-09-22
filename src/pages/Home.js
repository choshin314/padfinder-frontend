import React, {useState, useContext, useEffect} from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

import {PropertyContext} from '../context/PropertyContext'
import {MapContext} from '../context/MapContext'
import cityscape from '../assets/cityscape.jpg'
import Searchbox from '../components/map/Searchbox'
import {devices} from '../components/shared/styledLib'
import PropertyCard from '../components/properties/PropertyCard'
import PropertyModal from '../components/properties/PropertyModal'
import LoadingSpinner from '../components/shared/LoadingSpinner'


const Home = () => {
    const {coordinates, nearbyProperties, displayAddress, dispatch} = useContext(MapContext);
    const [loading, setLoading] = useState(false);
    const {modalOpen, toggleModal} = useContext(PropertyContext);

    async function getClientGeo() {
        setLoading(true);
        let ipObj;
        try {
            const response = await fetch('https://api.ipify.org/?format=json')
            ipObj = await response.json();
        } catch(err) { 
            console.log(err.message) 
            setLoading(false);
        }
        try {
            let response= await fetch(`https://geo.ipify.org/api/v1?apiKey=${process.env.REACT_APP_GEOIP_KEY}&ipAddress=${ipObj.ip}`);
            const geoData = await response.json();
            dispatch({ type: 'UPDATE_COORDS+ADDRESS', value: [
                { lat: geoData.location.lat, lng: geoData.location.lng }, 
                `${geoData.location.city}, ${geoData.location.postalCode}`
            ]})
            return { lat: geoData.location.lat, lng: geoData.location.lng, city: geoData.location.city }
        } catch(err) {
            console.log(err.message)
            setLoading(false);
        }
    };

    async function getPanelProperties() {
        const geoData = await getClientGeo();
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/properties/nearby/coordinates/${geoData.lat}-${geoData.lng}`)
            const nearby = await response.json();
            dispatch({ type: 'UPDATE_NEARBY', value: nearby });
            setLoading(false);
        } catch(err) {
            console.log(err.message);
            setLoading(false);
        }
    }
    //get client ip, then get ip geolocation - only needed if nearbyProperties isn't cached from a prev search
    useEffect(() => {
        if (nearbyProperties.length === 0) getPanelProperties();
    }, [])

    console.log(coordinates);
    console.log(nearbyProperties)

    return (
        <>
        <HeroSection>
            <Searchbox />
        </HeroSection>
        <Section>
            <PanelTitle>Rentals Near {displayAddress ? displayAddress : 'You'}</PanelTitle>
            <GridPanel>
                {loading && (<>
                    <LoadingCard><LoadingSpinner /></LoadingCard>
                    <LoadingCard><LoadingSpinner /></LoadingCard>
                    <LoadingCard><LoadingSpinner /></LoadingCard>
                    <LoadingCard><LoadingSpinner /></LoadingCard>
                </>)}
                {!loading && nearbyProperties && nearbyProperties.map(p => <PropertyCard key={p._id} property={p} />)}
            </GridPanel>
            <SeeMoreBtn>
                <Link to={`/search/${displayAddress.trim().replace(/ /g, '+').replace(/,/g, '+')}`}>DISCOVER MORE</Link>
            </SeeMoreBtn>
        </Section>
        <Section>

        </Section>
        {modalOpen && <PropertyModal toggleModal={toggleModal}/>}
        </>
    )
}

export default Home

const HeroSection = styled.section`
    width: 100%;
    padding: 25% 0;
    min-height: 300px;
    max-height: 450px;
    position: relative;
    background: url(${cityscape});
    background-size: cover;
    background-position: center;
    &::after {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0,0,0,.3);
    }
    @media(min-width: ${devices.tablet}) {
        padding: 15% 0;
    }

`

const Section = styled.section`
    padding: 2rem;
    border-bottom: solid 2px var(--light-grey);
    
    @media(min-width: ${devices.laptop}) {
        width: 90%;
        margin: 0 auto;
    }
`

const PanelTitle = styled.h3`
    margin: 0 0 2rem 0;
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
    @media(min-width: ${devices.tablet}) {
        font-size: 2rem;
    }
`

const GridPanel = styled.section`
    
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
    
    @media(min-width: ${devices.tablet}) {
        grid-template-columns: 1fr 1fr;
    }
    @media(min-width: ${devices.laptop}) {
        grid-template-columns: repeat(4, 1fr);
    }
`

const LoadingCard = styled.div`
    height: 300px;
    grid-columns: span 1;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);

    @media(min-width: ${devices.tablet}) {
        grid-columns: span 2;
    }
    @media(min-width: ${devices.laptop}) {
        grid-columns: span 4;
    }
`

const SeeMoreBtn = styled.div`
    margin-top: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    a {
        text-decoration: none;
        background: var(--primary-color);
        color: white;
        font-size: 1rem;
        font-weight: bold;
        letter-spacing: 1.5px;
        padding: 1rem;
        border: 2px solid transparent;
        border-radius: 10px;
        &:hover {
            box-shadow: 5px 5px #666;
            background: white;
            border: 2px solid var(--light-grey);
            color: var(--primary-color);
        }
        &:active {
            box-shadow: 10px 10px #666;
            transform: translateY(4px);
        }
        @media(min-width: ${devices.tablet}) {
            font-size: 1.25rem;
        }
    }
`
