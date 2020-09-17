import React from 'react'
import styled from 'styled-components'

import LoadingModal from '../shared/LoadingModal'

const FormContainer = ({isSubmitting, onSubmit, children}) => {
    return (
        <Container>
            {isSubmitting && <LoadingModal />}
            <Form onSubmit={onSubmit}>
                {children}
            </Form>
        </Container>
    )
}

export default FormContainer


const Container = styled.div`
    width: 100%;
    padding: 1rem;
    border: 2px solid rgba(0,0,0,.2);
    border-radius: 3px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    display: flex;
    flex-direction: column;
`

const Form = styled.form`
    width: 100%;
`