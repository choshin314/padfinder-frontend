import React, {useContext, useReducer, useState} from 'react'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import {useForm} from '../../hooks/useForm'
import FormInput from '../formElements/FormInput'
import FormButton from '../formElements/FormButton'
import FormTextArea from '../formElements/FormTextArea'
import Card from '../Card'
import {MapContext} from '../../context/MapContext'
import './ContactForm.css'

const initialState = {
    name: null,
    email: null,
    moveInDate: null,
    phone: null,
    message: null
}

const ContactForm = props => {
    const [state, dispatch, handleInputChange] = useForm(initialState);
    const { name, email, moveInDate, phone, message } = state;
    const {expandedProperty} = useContext(MapContext); 
    //^^ probably gonna need this later so I can send property listing agent userID + propertyId on form submit

    function handleSubmit(e) {
        e.preventDefault();
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
                    value={name}
                    onChange={handleInputChange}
                    required
                />
                <FormInput
                    type="email"
                    id="contactEmail"
                    name="email"
                    labelText="Email"
                    placeholder="Email Address"
                    value={email}
                    onChange={handleInputChange}
                    required
                />
                <SplitDiv>
                    <label htmlFor="moveInDate">
                        <DatePicker 
                            id="moveInDate"
                            name="moveInDate"
                            selected={moveInDate} 
                            onChange={date => dispatch({ type: "CHANGE_INPUT", inputName: "moveInDate", value: date })} 
                            minDate={new Date()}
                            placeholderText="Move-In Date"
                            className="datepicker"
                        />    
                    </label>
                    <FormInput 
                        type="tel"
                        id="contactPhone"
                        name="phone"
                        labelText="Phone Number"
                        placeholder="Phone Number"
                        onChange={handleInputChange}
                        value={phone}
                    />
                </SplitDiv>
                <FormTextArea 
                    id="contactMessage"
                    name="message"
                    labelText="Message"
                    placeholder={`I'd like to schedule a viewing for ${expandedProperty.address.street}, please contact me!`}
                    onChange={handleInputChange}
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
