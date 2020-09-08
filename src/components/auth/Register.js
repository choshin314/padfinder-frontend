import React, {useContext} from 'react'
import {useHistory} from 'react-router-dom'
import styled from 'styled-components'

import FormInput from '../formElements/FormInput'
import FormButton from '../formElements/FormButton'
import {useFormSimple} from '../../hooks/useFormSimple'
import {AuthContext} from '../../context/AuthContext'

const initialState = {
    email: '',
    password: '',
    isLister: false,
    first_name: '',
    last_name: '',
    company: '',
    phone: ''
}

const validateForm = values => {
    let errors = {};
    if (!/^\S+@\S+\.\S+$/.test(values.email)) {
        errors.email = "Valid email address required"
    }
    if (values.password.length < 8) {
        errors.password = "Password must be at least 8 characters"
    }
    if (!/^\d{10}$/.test(values.phone)) {
        errors.phone = "10-digit phone number required (numbers only)"
    }
    return errors;
}

const Register = () => {

    const {formValues, formErrors, handleChange, validateAndSubmit, backendError, setBackendError, resetForm} = useFormSimple(initialState, handleAuthSubmit, validateForm)
    const authContext = useContext(AuthContext);
    let history = useHistory()

    async function handleAuthSubmit(values) {
        try {
            let response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/users/register`, {
                method: 'POST',
                body: JSON.stringify(values),
                headers: { 'Content-Type': 'application/json' }
            })
            let user = await response.json();
            if (response.status !== 201) throw new Error(user.message);
            authContext.login(user);
            resetForm();
            history.push('/');
        } catch(err) {
            return setBackendError(err.message);
        }
    }

    return (
        <Container>
            {backendError && <BackendError>{backendError}</BackendError>}
            <Form onSubmit={validateAndSubmit}>
                <FormInput
                    id="email"
                    name="email"
                    labelText="Email Address"
                    type="email"
                    placeholder="Enter email address"
                    value={formValues.email}
                    errorMsg={formErrors.email}
                    onChange={handleChange} 
                    required
                />
                <FormInput 
                    id="password" 
                    name="password"
                    labelText="Password"
                    type="password" 
                    placeholder="Enter password"
                    value={formValues.password}
                    errorMsg={formErrors.password}
                    onChange={handleChange} 
                    required
                />
                <Checkbox>
                    <input 
                        id="isLister" 
                        name="isLister"
                        type="checkbox" 
                        onChange={handleChange}
                        checked={formValues.isLister}
                    />
                    <label htmlFor="isLister">I will be listing properties for lease</label>
                </Checkbox>
                {formValues.isLister && (
                    <ListerContainer>
                        <FormInput
                            id="first_name"
                            name="first_name"
                            labelText="First Name"
                            type="text"
                            placeholder="First Name"
                            value={formValues.first_name}
                            errorMsg={formErrors.first_name}
                            onChange={handleChange}
                            required
                        />
                        <FormInput
                            id="last_name"
                            name="last_name"
                            labelText="Last Name"
                            type="text"
                            placeholder="Last Name"
                            value={formValues.last_name}
                            errorMsg={formErrors.last_name}
                            onChange={handleChange}
                            required
                        />
                        <FormInput
                            id="company"
                            name="company"
                            labelText="Company Name"
                            type="text"
                            placeholder='Company Name'
                            value={formValues.company}
                            errorMsg={formErrors.company}
                            onChange={handleChange}
                            required
                        />
                        <FormInput
                            id="phone"
                            name="phone"
                            labelText="Phone Number"
                            type="tel"
                            placeholder="Phone Number"
                            value={formValues.phone}
                            errorMsg={formErrors.phone}
                            onChange={handleChange}
                            required
                        />

                    </ListerContainer>
                )}
                <FormButton type="submit">Register</FormButton>
            </Form>
        </Container>
    )
}

export default Register

const BackendError = styled.p`
    padding: .5rem;
    color: red;
    font-weight: bold;
    font-size: 1rem;
    width: 100%;
`

const Container = styled.div`
    width: 100%;
    padding: 1rem;
    border-top: 2px solid rgba(0,0,0,.2);
    display: flex;
    flex-direction: column;
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