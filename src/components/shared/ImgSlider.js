import React, {useState, useReducer} from 'react'
import styled from 'styled-components'

// function reducer(state, action) {
//     switch(action.type) {
//         case "NEXT_SLIDE": { 
//             return ( state.currentSlide < action.arrLength ? 
//                 { currentSlide: currentSlide + 1 } : 
//                 { currentSlide: 0 }
//             )  
//         };
//         case "PREV_SLIDE": {
//             return ( state.currentSlide > 0 ?
//                 { currentSlide: currentSlide -1 } :
//                 { currentSlide: action.arrLength - 1 }
//             )
//         }
//     }
// }

const ImgSlider = ({images}) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [startingX, setStartingX] = useState(null);
    const [isTracking, setIsTracking] = useState(false);

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

    const handleSwipeStart = (e) => {
        const initialX = e.touches[0].clientX;
        setIsTracking(true);
        setStartingX(initialX);
    }

    const handleSwiping = (e) => {
        if (!isTracking) return;

        const currentX = e.touches[0].clientX;
        let diffX = Math.abs(currentX - startingX);
        if (diffX < 50) return; //weed out tiny accidental touches
        currentX > startingX ? prevSlide() : nextSlide();
        setIsTracking(false);
        setStartingX(null);
        e.preventDefault();
    }

    return (
        <SliderFrame
            onTouchStart={handleSwipeStart}
            onTouchMove={handleSwiping}
        >
            <SliderTrack currentSlide={currentSlide}>
                {images.map((image, index) =>  { return (
                    <SliderItem key={`image${index}`}>
                        <img src={image.src} />
                    </SliderItem>    )                   
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
    & > img {
        width: 100%;
        object-fit: cover;
        pointer-events: none;
    }
`
