import React from 'react'
import ReactDOM from 'react-dom'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faWindowClose} from '@fortawesome/free-regular-svg-icons'

import {devices} from './styledLib'

const ModalContent = props => {
    const {toggleModal, noClick, background} = props;
    return (
        <ModalWrapper onClick={() => {
            return (noClick ? null : props.toggleModal())
        }}>
            <ModalDiv onClick={(e) => e.stopPropagation()} background={background} noClick={noClick}>
                {!noClick && (
                    <ModalExitBtn onClick={() => props.toggleModal()}>
                        <FontAwesomeIcon icon={faWindowClose}  size="lg"/>
                    </ModalExitBtn>
                )}    
                {props.children}
            </ModalDiv>
        </ModalWrapper>
    )
}

const Modal = props => {
    const modalNode = document.getElementById('modal-div');

    return ReactDOM.createPortal(
        (<ModalContent {...props} />),
        modalNode
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
    text-align: center;
`

const ModalDiv = styled.div`
    display: inline-block;
    max-width: 1244px;
    max-height: 90vh;
    margin-left: auto;
    margin-right: auto;
    top: 50%;
    transform: translateY(-50%);
    background: ${props => props.background ? props.background : 'white'};
    box-shadow: 0 0 0 rgba(0,0,0,.5);
    position: relative;
    overflow-y: auto;
    border-radius: 5px;

    @media(min-width: ${devices.tablet}) {
        max-height: 95vh;
    }
`

const ModalExitBtn = styled.button`
    padding: .5rem;
    border: none;
    background: transparent;
    position: absolute;
    right: 0;
    top: 0;
    cursor: pointer;
    z-index: 10;
    &:hover {
        background: black;
        color: white;
    }
`

export default withRouter(Modal);