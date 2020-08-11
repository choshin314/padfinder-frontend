import React from 'react'
import styled from 'styled-components'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHeart as fasHeart} from '@fortawesome/free-solid-svg-icons'
import {faHeart as farHeart} from '@fortawesome/free-regular-svg-icons'
import {dummyProperties} from '../dummyProperties'

import {Wrapper} from '../styledLib'

const PropertyDetails = props => {
    const {type, list_date, address, details, creator} = props.property; 

    return (
        <Wrapper>
            <FlexHeader>
                <h1>Property Details</h1>
                <h1>Save <span><FontAwesomeIcon icon={farHeart} size={'1x'}/></span></h1>
            </FlexHeader>
            <InfoContainer>
                <InfoList>
                    <Flex>
                        <Rent>${details.rent}/mo</Rent>
                        <Detail>{details.beds} bd | {details.baths} ba | {details.size} sqft</Detail>
                    </Flex>
                    <Detail>{`${address.street}, ${address.city}, ${address.state} ${address.zip}`}</Detail>
                    <Detail>{details.neighborhood || `${type} for Rent`}</Detail>
                </InfoList>
            </InfoContainer>
        </Wrapper>
    )
}

const FlexHeader = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const InfoContainer = styled.div`
    width: 100%;
    position: relative;
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


export default PropertyDetails

