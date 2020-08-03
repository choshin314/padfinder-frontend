import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

const PropertyCard = props => {
    const {id, image, rent, beds, baths, sqft, address, name, type} = props.property;

    return (
        <Container>
            <ImageDiv>
                <Link to={`/properties/${id}`}><img src={image} alt={address} /></Link>
            </ImageDiv>
            <InfoList>
                <Flex>
                    <Rent>${rent}/mo</Rent>
                    <Detail>{beds} bd | {baths} ba | {sqft} sqft</Detail>
                </Flex>
                <Detail>{address.split(',')[0]}</Detail>
                <Detail>{name || `${type} for Rent`}</Detail>
                <Detail><Link to={`/properties/${id}`}>See details</Link></Detail>
            </InfoList>
        </Container>
    )
}
export default PropertyCard


const Container = styled.div`
    width: 100%;
    height: 300px;
    display: grid;
    grid-template-rows: 2fr 1fr;
    position: relative;
    padding: 0;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
`

const ImageDiv = styled.div`
    width: 100%;
    overflow: hidden;
    & img {
        width: 100%;
        object-fit: cover;
        object-position: 50% 50%;
    }
` 
const InfoList = styled.ul`
    list-style: none;
    padding: 0 0.5rem;
    margin: 0;
`

const Flex = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: baseline;
`
const Rent = styled.h1`
    font-size: 1.2rem;
`

const Detail = styled.li`
    font-size: .8rem;
    line-height: 1.3;
    text-transform: capitalize;
`