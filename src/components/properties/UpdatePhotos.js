import React from 'react'
import styled from 'styled-components'

import PhotoGrid from '../shared/PhotoGrid'

const UpdatePhotos = props => {
    const {property} = props;

    return (
        <Container>
            <FormSection>
                <h3>Mark Photos for Deletion</h3>
                <PhotoGrid>
                    {property.photos.map(propertyImage => (
                        <div key={propertyImage.href}><img src={propertyImage.href} alt="" /></div>
                    ))}
                </PhotoGrid>
            </FormSection>
        </Container>
    )
}

export default UpdatePhotos

const Container = styled.div`
    width: 100%;
    padding: 1rem;
    border: 2px solid rgba(0,0,0,.2);
    border-radius: 3px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    display: flex;
    flex-direction: column;
`

const FormSection = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 1rem;
    border-top: ${props => props.border ? '2px solid rgba(0,0,0,.2)' : 'none'};
    padding: 1rem 0;
    h3 {
        font-size: 1.3rem;
        margin: .5rem 0;
        text-align: center;
    }
`

