import React, {useContext, useState} from 'react'
import styled from 'styled-components'

import {useForm} from '../../hooks/useForm'
import FormInput from '../formElements/FormInput'
import FormButton from '../formElements/FormButton'
import FormTextArea from '../formElements/FormTextArea'
import FormDatePicker from '../formElements/FormDatePicker'
import Card from '../shared/Card'
import {PropertyContext} from '../../context/PropertyContext'
import {convertDateToMMDDYYYY} from '../../helpers'
import {devices} from '../shared/styledLib'

const validateForm = values => {
    let errors = {}
    if (!values.name) errors.name = "Name required";
    if (!values.email || !/^\S+@\S+\.\S+$/.test(values.email)) {
        errors.email = "Valid email address required"
    };
    if (!values.phone || !/^\d{10}$/.test(values.phone)) {
        errors.phone = "10-digit phone number required (numbers only)"
    };
    if (!values.moveInDate) errors.moveInDate = "Move-In Date required";
    return errors;
}

const ContactForm = props => {
    const {expandedProperty} = useContext(PropertyContext); 
    const initialState = {
        name: '',
        email: '',
        moveInDate: null,
        phone: '',
        message: `I'm interested in your property at ${expandedProperty.address.street}.  Please send me more information!`
    }
    const { inputValues, setInputValues, inputErrors, handleChange, validateAndSubmit, otherErrors, setOtherErrors, resetForm } = useForm(initialState, handleSubmit, validateForm);
    const { name, email, moveInDate, phone, message } = inputValues;
    const [ success, setSuccess ] = useState(false);

    function handleDateChange(date) {
        setInputValues({
            ...inputValues,
            moveInDate: date
        })
    }

    async function handleSubmit() {
        setSuccess(false)
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/properties/inquiry`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    ...inputValues,
                    moveInDate: convertDateToMMDDYYYY(moveInDate),
                    propertyId: expandedProperty._id
                })
            });
            const data = await response.json();
            if (response.status !== 200) throw new Error(data.message);
            setSuccess(true)
        } catch(err) {
           setOtherErrors(err.message);
        } 
        resetForm();
    }

    return (
        <Card>
            <FormHeader>
                <h2>Contact Property Manager</h2>
            </FormHeader>
            <Form onSubmit={validateAndSubmit} noValidate>
                <FormInput
                    type="text"
                    id="contactName"
                    name="name"
                    labelText="Your Name:"
                    showLabel
                    placeholder="Name"
                    value={name}
                    errorMsg={inputErrors.name}
                    onChange={handleChange}
                    required
                />
                <FormInput
                    type="email"
                    id="contactEmail"
                    name="email"
                    labelText="Email Address:"
                    showLabel
                    placeholder="Email Address"
                    value={email}
                    errorMsg={inputErrors.email}
                    onChange={handleChange}
                    required
                />
                <SplitDiv>

                    <FormDatePicker
                        id="moveInDate"
                        name="moveInDate"
                        showLabel
                        stateValue={moveInDate}
                        handleChange={handleDateChange}
                        minDate={new Date()}
                        placeholderText="Select Date"
                        labelText="Move-In Date:"
                    />
                    <FormInput 
                        type="tel"
                        id="contactPhone"
                        name="phone"
                        showLabel
                        labelText="Phone Number:"
                        placeholder="Phone"
                        onChange={handleChange}
                        value={phone}
                        errorMsg={inputErrors.phone}
                    />
                </SplitDiv>
                <FormTextArea 
                    id="contactMessage"
                    name="message"
                    showLabel
                    labelText="Message:"
                    placeholder="Include a brief message with your request"
                    onChange={handleChange}
                    value={message}
                />
                <FormButton>Send Message</FormButton>
                {otherErrors && <FormError>{otherErrors}</FormError>}
                {success && <FormSuccess>Message sent!</FormSuccess>}
            </Form>
        </Card>
    )
}

export default ContactForm

const FormHeader = styled.div`
    width: 100%;
    height: 3rem;
    background-color: var(--primary-color);
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    & h2 {
        font-size: 1.1rem;
        line-height: 1.5;
        @media(min-width: ${devices.tablet}) {
            font-size: 1.5rem;
        }
    }
`

const Form = styled.form`
    width: 100%;
    padding: 1rem;
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 1rem;
`

const SplitDiv = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: .5rem;
`
const FormError = styled.div`
    text-align: center;
    padding: .5rem;
    color: red;
    font-weight: bold;
    font-size: 1rem;
    width: 100%;
`

const FormSuccess = styled(FormError)`
    color: var(--primary-color);
`