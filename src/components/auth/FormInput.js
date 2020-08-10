import React from 'react'
import styled from 'styled-components'

const FormInput = (props) => {
    const {labelText, id, placeholder, type, value, pattern, onChange} = props;
    return (
        <label htmlFor={id}>{labelText}
            <Input
                id={id}
                placeholder={placeholder}
                type={type}
                value={value}
                pattern={pattern}
                onChange={onChange} 
                required={props.required}
            />
        </label>
    )
}

export default FormInput;

const Input = styled.input`
    line-height: 2;
    width: 100%;
    font-family: 'Roboto';
    font-size: 1.1rem;
    padding-left: .5rem;
    border-radius: 3px;
    margin-top: 0.5rem;
`

