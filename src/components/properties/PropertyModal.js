import React, {useContext} from 'react'
import styled from 'styled-components'

import Modal from '../shared/Modal'
import PropertyDetails from './PropertyDetails'
import PhotoGrid from '../shared/PhotoGrid'
import {PropertyContext} from '../../context/PropertyContext'
import {devices} from '../shared/styledLib'

const PropertyModal = () => {
    const {expandedProperty, toggleModal} = useContext(PropertyContext);

    return (
        <Modal toggleModal={toggleModal}>
            <Container>
                <PhotoGrid>
                    {expandedProperty && expandedProperty.photos.map(propertyImage => (
                        <div key={propertyImage.href}><img src={propertyImage.href} alt="" /></div>
                    ))}
                </PhotoGrid>
                <PropertyDetails property={expandedProperty}/>
            </Container>
        </Modal>
    )
}

export default PropertyModal

/*
1. take in props to determine which property modal to display:
    a. Non-editable (Photos on left, Details + Contact Form on right)
    b. Editable (Photos on left, Edit Form on right)

2. Editable Form:
    -Photos: checkboxes for deletion
    -Form: same as Create Listing form, except pre-filled
        -Select Photos -> Add More Photos
*/

const Container = styled.div`
    width: 100%;
    min-height: 100%;
    padding: 1rem;
    position: relative;
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 1rem;
    
    @media(min-width: ${devices.tablet}) {
        grid-template-columns: 1fr 1fr;
        height: 100%;
    }
`

