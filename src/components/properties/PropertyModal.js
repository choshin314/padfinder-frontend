import React, {useContext} from 'react'
import styled from 'styled-components'

import Modal from '../Modal'
import PropertyDetails from './PropertyDetails'
import {MapContext} from '../../context/MapContext'
import {devices, Wrapper} from '../styledLib'

const PropertyModal = (props) => {
    const {expandedProperty, toggleModal} = useContext(MapContext);
    return (
        <Modal toggleModal={toggleModal}>
            <Container>
                <PhotoGrid>
                    <div><img src="https://specials-images.forbesimg.com/imageserve/1026205392/960x0.jpg" /></div>
                    <div><img src="https://specials-images.forbesimg.com/imageserve/1026205392/960x0.jpg" /></div>
                    <div><img src="https://specials-images.forbesimg.com/imageserve/1026205392/960x0.jpg" /></div>
                    <div><img src="https://specials-images.forbesimg.com/imageserve/1026205392/960x0.jpg" /></div>
                    <div><img src="https://specials-images.forbesimg.com/imageserve/1026205392/960x0.jpg" /></div>
                    <div><img src="https://specials-images.forbesimg.com/imageserve/1026205392/960x0.jpg" /></div>
                    <div><img src="https://specials-images.forbesimg.com/imageserve/1026205392/960x0.jpg" /></div>
                    <div><img src="https://specials-images.forbesimg.com/imageserve/1026205392/960x0.jpg" /></div>
                    <div><img src="https://specials-images.forbesimg.com/imageserve/1026205392/960x0.jpg" /></div>
                    <div><img src="https://specials-images.forbesimg.com/imageserve/1026205392/960x0.jpg" /></div>
                    <div><img src="https://specials-images.forbesimg.com/imageserve/1026205392/960x0.jpg" /></div>
                </PhotoGrid>
                <PropertyDetails property={expandedProperty}/>
            </Container>
        </Modal>
    )
}

export default PropertyModal

const Container = styled.div`
    width: 100%;
    min-height: 100%;
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
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(5, 1fr);
    grid-gap: 5px;
    margin-top: 2rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid rgba(0,0,0,0.3);
    overflow-y: auto;
    & div {
        grid-area: span 1 / span 1;

        & img {
            object-fit: contain;
            max-width: 100%;
        }
    }
    @media(min-width: ${devices.tablet}){
        margin: none;
        border: none;
    }
`//in the future, make grid-template-rows: ${photoarray.length / 2}
