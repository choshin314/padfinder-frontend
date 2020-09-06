import React, {useContext} from 'react'
import styled from 'styled-components'

import {PropertyModalContext} from '../../context/PropertyModalContext'

const PropertyCard = props => {
    const {_id, photos, details, address, type} = props.property;
    const {rent, beds, baths, size} = details;
    const {toggleModal, setExpandedProperty} = useContext(PropertyModalContext); //on click, save the property in context. To be consumed by PropertyModal.

    return (
        <Container onClick={() => {
            toggleModal();
            setExpandedProperty(props.property);
        }}>
            <ImageDiv>
                <img src={photos[0].href} alt={address.street} />
            </ImageDiv>
            <InfoList>
                <Address>{address.street}, {address.city}, {address.state} {address.zip}</Address>
                <Detail>{details.neighborhood || `${type} for Rent`}</Detail>    
                {
                    rent[1] === rent[0] ? 
                    <Detail>${rent[0]}/mo</Detail> :
                    <Detail>${rent[0]}-${rent[1]}/mo</Detail>
                }
                {
                    beds[1] === beds[0] ? 
                    <Detail>{beds[0]} bd | {baths[0]} ba | {size[0]} sqft</Detail> :
                    <Detail>{beds[0]}-{beds[1]} bd | {baths[0]}-{baths[1]} ba | {size[0]}-{size[1]} sqft</Detail>
                }
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
    box-shadow: 0 3px 6px rgba(0,0,0,0.12), 0 3px 6px rgba(0,0,0,0.24);
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
    cursor: pointer;
    &:hover {
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    }
`

const ImageDiv = styled.div`
    width: 100%;
    overflow: hidden;
    & img {
        width: 100%;
        height: 200px;
        object-fit: cover;
        object-position: 50% 50%;
    }
` 
const InfoList = styled.ul`
    list-style: none;
    padding: 1rem;
    margin: 0;
`

const Flex = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: baseline;
`
const Address = styled.li`
    font-size: 1rem;
    font-weight: bold;
    text-transform: capitalize;
`

const Detail = styled.li`
    font-size: .8rem;
    line-height: 1.5;
    text-transform: capitalize;
`
