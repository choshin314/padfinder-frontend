import React, {useState, useReducer} from 'react'
import styled from 'styled-components'

function reducer(state, action) {
    switch(action.type) {
        case "START_SWIPE": return { isTracking: true, startingX: action.value };
        case "RESET": return { isTracking: false, startingX: null };
    }
}

const ImgSlider = ({images, startingSlide}) => {
    let initSlide = startingSlide ? startingSlide : 0;
    const [currentSlide, setCurrentSlide] = useState(initSlide);
    const [{ isTracking, startingX }, dispatch] = useReducer(reducer, { isTracking: false, startingX: null })

    //need to apply these to both button click and swipes
    function nextSlide() {
        currentSlide < images.length - 1 ? 
        setCurrentSlide(currentSlide + 1) :
        setCurrentSlide(0)
    }

    function prevSlide() {
        currentSlide > 0 ? 
        setCurrentSlide(currentSlide - 1) :
        setCurrentSlide(images.length - 1)
    }

    function handleSwipeStart(e) {
        const initialX = e.touches[0].clientX;
        dispatch({ type: "START_SWIPE", value: initialX});
    }

    function handleSwiping(e) {
        if (!isTracking) return;
        const currentX = e.touches[0].clientX;
        let diffX = Math.abs(currentX - startingX);
        if (diffX < 50) return; //weed out tiny accidental touches
        currentX > startingX ? prevSlide() : nextSlide();
        dispatch({ type: "RESET" });
        e.preventDefault();
    }

    return (
        <SliderFrame
            onTouchStart={handleSwipeStart}
            onTouchMove={handleSwiping}
        >
            <SliderTrack currentSlide={currentSlide}>
                {images.map((image, index) =>  { 
                    return (
                        <SliderItem key={`image${index}`}>
                            <img src={image.src} />
                            <SliderItemNum>
                                <span>{`${currentSlide + 1} of ${images.length}`}</span>
                            </SliderItemNum>
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
