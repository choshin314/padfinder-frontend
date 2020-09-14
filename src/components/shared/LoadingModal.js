import React from 'react'
import styled from 'styled-components'

import Modal from './Modal'
import LoadingSpinner from './LoadingSpinner'

const LoadingModal = props => {
    return (
        <Modal noClick background='transparent'>
        <Wrapper>
            <LoadingSpinner />
        </Wrapper>
        </Modal>
    )
}

export default LoadingModal

const Wrapper = styled.div`
    width: 150px;
    height: 150px;
    background: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
`
