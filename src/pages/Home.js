import React from 'react'

import Section from '../components/Section'
import cityscape from '../assets/cityscape.svg'
import Searchbox from '../components/map/Searchbox'

const Home = () => {
    return (
        <>
        <Section bg={`url(${cityscape})`} overlay>
            <Searchbox />
        </Section>
        </>
    )
}

export default Home