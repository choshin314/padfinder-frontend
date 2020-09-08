import React from 'react'
import styled from 'styled-components'

import PropertyCard from './PropertyCard'

const PropertyList = ({ properties, errorMsg }) => {
    console.log(properties);

    return (
        <Container>
            <Heading>MANAGE YOUR LISTINGS</Heading>
            {!properties || properties.length < 1 && <ErrorDisplay>{errorMsg}</ErrorDisplay>}
            {properties && properties.map(property => (
                <CardWrapper>
                    <PropertyCard
                        key={property._id}
                        property={property}
                    />
                </CardWrapper>
            ))}
        </Container>
    )
}

export default PropertyList

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;

    & h1 {
        font-size: 1.5rem;
        text-align: center;
    }

    & > div {
        display: flex;
    }
`
const Heading = styled.h1`
    width: 100%;
    text-align: center;
    font-size: 2rem;
    font-weight: bold;
    color: var(--primary-color);
    margin: 1rem auto;
`

const CardWrapper = styled.div`
    width: 100%;
    padding: 1rem;
`

const ErrorDisplay = styled.p`
    width: 100%;
    text-align: center;
    font-size: 1rem;
    font-weight: bold;
    color: red;
`