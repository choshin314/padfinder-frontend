import React from 'react'
import styled from 'styled-components'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons'
import {faHeart as farHeart} from '@fortawesome/free-regular-svg-icons'

import ContactForm from './ContactForm'
import {Wrapper} from '../styledLib'

const PropertyDetails = props => {
    const {available_date, type, address, details} = props.property; 

    function getFormattedDate(date) {
        let rawDate = new Date(date);
        let displayDate = `${rawDate.getMonth() + 1}/${rawDate.getDay() + 1}/${rawDate.getFullYear()}`;
        return displayDate;
    }

    return (
        <WrapperDiv>
            <FlexHeader>
                <h1>Property Details</h1>
                <span>Save <span><FontAwesomeIcon icon={farHeart} size={'1x'}/></span></span>
            </FlexHeader>
            <InfoContainer>
                <InfoList>
                    {details.rent[0] === details.rent[1] ? 
                        <Flex>
                            <Subheading>${details.rent[0]}/mo</Subheading>
                            <Detail>{details.beds[0]} bd | {details.baths[0]} ba | {details.size[0]} sqft</Detail>
                        </Flex>
                        : 
                        <Flex>
                            <Subheading>${details.rent[0]}-{details.rent[1]}/mo</Subheading>
                            <Detail>{details.beds[0]}-{details.beds[1]} bd | {details.baths[0]}-{details.baths[1]} ba | {details.size[0]}-{details.size[1]} sqft</Detail>
                        </Flex>
                    }
                    <Detail>{`${address.street}, ${address.city}, ${address.state} ${address.zip}`}</Detail>
                    <Detail>{details.neighborhood || `${type} for Rent`}</Detail>
                </InfoList>
            </InfoContainer>
            <InfoContainer>
                <Subheading>Facts & Policies</Subheading>
                <BigGrid>
                    <InfoList>
                        <Detail>
                            <Grid>  
                                <span>Available: </span>
                                <span>{getFormattedDate(available_date) || 'Today'}</span>
                            </Grid>
                        </Detail>
                        <Detail>
                            <Grid>  
                                <span>Type: </span>
                                <span>{type}</span>
                            </Grid>
                        </Detail>
                        <Detail>
                            <Grid>
                                <span>Parking: </span>
                                <span>{details.parking || 'Contact Agent'}</span>
                            </Grid>
                        </Detail>
                        <Detail>
                            <Grid>
                                <span>Laundry: </span>
                                <span>{details.laundry || 'Contact Agent'}</span>
                            </Grid>
                        </Detail>
                    </InfoList>
                    <InfoList>
                        <Detail>
                            <Grid>
                                <span>Dogs: </span>
                                <span>{details.pet_policy.dogs ? 'Allowed' : 'No'}</span>
                            </Grid>
                        </Detail>
                        <Detail>
                            <Grid>
                                <span>Cats: </span>
                                <span>{details.pet_policy.cats ? 'Allowed' : 'No'}</span>
                            </Grid>
                        </Detail>
                        <Detail>
                            <Grid>
                                <span>Utilities: </span>
                                <span>{details.utilities || 'Contact Agent'}</span>
                            </Grid>
                        </Detail>

                    </InfoList>
                </BigGrid>
            </InfoContainer>
            <InfoContainer>
                <ContactForm />
            </InfoContainer>
        </WrapperDiv>
    )
}

const WrapperDiv = styled(Wrapper)`
    overflow-y: auto;
`

const FlexHeader = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;

    & > h1 {
        font-size: 1.5rem;
    }

    & > span {
        font-size: 1.1rem;
        cursor: pointer;
    }
`

const InfoContainer = styled.div`
    border-top: 2px solid rgba(0,0,0,.3);
    width: 100%;
    position: relative;
    padding: 1rem;
`

const InfoList = styled.ul`
    width: 100%;
    list-style: none;
    padding: 0;
    margin: 0;
    line-height: 1.5;
    text-align: left;
`
const Subheading = styled.h2`
    font-size: 1.3rem;
`
const Flex = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: baseline;
`

const BigGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 5px;
    text-align: left;
    @media(min-width: 768px) {
        grid-template-columns: 1fr 1fr;
    }
`

const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5px;
    text-align: left;
`

const Detail = styled.li`
    font-size: 1.1rem;
    line-height: 1.3;
    text-transform: capitalize;
`


export default PropertyDetails

