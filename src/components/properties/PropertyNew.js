import React, {useState, useContext} from 'react'
import {useHistory} from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid' 
import styled, {css} from 'styled-components'

import {AuthContext} from '../../context/AuthContext'
import {useForm} from '../../hooks/useForm'
import {useImageUpload} from '../../hooks/useImageUpload'
import {capitalizeString} from '../../helpers'
import PropertyForm from './PropertyForm'
import FormContainer from '../formElements/FormContainer'
import {Wrapper} from '../shared/styledLib'

const initialState = {
    type: "default",
    available_date: null,
    street: '',
    city: '',
    state: "default",
    zip: '',
    rent_min: '',
    rent_max: '',
    beds_min: '',
    beds_max: '',
    baths_min: '',
    baths_max: '',
    size_min: '',
    size_max: '',
    dogs: "default",
    cats: "default",
    neighborhood: '',
    parking: "default",
    laundry: "default",
    utilities: "default"
}

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

const PropertyNew = () => {
    const [multi, setMulti] = useState(false);
    const {inputValues, setInputValues, inputErrors, handleChange, validateAndSubmit, isSubmitting, otherErrors, setOtherErrors } = useForm(initialState, submitForm, validateForm);
    const {
        type, available_date, street, city, state, zip, rent_min, rent_max, beds_min, beds_max, baths_min, baths_max, size_min, size_max, dogs, cats, neighborhood, parking, laundry, utilities
    } = inputValues;
    const {selectedImages, imageSelectErrors, handleImageSelect} = useImageUpload();
    const authContext = useContext(AuthContext);
    const history = useHistory();

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
        if (!authContext.user || !authContext.user.isLister) {
            return setOtherErrors('You must be logged in as a Listing Agent/Property Manager to create a listing.')
        }
        if (!selectedImages || selectedImages.length < 3) {
            return setOtherErrors('At least 3 photos are required for every listing.')
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
            selectedImages.forEach(file => formData.append('photos', file, `${uuidv4() + file.name}`));

            const response = await fetch(
                `${process.env.REACT_APP_SERVER_URL}/api/properties/new`,
                {
                    method: 'POST',
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
                <h1>Add Property Listing</h1>
                <div>
                    <Button 
                        selected={ multi ? false : true }
                        onClick={() => setMulti(false)}
                    >
                        Single Unit
                    </Button>
                    <Button 
                        selected={ multi ? true : false }
                        onClick={() => setMulti(true)}
                    >
                        Multi-Unit
                    </Button>
                </div>
                <FormContainer isSubmitting={isSubmitting} onSubmit={validateAndSubmit}>
                    <PropertyForm 
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
                </FormContainer>
            </Container>
        </Wrapper>
    )
}

export default PropertyNew


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

const Button = styled.button`
    position: relative;
    background-color: transparent;
    border: none;
    font-weight: bold;
    font-family: 'Roboto';
    font-size: 1.2rem;
    padding: 0.5rem 1rem;
    margin-right: 10px;
    cursor: pointer; 
    outline: none;

    ${props => props.selected && css`
        color: var(--primary-color);
        &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background-color: var(--primary-color);
        }
    `}
    &:hover {
        color: var(--primary-color);
        &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background-color: var(--primary-color);
        }
    }
`
