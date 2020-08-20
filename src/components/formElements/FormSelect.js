import React from 'react'
import styled, {css} from 'styled-components'

const FormSelect = ({labelText, showLabel, id, name, onChange, children}) => (
    <InputWrapper>
        <Label htmlFor={id} showLabel={showLabel} >{labelText}</Label>
        <select id={id} name={name} onChange={onChange}>
            {children}
        </select>
    </InputWrapper>
)

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
    }
`
const Label = styled.label`
    font-size: 1.1rem;
    display: none;
    margin-bottom: 1rem;
    ${props => props.showLabel && css` display: block;` }
`
