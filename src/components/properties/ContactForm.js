import React, {useContext} from 'react'
import styled from 'styled-components'

import {useForm} from '../../hooks/useForm'
import FormInput from '../formElements/FormInput'
import FormButton from '../formElements/FormButton'
import FormTextArea from '../formElements/FormTextArea'
import FormDatePicker from '../formElements/FormDatePicker'
import Card from '../Card'
import {PropertyContext} from '../../context/PropertyContext'

const initialState = {
    name: '',
    email: '',
    moveInDate: null,
    phone: '',
    message: ''
}

const validateForm = values => {
    let errors = {}
    if (!/^\S+@\S+\.\S+$/.test(values.email)) {
        errors.email = "Valid email address required"
    }
    if (!/^\d{10}$/.test(values.phone)) {
        errors.phone = "10-digit phone number required (numbers only)"
    }
    return errors;
}

const ContactForm = props => {
    const { inputValues, setInputValues, inputErrors, handleChange, validateAndSubmit, otherErrors, setOtherErrors, resetForm } = useForm(initialState, submitCallback, validateForm);
    const { name, email, moveInDate, phone, message } = inputValues;
    const {expandedProperty} = useContext(PropertyContext); 
    //^^ probably gonna need this later so I can send property listing agent userID + propertyId on form submit

    function handleDateChange(date) {
        setInputValues({
            ...inputValues,
            moveInDate: date
        })
    }

    function submitCallback() {
        console.log('Sending to backend for email')
        resetForm();
    }

    return (
        <Card>
            <FormHeader>
                <h2>Contact Property Manager</h2>
            </FormHeader>
            <Form onSubmit={validateAndSubmit}>
                <FormInput
                    type="text"
                    id="contactName"
                    name="name"
                    labelText="Name"
                    placeholder="Your Name"
                    value={name}
                    errorMsg={inputErrors.name}
                    onChange={handleChange}
                    required
                />
                <FormInput
                    type="email"
                    id="contactEmail"
                    name="email"
                    labelText="Email"
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
                        stateValue={moveInDate}
                        handleChange={handleDateChange}
                        minDate={new Date()}
                        placeholderText="Move-In Date"
                        labelText="Move-In Date"
                    />
                    <FormInput 
                        type="tel"
                        id="contactPhone"
                        name="phone"
                        labelText="Phone Number"
                        placeholder="Phone"
                        onChange={handleChange}
                        value={phone}
                        errorMsg={inputErrors.phone}
                    />
                </SplitDiv>
                <FormTextArea 
                    id="contactMessage"
                    name="message"
                    labelText="Message"
                    placeholder="Include a brief message with your request"
                    onChange={handleChange}
                    value={message}
                />
                <FormButton>Send Message</FormButton>
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
        font-size: 1.5rem;
        line-height: 1.5;
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
