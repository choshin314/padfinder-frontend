import React, {useContext} from 'react'
import styled from 'styled-components'

import Modal from '../Modal'
import PropertyDetails from './PropertyDetails'
import {PropertyContext} from '../../context/PropertyContext'
import {devices} from '../styledLib'

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

const PhotoGrid = styled.div`
    grid-row-start: 2;
    display: grid;
    grid-template-columns: 1fr 1fr;

    grid-gap: 5px;
    margin-top: 2rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid rgba(0,0,0,0.3);
    overflow-y: auto;
    & div {
        grid-area: span 1 / span 1;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(0,0,0,.8);
        height: 200px;

        & img {
            object-fit: contain;
            max-width: 100%;
            max-height: 100%;
        }
    }
    @media(min-width: ${devices.tablet}){
        margin: none;
        border: none;
        grid-row-start: 1;
    }
`//in the future, make grid-template-rows: ${photoarray.length / 2}
