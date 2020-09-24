import React, {useContext, useState} from 'react'
import styled from 'styled-components'

import Modal from '../shared/Modal'
import PropertyDetails from './PropertyDetails'
import PhotoGrid from '../shared/PhotoGrid'
import ImgSliderModal from '../shared/ImgSliderModal'
import {PropertyContext} from '../../context/PropertyContext'
import {devices} from '../shared/styledLib'

const PropertyModal = () => {
    const {expandedProperty, toggleModal} = useContext(PropertyContext);
    const [imgModalOpen, setImgModalOpen] = useState(false);
    const toggleImgModal = () => setImgModalOpen(!imgModalOpen);
    const [clickedImg, setClickedImg] = useState(null);

    function handlePhotoGridClick(e) {
        if (e.target.className === "grid-item") {
            setClickedImg(e.target.id)
            toggleImgModal()
        }
    }

    const imgSliderArray = expandedProperty.photos.map(photoObject => {
        return { src: photoObject.href, name: photoObject.href.split("bucket/")[1] }
    })

    return (
        <Modal toggleModal={toggleModal}>
            <Container>
                <PhotoGrid reverseStacking onClick={handlePhotoGridClick}>
                    {expandedProperty && expandedProperty.photos.map((propertyImage, index) => (
                        <div key={propertyImage.href}>
                            <img 
                                src={propertyImage.href} 
                                alt={expandedProperty.address.street} 
                                className="grid-item"
                                id={index.toString()}
                            />
                        </div>
                    ))}
                </PhotoGrid>
                <PropertyDetails property={expandedProperty}/>
            </Container>
            <ImgSliderModal
                imgModalOpen={imgModalOpen}
                toggleImgModal={toggleImgModal}
                images={imgSliderArray}
                startingSlide={parseInt(clickedImg)}
                height="600px"
            />
        </Modal>
    )
}

export default PropertyModal

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

