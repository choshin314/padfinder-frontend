import React from 'react'
import styled, {css} from 'styled-components'

const FormInput = (props) => {
    const {labelText, showLabel, id, name, placeholder, type, value, errorMsg, onChange, required, disabled} = props;

    return (
        <InputWrapper>
            <Label htmlFor={id} showLabel={showLabel}>{labelText}</Label>
            <Input
                id={id}
                name={name}
                placeholder={placeholder}
                type={type}
                value={value}
                onChange={onChange} 
                required={required}
                disabled={disabled}
            />
            {errorMsg && (<Error>{errorMsg}</Error>)}
        </InputWrapper>  
    )
}

export default FormInput;

const Label = styled.label`
    font-size: 1.1rem;
    display: none;
    margin-bottom: 1rem;
    text-transform: capitalize;
    ${props => props.showLabel && css` display: block;` }
`

const Input = styled.input`
    line-height: 2;
    height: 2.5rem;
    width: 100%;
    font-family: 'Roboto';
    font-size: 1.1rem;
    padding-left: .5rem;
    border-radius: 3px;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    &[type=number] {
        -moz-appearance: textfield;
    }
`

const InputWrapper = styled.div`
    width: 100%;
`

const Error = styled.p`
    color: red;
    font-size: .8rem;
`