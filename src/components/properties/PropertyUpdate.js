import React, {useContext} from 'react'
import styled from 'styled-components'

import PropertyForm from './PropertyForm'
import {PropertyContext} from '../../context/PropertyContext'
import {Wrapper} from '../styledLib'


const PropertyUpdate = () => {
    const {expandedProperty} = useContext(PropertyContext);
    const {type, available_date, address, details, photos} = expandedProperty;
    const multi = details.rent[1] > details.rent[0];

    const initialState = {
        type,
        available_date: new Date(available_date),
        street: address.street,
        city: address.city,
        state: address.state,
        zip: address.zip,
        rent_min: details.rent[0],
        rent_max: details.rent[1],
        beds_min: details.beds[0],
        beds_max: details.beds[1],
        baths_min: details.baths[0],
        baths_max: details.baths[1],
        size_min: details.size[0],
        size_max: details.size[1],
        dogs: details.pet_policy.dogs,
        cats: details.pet_policy.cats,
        neighborhood: details.neighborhood,
        parking: details.parking,
        laundry: details.laundry,
        utilities: details.utilities
    }

    return (
        <Wrapper maxWidth="620px">
            <Container>
                <h1>Update Property Listing</h1>
                <PropertyForm 
                    updateMode
                    multi={multi} 
                    initialState={initialState}
                    fetchConfig={{
                        url: `${process.env.REACT_APP_SERVER_URL}/api/properties/update/${expandedProperty._id}`,
                        method: 'PATCH'
                    }}
                />
            </Container>
        </Wrapper>
    )
}

export default PropertyUpdate


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