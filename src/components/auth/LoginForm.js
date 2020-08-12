import React, {useReducer} from 'react'
import styled from 'styled-components'

import FormInput from '../formElements/FormInput'
import FormButton from '../formElements/FormButton'
import {useForm} from '../../hooks/useForm'

const initialState = {
    email: null,
    password: null,
    isLister: false,
    firstName: null,
    lastName: null,
    phone: null,
    company: null
}

const LoginForm = ({mode}) => {

    const [state, dispatch, handleInputChange] = useForm(initialState);
    const {email, password, isLister, firstName, lastName, phone, company} = state;

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
                    body: JSON.stringify({ ...state }),
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
        handleAuthSubmit();
        dispatch({type: "RESET"});
    }

    console.log(state)

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <FormInput
                    id="email"
                    name="email"
                    labelText="Email Address"
                    type="email"
                    placeholder="Enter email address"
                    value={email || ''}
                    onChange={handleInputChange} 
                    required
                />
                <FormInput 
                    id="password" 
                    name="password"
                    labelText="Password"
                    type="password" 
                    placeholder="Enter password"
                    value={password || ''}
                    onChange={handleInputChange} 
                    required
                />
                {mode === "register" && (
                    <>
                    <Checkbox>
                        <input 
                            id="isLister" 
                            name="isLister"
                            type="checkbox" 
                            onChange={handleInputChange}
                            checked={isLister}
                        />
                        <label htmlFor="isLister">I will be listing properties for lease</label>
                    </Checkbox>
                    </>
                )}
                {isLister && mode === "register" && (
                    <ListerContainer>
                        <FormInput
                            id="firstName"
                            name="firstName"
                            labelText="First Name"
                            type="text"
                            placeholder="First Name"
                            value={firstName || ''}
                            onChange={handleInputChange}
                            required
                        />
                        <FormInput
                            id="lastName"
                            name="lastName"
                            labelText="Last Name"
                            type="text"
                            placeholder="Last Name"
                            value={lastName || ''}
                            onChange={handleInputChange}
                            required
                        />
                        <FormInput
                            id="company"
                            name="company"
                            labelText="Company Name"
                            type="text"
                            placeholder='Company Name'
                            value={company || ''}
                            onChange={handleInputChange}
                            required
                        />
                        <FormInput
                            id="phone"
                            name="phone"
                            labelText="Phone Number"
                            type="tel"
                            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                            placeholder="Phone Number"
                            value={phone || ''}
                            onChange={handleInputChange}
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