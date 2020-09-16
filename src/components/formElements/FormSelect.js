import React from 'react'
import styled, {css} from 'styled-components'

const FormSelect = (props) => {
    const {labelText, showLabel, id, name, value, errorMsg, placeholder, required, disabled, onChange, children} = props;
    return (
        <InputWrapper>
            <Label htmlFor={id} showLabel={showLabel} >{labelText}</Label>
            <select value={value} id={id} name={name} onChange={onChange} required={required} disabled={disabled}>
                <option value="default" disabled={disabled}>{placeholder}</option>
                {children}
            </select>
            {errorMsg && (<Error>{errorMsg}</Error>)}
        </InputWrapper>
    )
}

export default FormSelect

const InputWrapper = styled.div`
    width: 100%;
    select {
        height: 2.5rem;
        width: 100%;
        line-height: 2;
        font-family: 'Roboto';
        font-size: 1.1rem;
        padding: 0 .5rem;
        border-radius: 3px;

        & option[disabled] {
            color: grey;
        }
    }
`
const Label = styled.label`
    font-size: 1.1rem;
    display: none;
    margin-bottom: 1rem;
    ${props => props.showLabel && css` display: block;` }
`

const Error = styled.p`
    color: red;
    font-size: .8rem;
`