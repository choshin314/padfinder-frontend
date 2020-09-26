import React, {useState, useContext, useEffect} from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

import {PropertyContext} from '../context/PropertyContext'
import {MapContext} from '../context/MapContext'
import cityscape from '../assets/cityscape.jpg'
import featuredCities from '../assets/featuredCities.json'
import Searchbox from '../components/map/Searchbox'
import {devices} from '../components/shared/styledLib'
import {convertToQueryString} from '../helpers'
import PropertyCard from '../components/properties/PropertyCard'
import PropertyModal from '../components/properties/PropertyModal'
import LoadingSpinner from '../components/shared/LoadingSpinner'

const Home = () => {
    const {nearbyProperties, displayAddress, dispatch} = useContext(MapContext);
    const [loading, setLoading] = useState(false);
    const {modalOpen, toggleModal} = useContext(PropertyContext);

    async function getClientGeo() {
        setLoading(true);
        let geoData;
        try {
            const response = await fetch(`http://api.ipstack.com/check?access_key=${process.env.REACT_APP_IPSTACK_KEY}&fields=main`);
            geoData = await response.json();
            dispatch({ type: 'UPDATE_COORDS+ADDRESS', value: [
                { lat: geoData.latitude, lng: geoData.longitude },
                `${geoData.city}, ${geoData.region_code} ${geoData.zip}`
            ]})
        } catch(err) {
            console.log(err.message);
            setLoading(false);
        }
        return geoData;
    };

    async function getPanelProperties() {
        const geoData = await getClientGeo();
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/properties/nearby?lat=${geoData.latitude}&lng=${geoData.longitude}`)
            const data = await response.json();
            dispatch({ type: 'UPDATE_NEARBY', value: data.nearbyProperties });
            setLoading(false);
        } catch(err) {
            console.log(err.message);
            setLoading(false);
        }
    }
    //get nearby listings based on client ip geolocation - only if nearbyProperties isn't cached from a prev search
    useEffect(() => {
        if (nearbyProperties.length === 0) getPanelProperties();
    }, [])

    function renderUpToTwelveCards() {
        let limitTwelveCards = [];
        let limit = nearbyProperties.length > 12 ? 12 : nearbyProperties.length;
        for (let i = 0; i < limit; i++) {
            limitTwelveCards.push(<PropertyCard key={nearbyProperties[i]._id} property={nearbyProperties[i]} />)
        }
        return limitTwelveCards;
    }
    
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
                {!loading && nearbyProperties.length === 0 && (
                    <Filler>
                        <FillerOptions>
                            <h3>Bummer!</h3>
                            <p>No listings within 100 miles.  Consider moving to one of our featured cities?</p>
                            <FillerList>
                                {featuredCities.map(city => (
                                    <li key={"featuredCity_" + city}>
                                        <Link to={`/search/${convertToQueryString(city)}`}>{city}</Link>
                                    </li>
                                ))}
                            </FillerList>
                        </FillerOptions>
                    </Filler>
                )}
                {!loading && nearbyProperties && nearbyProperties.length <= 12 && nearbyProperties.map(p => <PropertyCard key={p._id} property={p} />)}
                {!loading && nearbyProperties && nearbyProperties.length > 12 && renderUpToTwelveCards()}
            </GridPanel>
            <SeeMoreBtn>
                <Link to={`/search/${displayAddress.trim().replace(/ /g, '+').replace(/,/g, '')}`}>DISCOVER MORE</Link>
            </SeeMoreBtn>
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
        grid-column: span 1;
    }
    @media(min-width: ${devices.laptop}) {
        grid-column: span 1;
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
const Filler = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    text-align: center;
    margin-bottom: 1rem;
    @media(min-width: ${devices.tablet}) {
        grid-column: span 2;
    }
    @media(min-width: ${devices.laptop}) {
        grid-column: span 4;
    }
`

const FillerOptions = styled.div`
    width: 100%;
    max-width: 600px;
    h3 {
        font-size: 1.3rem;
    }
    p {
        font-size: 1rem;
        line-height: 1.5;
    }
`

const FillerList = styled.ul`
    list-style: none;
    padding: 0;
    a {
        text-decoration: none;
        color: var(--primary-color);
        font-weight: 600;
        text-transform: uppercase;
        position: relative;

        &::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: var(--accent);
            transition: transform .2s ease-in-out;
            transform: scaleX(0);
            transform-origin: right;
        }
    }

    a:hover {
        &::after {
            transform: scaleX(1);
            transform-origin: left;
        }
    }
`