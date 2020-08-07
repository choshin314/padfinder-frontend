import React, {useState} from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

const Modal = props => {
    return (
        <ModalWrapper onClick={() => props.toggleModal()}>
            <ModalDiv onClick={(e) => e.stopPropagation()}>
                {props.children}
                <ModalExitBtn onClick={() => props.toggleModal()}>X</ModalExitBtn>
            </ModalDiv>
            
        </ModalWrapper>
    )
}

const ModalWrapper = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: rgba(0,0,0,.5);
    z-index: 100;
`

const ModalDiv = styled.div`
    width: 100%;
    max-width: 1244px;
    max-height: 95vh;
    padding: 1rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
    margin-left: auto;
    margin-right: auto;
    background: white;
    box-shadow: 0 0 0 rgba(0,0,0,.5);
    overflow-y: auto;
    position: relative;
`

const ModalExitBtn = styled.button`
    width: 3rem;
    height: 3rem;
    border: 2px solid white;
    position: absolute;
    right: 0;
    top: 0;
    cursor: pointer;
`

export default withRouter(Modal);