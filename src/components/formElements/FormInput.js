import React from 'react'
import styled from 'styled-components'

const FormInput = (props) => {
    const {labelText, id, name, placeholder, type, value, pattern, onChange} = props;
    return (
        <InputWrapper>
            <Label htmlFor={id}>{labelText}</Label>
            <Input
                id={id}
                name={name}
                placeholder={placeholder}
                type={type}
                value={value}
                pattern={pattern}
                onChange={onChange} 
                required={props.required}
            />
        </InputWrapper>  
    )
}

export default FormInput;

const Label = styled.label`
    display: none;
`

const Input = styled.input`
    line-height: 2;
    width: 100%;
    font-family: 'Roboto';
    font-size: 1.1rem;
    padding-left: .5rem;
    border-radius: 3px;
`

const InputWrapper = styled.div`
    width: 100%;
`

