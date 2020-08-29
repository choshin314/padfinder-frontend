import React, {useContext, useReducer, useState} from 'react'
import styled from 'styled-components'

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
    message: { value: '', isValid: true, errorMsg: null },
    isFormValid: false
}

const ContactForm = props => {
    const [ state, setState ] = useState(initialState);
    const { name, email, moveInDate, phone, message } = state;
    const {expandedProperty} = useContext(MapContext); 
    //^^ probably gonna need this later so I can send property listing agent userID + propertyId on form submit

    function validate(formfield, value) {
        switch (formfield) {
            case 'email': {
                setState({...state, isFormValid: false})
                return /^\S+@\S+\.\S+$/.test(value)
            }
            case 'phone': {
                setState({...state, isFormValid: false})
                return /^\d{10}$/.test(value)
            }
            default: {
                return true
            }
        }
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setState({
            ...state, 
            [name]: { ...state[name], value, isValid: validate(name, value) }
        })
    }

    function handleDateChange(date) {
        setState({
            ...state,
            moveInDate: { ...state.moveInDate, value: date }
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!state.email.isValid || !state.phone.isValid) {
            console.log('Invalid inputs')
        }
        const asyncSubmit = async () => {
            console.log('Some async op here') //send to backend email sending route
        }
    }

    console.log(state)

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
                    value={name.value}
                    onChange={handleChange}
                    required
                />
                <FormInput
                    type="email"
                    id="contactEmail"
                    name="email"
                    labelText="Email"
                    placeholder="Email Address"
                    value={email.value}
                    isValid={email.isValid}
                    errorMsg={email.errorMsg}
                    onChange={handleChange}
                    required
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
                        value={phone.value}
                        isValid={phone.isValid}
                        errorMsg={phone.errorMsg}
                    />
                </SplitDiv>
                <FormTextArea 
                    id="contactMessage"
                    name="message"
                    labelText="Message"
                    placeholder={`I'd like to schedule a viewing for ${expandedProperty.address.street}, please contact me!`}
                    onChange={handleChange}
                    value={message.value}
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
