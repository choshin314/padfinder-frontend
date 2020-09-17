import React, {useState, useContext} from 'react'
import {useHistory} from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid' 
import styled, {css} from 'styled-components'

import {AuthContext} from '../../context/AuthContext'
import {PropertyContext} from '../../context/PropertyContext'
import {useForm} from '../../hooks/useForm'
import {useImageUpload} from '../../hooks/useImageUpload'
import {capitalizeString} from '../../helpers'
import PropertyForm from './PropertyForm'
import {Wrapper} from '../shared/styledLib'

const validateForm = values => {
    let errors = {};
    if (!/^[0-9]{5}$/.test(values.zip)) {
        errors.zip = '5-digit ZIP code required'
    }
    if (values.neighborhood && values.neighborhood.length < 4) {
        errors.neighborhood = 'Must be at least 4 characters'
    }
    if (values.state === "default") {
        errors.state = 'Must select state'
    }
    if (values.type === "default") {
        errors.type = 'Must select type'
    }
    if (values.dogs === "default") {
        errors.dogs = 'Must select dog policy'
    }
    if (values.cats === "default") {
        errors.cats = 'Must select cat policy'
    }
    if (values.parking === "default") {
        errors.parking = 'Must select parking option'
    }
    if (values.laundry === "default") {
        errors.laundry = 'Must select laundry option'
    }
    if (values.utilities === "default") {
        errors.utilities = 'Must select utilities'
    }
    return errors;
}

const PropertyUpdate = () => {
    const history = useHistory();
    const authContext = useContext(AuthContext);
    const {expandedProperty} = useContext(PropertyContext);
    const multi = expandedProperty.details.rent[1] > expandedProperty.details.rent[0];
    const initialState = {
        type: expandedProperty.type,
        available_date: new Date(expandedProperty.available_date),
        street: expandedProperty.address.street,
        city: expandedProperty.address.city,
        state: expandedProperty.address.state,
        zip: expandedProperty.address.zip,
        rent_min: expandedProperty.details.rent[0],
        rent_max: expandedProperty.details.rent[1],
        beds_min: expandedProperty.details.beds[0],
        beds_max: expandedProperty.details.beds[1],
        baths_min: expandedProperty.details.baths[0],
        baths_max: expandedProperty.details.baths[1],
        size_min: expandedProperty.details.size[0],
        size_max: expandedProperty.details.size[1],
        dogs: expandedProperty.details.pet_policy.dogs,
        cats: expandedProperty.details.pet_policy.cats,
        neighborhood: expandedProperty.details.neighborhood,
        parking: expandedProperty.details.parking,
        laundry: expandedProperty.details.laundry,
        utilities: expandedProperty.details.utilities
    }
    const {inputValues, setInputValues, inputErrors, handleChange, validateAndSubmit, isSubmitting, otherErrors, setOtherErrors, resetForm } = useForm(initialState, submitForm, validateForm);
    const {type, available_date, street, city, state, zip, rent_min, rent_max, beds_min, beds_max, baths_min, baths_max, size_min, size_max, dogs, cats, neighborhood, parking, laundry, utilities} = inputValues;
    const {selectedImages, imageSelectErrors, handleImageSelect} = useImageUpload();
    

    //rent, beds, baths, and size needs to be 2-value array even if property is single-unit
    function getMinMaxArr(min, max) {
        return (multi ? [min, max] : [min, min])
    }

    function handleDateChange(date) {
        setInputValues({
            ...inputValues,
            available_date: date
        })
    }

    async function submitForm() {
        setOtherErrors(null);
        if (!authContext.user || (authContext.user.userId !== expandedProperty.creator)) {
            return setOtherErrors('You must be logged in as the Listing Agent/Manager for this property.')
        }
        try {
            let formData = new FormData();
            formData.append('type', JSON.stringify(type));
            formData.append('available_date', JSON.stringify(available_date));
            formData.append('address', JSON.stringify({ 
                street: capitalizeString(street.trim()),
                city: capitalizeString(city.trim()),
                state,
                zip
            }));
            formData.append('details', JSON.stringify({
                rent: getMinMaxArr(rent_min, rent_max),
                beds: getMinMaxArr(beds_min, beds_max),
                baths: getMinMaxArr(baths_min, baths_max),
                size: getMinMaxArr(size_min, size_max),
                pet_policy: { dogs, cats },
                neighborhood: capitalizeString(neighborhood.trim()),
                laundry,
                utilities,
                parking
            }));
            if (selectedImages) selectedImages.forEach(file => formData.append('photos', file, `${uuidv4() + file.name}`));

            const response = await fetch(
                `${process.env.REACT_APP_SERVER_URL}/api/properties/update/${expandedProperty._id}`,
                {
                    method: 'PATCH',
                    body: formData,
                    headers: {
                        Authorization: `Bearer ${authContext.user.token}`
                    }
                }
            );
            const data = await response.json();
            if (response.status !== 201) throw new Error(data.message);
            history.push('/listings')
        } catch(err) {
            setOtherErrors(err.message);
        }
    }

    return (
        <Wrapper maxWidth="620px">
            <Container>
                <h1>Update Property Listing</h1>
                <PropertyForm 
                    updateMode
                    updateProperty={expandedProperty}
                    multi={multi} 
                    isSubmitting={isSubmitting}
                    values={{inputValues, selectedImages}}
                    errors={{inputErrors, imageSelectErrors, otherErrors}}
                    handlers={{
                        handleChange,
                        handleDateChange,
                        handleImageSelect,
                        validateAndSubmit
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