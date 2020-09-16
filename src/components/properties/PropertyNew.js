import React, {useState} from 'react'
import styled, {css} from 'styled-components'

import PropertyForm from './PropertyForm'
import {Wrapper} from '../shared/styledLib'

const initialState = {
    type: "default",
    available_date: null,
    street: '',
    city: '',
    state: "default",
    zip: '',
    rent_min: '',
    rent_max: '',
    beds_min: '',
    beds_max: '',
    baths_min: '',
    baths_max: '',
    size_min: '',
    size_max: '',
    dogs: "default",
    cats: "default",
    neighborhood: '',
    parking: "default",
    laundry: "default",
    utilities: "default"
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
