import React from 'react'
import styled from 'styled-components'

import ImgSlider from '../shared/ImgSlider'
import imgIcon from '../../assets/image-icon.jpg'

const ImageUpload = ({selectedImages, handleSelect, getImageArr, errorMsg}) => {
    return (
        <InputWrapper>
            <PreviewDiv>
                <h3>Upload Photos and Review</h3>
                {!selectedImages ? <PreviewDivFiller /> : <ImgSlider images={getImageArr()}/>}
            </PreviewDiv>
            <ImageUploadLabel htmlFor="image-upload" bg="black">SELECT PHOTOS</ImageUploadLabel>
            <FileInput id="image-upload" type="file" multiple accept=".png, .jpg, .jpeg" onChange={handleSelect} /> 
            {errorMsg && <InputError>{errorMsg}</InputError>}
        </InputWrapper>
    )
}

export default ImageUpload

const InputWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`

const ImageUploadLabel = styled.label`
    width: 100%;
    background-color: grey;
    color: white;
    text-align: center;
    font-family: 'Roboto';
    font-size: 1.1rem;
    line-height: 2;
    border-radius: 5px;
    border: none;
    cursor: pointer;
`

const FileInput = styled.input`
    display: none;
`
const PreviewDiv = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const PreviewDivFiller = styled.div`
    width: 100%;
    height: 300px;
    background: url(${imgIcon});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
`

const InputError = styled.p`
    padding: .5rem;
    color: red;
    font-weight: bold;
    font-size: 1rem;
    width: 100%;
`