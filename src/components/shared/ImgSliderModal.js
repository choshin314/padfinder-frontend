import React from 'react'
import styled from 'styled-components'

import Modal from '../shared/Modal'
import ImgSlider from '../shared/ImgSlider'

const ImgSliderModal = ({imgModalOpen, toggleImgModal, images, startingSlide, height}) => {
    return (
        imgModalOpen ? 
        (<Modal toggleModal={toggleImgModal}>
            <SliderContainer>
                <ImgSlider images={images} startingSlide={startingSlide} height={height}/>
            </SliderContainer>
        </Modal>)
        :
        null
    )
}

export default ImgSliderModal

const SliderContainer = styled.div`
    max-width: 600px;
    max-height: 600px;
    overflow: hidden;
`