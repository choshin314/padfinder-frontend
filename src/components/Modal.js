import React, {useState} from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faWindowClose} from '@fortawesome/free-regular-svg-icons'

import {devices} from './styledLib'

const Modal = props => {
    return (
        <ModalWrapper onClick={() => props.toggleModal()}>
            <ModalDiv onClick={(e) => e.stopPropagation()}>
                <ModalExitBtn onClick={() => props.toggleModal()}>
                    <FontAwesomeIcon icon={faWindowClose} size="2x" />
                </ModalExitBtn>    
                {props.children}
            </ModalDiv>
        </ModalWrapper>
    )
}

const ModalWrapper = styled.div`
    height: 100%;
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
    max-height: 90vh;
    height: 100%;
    padding: 1rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
    margin-left: auto;
    margin-right: auto;
    background: white;
    box-shadow: 0 0 0 rgba(0,0,0,.5);
    position: relative;
    overflow-y: auto;

    @media(min-width: ${devices.tablet}) {
        overflow-y: hidden;
        max-height: 95vh;
    }
`

const ModalExitBtn = styled.button`
    width: 3rem;
    height: 3rem;
    border: 2px solid white;
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