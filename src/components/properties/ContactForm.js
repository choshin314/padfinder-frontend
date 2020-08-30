import React, {useContext, useReducer, useState} from 'react'
import styled from 'styled-components'

import {useFormSimple} from '../../hooks/useFormSimple'
import FormInput from '../formElements/FormInput'
import FormButton from '../formElements/FormButton'
import FormTextArea from '../formElements/FormTextArea'
import FormDatePicker from '../formElements/FormDatePicker'
import Card from '../Card'
import {MapContext} from '../../context/MapContext'

const initialState = {
    name: { value: '', isValid: true, errorMsg: null },
    email: { value: '', isValid: true, errorMsg: 'Valid email address is required' },
    moveInDate: { value: null, isValid: true, errorMsg: null },
    phone: { value: '', isValid: true, errorMsg: 'Valid phone number required (numbers only)' },
    message: { value: '', isValid: true, errorMsg: null }
}

const ContactForm = props => {
    const [ formState, setFormState, handleChange, checkFormValidity, resetForm ] = useFormSimple(initialState);
    const { name, email, moveInDate, phone, message, formValid } = formState;
    const {expandedProperty} = useContext(MapContext); 
    //^^ probably gonna need this later so I can send property listing agent userID + propertyId on form submit

    function handleDateChange(date) {
        setFormState({
            ...formState,
            moveInDate: { ...formState.moveInDate, value: date }
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!checkFormValidity()) return;
        console.log('Sending to backend for email')
        resetForm();
    }

    console.log(formState)

    return (
        <Card>
            <FormHeader>
                <h2>Contact Property Manager</h2>
            </FormHeader>
            <Form onSubmit={handleSubmit}>
                <FormInput
                    type="text"
                    id="contactName"
                    name="name"
                    labelText="Name"
                    placeholder="Your Name"
                    inputState={name}
                    value={name.value}
                    onChange={handleChange}
                    required
                    formValid={formValid}
                />
                <FormInput
                    type="email"
                    id="contactEmail"
                    name="email"
                    labelText="Email"
                    placeholder="Email Address"
                    inputState={email}
                    value={email.value}
                    isValid={email.isValid}
                    errorMsg={email.errorMsg}
                    onChange={handleChange}
                    required
                    formValid={formValid}
                />
                <SplitDiv>

                    <FormDatePicker
                        id="moveInDate"
                        name="moveInDate"
                        stateValue={moveInDate.value}
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
                        inputState={phone}
                        value={phone.value}
                        isValid={phone.isValid}
                        errorMsg={phone.errorMsg}
                        formValid={formValid}
                    />
                </SplitDiv>
                <FormTextArea 
                    id="contactMessage"
                    name="message"
                    labelText="Message"
                    placeholder="Include a brief message with your request"
                    onChange={handleChange}
                    value={message.value}
                    formValid={formValid}
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
