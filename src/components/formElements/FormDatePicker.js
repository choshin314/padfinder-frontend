import React from 'react'
import styled, {css} from 'styled-components'
import DatePicker from 'react-datepicker'

import './FormDatePicker.css'
import 'react-datepicker/dist/react-datepicker.css'

const FormDatePicker = ({id, name, labelText, showLabel, stateValue, placeholderText, dispatch}) => {
    return (
        <InputWrapper>
            <Label htmlFor={id} showLabel={showLabel}>{labelText}</Label>
            <DatePicker 
                id={id}
                name={name}
                selected={stateValue} 
                onChange={date => dispatch({ type: "CHANGE_INPUT", key: name, value: date })} 
                minDate={new Date()}
                placeholderText={placeholderText}
                className="datepicker"
            />    
        </InputWrapper>
    )
}

export default FormDatePicker

const Label = styled.label`
    font-size: 1.1rem;
    display: none;
    margin-bottom: 1rem;
    ${props => props.showLabel && css` display: block;` }
`

const InputWrapper = styled.div`
    width: 100%;
`

