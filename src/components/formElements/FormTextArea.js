import React from 'react'
import styled from 'styled-components'

const FormTextArea = (props) => {
    const {labelText, id, name, placeholder, value, pattern, onChange} = props;
    return (
        <InputWrapper>
            <Label htmlFor={id}>{labelText}</Label>
            <TextArea
                id={id}
                name={name}
                placeholder={placeholder}
                value={value}
                pattern={pattern}
                onChange={onChange} 
                required={props.required}
            />
        </InputWrapper>  
    )
}

export default FormTextArea;

const Label = styled.label`
    display: none;
`

const TextArea = styled.textarea`
    resize: none;
    width: 100%;
    min-height: 100px;
    font-family: 'Roboto';
    font-size: 1.1rem;
    line-height: 1.3;
    padding: .5rem;
    border-radius: 3px;
`

const InputWrapper = styled.div`
    width: 100%;
`