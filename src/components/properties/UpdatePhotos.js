import React from 'react'
import styled from 'styled-components'

import PhotoGrid from '../shared/PhotoGrid'
import PhotoGridItem from '../shared/PhotoGridItem'
import ImageUpload from '../formElements/ImageUpload'
import FormButton from '../formElements/FormButton'


const UpdatePhotos = props => {
    const {property, selectedImages, selectErrors, selectHandler, setUpdatingPhotos, imagesToDelete, setImagesToDelete } = props;

    return (
        <Container>
            <FormSection>
                <h3>Mark Photos for Deletion</h3>
                <PhotoGrid>
                    {property.photos.map(propertyImage => (
                        <PhotoGridItem 
                            key={propertyImage.href} 
                            href={propertyImage.href} 
                            imagesToDelete={imagesToDelete}
                            setImagesToDelete={setImagesToDelete}
                        />
                    ))}
                </PhotoGrid>
            </FormSection>
            <FormSection border>
                <ImageUpload
                    selectedImages={selectedImages}
                    errorMsg={selectErrors}
                    handleSelect={selectHandler}
                />
            </FormSection>
            <FormSection border>
                <FormButton onClick={(e) => setUpdatingPhotos(false)}>GO BACK TO EDIT DETAILS</FormButton>
                <CtrText>-OR-</CtrText>
                <FormButton type="submit">SUBMIT UPDATES</FormButton>
            </FormSection>
        </Container>
    )
}

export default UpdatePhotos


const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`

const CtrText = styled.p`
    text-align: center;
    color: var(--primary-color);
    font-weight: bold;
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

