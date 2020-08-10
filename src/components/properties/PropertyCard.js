import React, {useContext} from 'react'
import styled from 'styled-components'

import {MapContext} from '../../context/MapContext'

const PropertyCard = props => {
    const {id, images, details, address, type} = props.property;
    const {rent, beds, baths, size} = details;
    const {dispatch} = useContext(MapContext); //on click, save the property in context. To be consumed by PropertyModal.

    return (
        <Container onClick={() => {
            props.toggleModal();
            dispatch({type: "EXPAND_PROPERTY", value: props.property});
        }}>
            <ImageDiv>
                <img src={images[0].href} alt={address.street} />
            </ImageDiv>
            <InfoList>
                
                    {
                        !rent[1] ? 
                        <Rent>${rent[0]}/mo</Rent> :
                        <Rent>${rent[0]}-${rent[1]}/mo</Rent>
                    }
                    {
                        !beds[1] ? 
                        <Detail>{beds[0]} bd | {baths[0]} ba | {size[0]} sqft</Detail> :
                        <Detail>{beds[0]}-{beds[1]} bd | {baths[0]}-{baths[1]} ba | {size[0]}-{size[1]} sqft</Detail>
                    }
                    
                
                <Detail>{address.street}, {address.city}, {address.state} {address.zip}</Detail>
                <Detail>{details.neighborhood || `${type} for Rent`}</Detail>
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
    font-size: 1.1rem;
`

const Detail = styled.li`
    font-size: .8rem;
    line-height: 1.3;
    text-transform: capitalize;
`