import React from 'react'
import styled from 'styled-components'

import Modal from '../Modal'

const ConfirmDelete = props => {
    return (
        <Modal toggleModal={props.toggleModal}>
        <Wrapper>
            <Container>
                <p>{`Are you sure you want to delete ${props.street}?`}</p>
                <BtnDiv>
                    <ModalBtn inverse onClick={props.toggleModal}>CANCEL</ModalBtn>
                    <ModalBtn onClick={props.handleConfirmDelete}>DELETE</ModalBtn>
                </BtnDiv>
            </Container>
            
        </Wrapper>
        </Modal>
    )
}

export default ConfirmDelete;

const Wrapper = styled.div`
    max-width: 300px;
    border: 3px solid red;
    border-radius: 5px;
    font-size: 1rem;
    font-weight: bold;
    color: red;
`

const Container = styled.div`
    padding: 1rem;
`

const BtnDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`

const ModalBtn = styled.button`
    font-weight: bolder;
    font-size: 1rem;
    color: ${props => props.inverse ? 'red' : 'white'};
    background: ${props => props.inverse ? 'white' : 'red'};
    padding: 1rem 2rem;
    margin: .5rem;
    border-radius: 5px;
    border: red 2px solid;
    cursor: pointer;
    &:hover {
        background: ${props => props.inverse ? 'red' : 'white'};
        color: ${props => props.inverse ? 'white' : 'red'};
    }
    &:active {
        transform: translateY(5px);
    }
`