import React from 'react'

import HeroSection from '../components/shared/HeroSection'
import cityscape from '../assets/cityscape.svg'
import Searchbox from '../components/map/Searchbox'

const Home = () => {
    return (
        <>
        <HeroSection bg={`url(${cityscape})`} overlay>
            <Searchbox />
        </HeroSection>
        </>
    )
}

export default Home