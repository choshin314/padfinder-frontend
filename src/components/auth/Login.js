import React, {useContext} from 'react'
import {useHistory} from 'react-router-dom'
import styled from 'styled-components'

import FormInput from '../formElements/FormInput'
import FormButton from '../formElements/FormButton'
import {useFormSimple} from '../../hooks/useFormSimple'
import {AuthContext} from '../../context/AuthContext'

const initialState = {
    email: '',
    password: ''
}


const Login = () => {
    const authContext = useContext(AuthContext);
    let history = useHistory()
    const {formValues, formErrors, handleChange, validateAndSubmit, backendError, setBackendError, resetForm} = useFormSimple(initialState, submitCallback)
    
    async function submitCallback(values) {
        try {
            let response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/users/login`, {
                method: 'POST',
                body: JSON.stringify(values),
                headers: { 'Content-Type': 'application/json' }
            });
            let userData = await response.json();
            if (response.status !== 200) throw new Error(userData.message); 
            authContext.login(userData);
            resetForm();
            history.push('/');
        } catch(err) {
            setBackendError(err.message)
        }
    }

    return (
        <Container>
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
                <FormButton type="submit">Log In</FormButton>
            </Form>
            {backendError && <BackendError>{backendError}</BackendError>}
        </Container>
    )
}

export default Login

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