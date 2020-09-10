import React, {useState} from 'react'
import styled, {css} from 'styled-components'

import PropertyForm from './PropertyForm'
import {Wrapper} from '../styledLib'

const initialState = {
    type: "apartment",
    available_date: null,
    street: undefined,
    city: undefined,
    state: undefined,
    zip: undefined,
    rent_min: undefined,
    rent_max: undefined,
    beds_min: undefined,
    beds_max: undefined,
    baths_min: undefined,
    baths_max: undefined,
    size_min: undefined,
    size_max: undefined,
    dogs: false,
    cats: false,
    neighborhood: undefined,
    parking: undefined,
    laundry: undefined,
    utilities: undefined
}

const PropertyNew = () => {
    const [multi, setMulti] = useState(false);

    return (
        <Wrapper maxWidth="620px">
            <Container>
                <h1>Add Property Listing</h1>
                <div>
                    <Button 
                        selected={ multi ? false : true }
                        onClick={() => setMulti(false)}
                    >
                        Single Unit
                    </Button>
                    <Button 
                        selected={ multi ? true : false }
                        onClick={() => setMulti(true)}
                    >
                        Multi-Unit
                    </Button>
                </div>
                <PropertyForm 
                    multi={multi} 
                    initialState={initialState}
                    fetchConfig={{
                        url: `${process.env.REACT_APP_SERVER_URL}/api/properties/new`,
                        method: 'POST'
                    }}
                />
            </Container>
        </Wrapper>
    )
}

export default PropertyNew


const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;

    & h1 {
        font-size: 1.5rem;
        text-align: center;
    }

    & > div {
        display: flex;
    }
`

const Button = styled.button`
    position: relative;
    background-color: transparent;
    border: none;
    font-weight: bold;
    font-family: 'Roboto';
    font-size: 1.2rem;
    padding: 0.5rem 1rem;
    margin-right: 10px;
    cursor: pointer; 
    outline: none;

    ${props => props.selected && css`
        color: var(--primary-color);
        &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background-color: var(--primary-color);
        }
    `}
    &:hover {
        color: var(--primary-color);
        &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background-color: var(--primary-color);
        }
    }
`
