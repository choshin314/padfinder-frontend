import React, {useState, useReducer} from 'react'
import styled from 'styled-components'

import FormInput from '../formElements/FormInput'
import FormButton from '../formElements/FormButton'
import {useFormSimple} from '../../hooks/useFormSimple'

const initialState = {
    email: { value: '', isValid: true, errorMsg: 'Valid email address is required' },
    password: { value: '', isValid: true, errorMsg: 'Password requires 8 or more characters' },
    isLister: { value: false, isValid: true, errorMsg: null },
    firstName: { value: '', isValid: true, errorMsg: null },
    lastName: { value: '', isValid: true, errorMsg: null },
    phone: { value: '', isValid: true, errorMsg: '10 digit number required (digits only)' },
    company: { value: '', isValid: true, errorMsg: null }
}

const LoginForm = ({mode}) => {

    const [ formState, setFormState, handleChange, checkFormValidity, resetForm ] = useFormSimple(initialState);
    const { email, password, isLister, firstName, lastName, phone, company, formValid } = formState;

    const handleAuthSubmit = async () => {
        if (mode === "login") {
            try {
                let response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/users/login`, {
                    method: 'POST',
                    body: JSON.stringify({ email, password }),
                    headers: { 'Content-Type': 'application/json' }
                });
                let data = await response.json();
                console.log(data);
            } catch(err) {
                console.log(err);
                return;
            }
        } else if (mode === "register" && isLister) {
            try {
                let response = await fetch(`${process.env.SERVER_URL}/api/users/register`, {
                    method: 'POST',
                    body: JSON.stringify({ ...formState }),
                    headers: { 'Content-Type': 'application/json' }
                })
                let data = await response.json();
                console.log(data);
            } catch(err) {
                console.log(err);
                return;
            }
        } else if (mode === "register" && !isLister) {
            try {
                let response = await fetch(`${process.env.SERVER_URL}/api/users/register`, {
                    method: 'POST',
                    body: JSON.stringify({ email, password, isLister }),
                    headers: { 'Content-Type': 'application/json' }
                })
                let data = await response.json();
                console.log(data);
            } catch(err) {
                console.log(err);
                return;
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!checkFormValidity()) return;
        handleAuthSubmit();
        resetForm();
    }

    console.log(formState)

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <FormInput
                    id="email"
                    name="email"
                    labelText="Email Address"
                    type="email"
                    placeholder="Enter email address"
                    value={email.value}
                    inputState={email}
                    formValid={formValid}
                    onChange={handleChange} 
                    required
                />
                <FormInput 
                    id="password" 
                    name="password"
                    labelText="Password"
                    type="password" 
                    placeholder="Enter password"
                    value={password.value}
                    inputState={password}
                    formValid={formValid}
                    onChange={handleChange} 
                    required
                />
                {mode === "register" && (
                    <>
                    <Checkbox>
                        <input 
                            id="isLister" 
                            name="isLister"
                            type="checkbox" 
                            onChange={handleChange}
                            checked={isLister.value}
                        />
                        <label htmlFor="isLister">I will be listing properties for lease</label>
                    </Checkbox>
                    </>
                )}
                {isLister.value && mode === "register" && (
                    <ListerContainer>
                        <FormInput
                            id="firstName"
                            name="firstName"
                            labelText="First Name"
                            type="text"
                            placeholder="First Name"
                            value={firstName.value}
                            onChange={handleChange}
                            required
                        />
                        <FormInput
                            id="lastName"
                            name="lastName"
                            labelText="Last Name"
                            type="text"
                            placeholder="Last Name"
                            value={lastName.value}
                            onChange={handleChange}
                            required
                        />
                        <FormInput
                            id="company"
                            name="company"
                            labelText="Company Name"
                            type="text"
                            placeholder='Company Name'
                            value={company.value}
                            onChange={handleChange}
                            required
                        />
                        <FormInput
                            id="phone"
                            name="phone"
                            labelText="Phone Number"
                            type="tel"
                            placeholder="Phone Number"
                            value={phone.value}
                            inputState={phone}
                            formValid={formValid}
                            onChange={handleChange}
                            required
                        />

                    </ListerContainer>
                )}
                <FormButton type="submit">{mode === "login" ? 'Log In' : 'Register'}</FormButton>
            </Form>
        </Container>
    )
}

export default LoginForm



const Container = styled.div`
    width: 100%;
    padding: 1rem;
    border-top: 2px solid rgba(0,0,0,.2);
`
const Form = styled.form`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 1rem;
`

const ListerContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;
`

const Checkbox = styled.div`
    display: flex;
    width: 100%;
    & input {
        cursor: pointer;
        margin-right: 1rem;
    }
`