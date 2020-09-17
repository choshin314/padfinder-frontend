import React, {useState} from 'react'
import styled from 'styled-components'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faTrashAlt as faTrashEmpty } from '@fortawesome/free-regular-svg-icons'
import { faTrashAlt as faTrashFull } from '@fortawesome/free-solid-svg-icons'

const PhotoGridItem = ({href, imagesToDelete, setImagesToDelete}) => {
    const [marked, setMarked] = useState(false);

    function toggleMarkedForDeletion(href) {
        if (imagesToDelete.includes(href)) {
            const editedArr = imagesToDelete.filter(img => img !== href);
            setImagesToDelete(editedArr);
            setMarked(false);
        } else {
            setImagesToDelete([ ...imagesToDelete, href ]);
            setMarked(true);
        }
    }
    return (
        <ImgWrapper>
            <img src={href} alt="" />
            <DeleteBtn onClick={() => toggleMarkedForDeletion(href)}>
                {!marked ?
                <FontAwesomeIcon icon={faTrashEmpty} /> :
                <FontAwesomeIcon icon={faTrashFull} />
                }
            </DeleteBtn>
        </ImgWrapper>
    )
}

export default PhotoGridItem

const ImgWrapper = styled.div`
    position: relative;
`

const DeleteBtn = styled.span`
    position: absolute;
    top: 0;
    right: 0;
    color: white;
    background: rgba(0,0,0,.3);
    padding: .25rem .5rem;
    cursor: pointer;
    &:hover {
        background: rgba(0,0,0,.7);
    }
    &:active {
        background-color: var(--primary-color);
        box-shadow: 0 5px #666;
        transform: translateY(4px);
    }
`