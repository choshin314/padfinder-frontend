import React, {useState} from 'react'
import styled, {css} from 'styled-components'

import LoginForm from '../components/auth/LoginForm'
import {Wrapper} from '../components/styledLib'


const Authentication = () => {
    const [selected, setSelected] = useState("login");

    return (
        <Wrapper maxWidth="480px">
            <Container>
                <h1>Welcome to Padfinder</h1>
                <div>
                    <Button 
                        selected={ selected === "login" ? true : false }
                        onClick={() => setSelected("login")}
                    >
                        Log In
                    </Button>
                    <Button 
                        selected={ selected === "register" ? true : false }
                        onClick={() => setSelected('register')}
                    >
                        Register
                    </Button>
                </div>
                <LoginForm mode={selected}/>
            </Container>
        </Wrapper>
    )
}

export default Authentication

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