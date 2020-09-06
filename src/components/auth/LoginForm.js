import React, {useContext} from 'react'
import {useHistory} from 'react-router-dom'
import styled from 'styled-components'

import FormInput from '../formElements/FormInput'
import FormButton from '../formElements/FormButton'
import {useFormSimple} from '../../hooks/useFormSimple'
import {AuthContext} from '../../context/AuthContext'

const initialState = {
    email: { value: '', isValid: true, errorMsg: 'Valid email address is required' },
    password: { value: '', isValid: true, errorMsg: 'Password requires 8 or more characters' },
    isLister: { value: false, isValid: true, errorMsg: null },
    first_name: { value: '', isValid: true, errorMsg: null },
    last_name: { value: '', isValid: true, errorMsg: null },
    phone: { value: '', isValid: true, errorMsg: '10 digit number required (digits only)' },
    company: { value: '', isValid: true, errorMsg: null }
}

const LoginForm = ({mode}) => {

    const [ formState, setFormState, formErrorMsg, setFormErrorMsg, handleChange, checkFormValidity, resetForm ] = useFormSimple(initialState);
    const { email, password, isLister, first_name, last_name, phone, company, formValid } = formState;
    const authContext = useContext(AuthContext);
    let history = useHistory()

    const handleAuthSubmit = async () => {
        if (mode === "login") {
            try {
                let response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/users/login`, {
                    method: 'POST',
                    body: JSON.stringify({ email: email.value, password: password.value }),
                    headers: { 'Content-Type': 'application/json' }
                });
                let user = await response.json();
                if (response.status !== 200) throw new Error(user.message); 
                authContext.login(user);
                resetForm();
                history.push('/');
            } catch(err) {
                setFormErrorMsg(err.message);
                console.log(err);
                return;
            }
        } else if (mode === "register") {
            try {
                let response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/users/register`, {
                    method: 'POST',
                    body: JSON.stringify({ 
                        email: email.value,
                        password: password.value,
                        isLister: isLister.value,
                        first_name: first_name.value,
                        last_name: last_name.value,
                        phone: phone.value,
                        company: company.value
                     }),
                    headers: { 'Content-Type': 'application/json' }
                })
                let user = await response.json();
                if (response.status !== 201) throw new Error(user.message);
                authContext.login(user);
                resetForm();
                history.push('/');
            } catch(err) {
                setFormErrorMsg(err.message);
                console.log(err);
                return;
            }
        } 
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormErrorMsg(null);
        if (mode === 'register' && !checkFormValidity()) return;  //calls checkFormValidity ONLY if registering, and stops before submitting to backend.  Also shows validation errors.
        //don't care or don't want to validate or show validation errors for logging in (i.e. don't want to give correct password format to a potential bad actor)
        await handleAuthSubmit();
    }

    return (
        <Container>
            {formErrorMsg && <FormError>{formErrorMsg}</FormError>}
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
                            id="first_name"
                            name="first_name"
                            labelText="First Name"
                            type="text"
                            placeholder="First Name"
                            value={first_name.value}
                            onChange={handleChange}
                            required
                        />
                        <FormInput
                            id="last_name"
                            name="last_name"
                            labelText="Last Name"
                            type="text"
                            placeholder="Last Name"
                            value={last_name.value}
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

const FormError = styled.p`
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