import React from 'react'
import styled from 'styled-components'

const FormButton = props => (
    <Button bg={props.bg} color={props.color} type="submit">{props.children}</Button>
)

const Button = styled.button`
    width: 100%;
    background-color: ${props => props.bg || 'var(--primary-color)'};
    color: ${props => props.color || 'white'};
    font-family: 'Roboto';
    font-size: 1.1rem;
    line-height: 2;
    border-radius: 5px;
    border: none;
    cursor: pointer;
`

export default FormButton