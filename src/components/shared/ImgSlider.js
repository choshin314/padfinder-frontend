import React, {useState, useReducer} from 'react'
import styled, {css} from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'

function reducer(state, action) {
    switch(action.type) {
        case "START_SWIPE": return { ...state, isTracking: true, startingX: action.value };
        case "NEXT_SLIDE": {
            let nextSlide = state.currentSlide < action.finalSlide ? state.currentSlide + 1 : 0;
            return { isTracking: false, startingX: null, currentSlide: nextSlide }
        };
        case "PREV_SLIDE": {
            let prevSlide = state.currentSlide > 0 ? state.currentSlide - 1 : action.finalSlide;
            return { isTracking: false, startingX: null, currentSlide: prevSlide }
        }
        case "RESET": return { isTracking: false, startingX: null };
    }
}

const ImgSlider = ({images, startingSlide}) => {
    let initSlide = startingSlide ? startingSlide : 0;
    let finalSlide = images.length - 1;
    const [{ isTracking, startingX, currentSlide }, dispatch] = useReducer(reducer, { 
        isTracking: false, 
        startingX: null,
        currentSlide: initSlide  
    })

    //need to apply these to both button click and swipes

    function handleSwipeStart(e) {
        const initialX = e.clientX;
        dispatch({ type: "START_SWIPE", value: initialX})
    }

    function handleSwiping(e) {
        if (!isTracking) return;
        const currentX = e.clientX;
        let diffX = Math.abs(currentX - startingX);
        if (diffX < 50) return;
        currentX > startingX ? dispatch({ type: "PREV_SLIDE", finalSlide }) : dispatch({ type: "NEXT_SLIDE", finalSlide });
        e.preventDefault()
    }

    return (
        <SliderFrame
            onPointerDown={handleSwipeStart}
            onPointerMove={handleSwiping}
        >
            <SliderTrack currentSlide={currentSlide}>
                {images.map((image, index) =>  { 
                    return (
                        <SliderItem key={`image${index}`}>
                            <img src={image.src} />
                            <SliderItemNum>
                                <span>{`${currentSlide + 1} of ${images.length}`}</span>
                            </SliderItemNum>
                            <SliderBtn prev onClick={() => {
                                dispatch({type: "PREV_SLIDE", finalSlide});
                            }}>
                                <FontAwesomeIcon icon={faChevronLeft} size="2x" />
                            </SliderBtn>
                            <SliderBtn onClick={() => {
                                dispatch({type: "NEXT_SLIDE", finalSlide});
                            }}>
                                <FontAwesomeIcon icon={faChevronRight} size="2x" />
                            </SliderBtn>
                        </SliderItem>    
                    )                   
                })}
            </SliderTrack>
        </SliderFrame>
    )
}

export default ImgSlider

const SliderFrame = styled.div`
    width: 100%;
    overflow-x: hidden;
`

const SliderTrack = styled.div`
    width: 100%;
    padding: 0;
    display: flex;
    transform: translateX(${props => props.currentSlide ? `-${props.currentSlide * 100}%` : '0'});
    transition: transform .2s ease-in-out;
    
`

const SliderItem = styled.div`
    width: 100%;
    flex: 1 0 100%;
    position: relative;
    & > img {
        width: 100%;
        object-fit: cover;
        pointer-events: none;
    }
`
const SliderItemNum = styled.div`
    width: 20%;
    min-width: 50px;
    position: absolute;
    top: 0;
    right: 0;
    background: rgba(0,0,0,.2);
    color: white;
    text-align: center;
    line-height: 1.5;
`

const SliderBtn = styled.button`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    ${props => props.prev ? `left: 0;` : 'right: 0;'}
    background-color: rgba(0,0,0,.3);
    color: white;
    padding: 1rem .5rem;
    outline: none;
    border: none;
`