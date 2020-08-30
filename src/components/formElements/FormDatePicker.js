import React from 'react'
import styled, {css} from 'styled-components'
import DatePicker from 'react-datepicker'

import './FormDatePicker.css'
import 'react-datepicker/dist/react-datepicker.css'

const FormDatePicker = ({id, name, labelText, showLabel, stateValue, placeholderText, required, dispatch, handleChange}) => {
    return (
        <InputWrapper>
            <Label htmlFor={id} showLabel={showLabel}>{labelText}</Label>
            {dispatch ? 
                (<DatePicker 
                    id={id}
                    name={name}
                    selected={stateValue} 
                    onChange={date => dispatch({ type: "CHANGE_INPUT", key: name, value: date })} 
                    minDate={new Date()}
                    placeholderText={placeholderText}
                    className="datepicker"
                    required={required}
                />)
                :
                (<DatePicker 
                    id={id}
                    name={name}
                    selected={stateValue} 
                    onChange={date => handleChange(date)} 
                    minDate={new Date()}
                    placeholderText={placeholderText}
                    className="datepicker"
                    required={required}
                />) 
            }     
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

