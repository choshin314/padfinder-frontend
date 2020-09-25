import React from "react";
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faChevronRight, faChevronLeft} from "@fortawesome/free-solid-svg-icons"

const PageNav = (props) => {
    const {prevPage, nextPage, currentPage, totalPages, handleNavPrev, handleNavNext} = props;
    return (
        <PageNavWrapper>
            <PageNavBtn onClick={handleNavPrev} show={prevPage}>
                <FontAwesomeIcon icon={faChevronLeft} />
            </PageNavBtn>
            <PageCountDisplay>
                {currentPage} of {totalPages}
            </PageCountDisplay>
            <PageNavBtn onClick={handleNavNext} show={nextPage}>
                <FontAwesomeIcon icon={faChevronRight} />
            </PageNavBtn>
        </PageNavWrapper>
    );
};

export default PageNav


const PageNavWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`
const PageNavBtn = styled.button`
    width: 50px;
    height: 25px;
    visibility: ${props => props.show ? 'visible' : 'hidden'};
    background: transparent;
    border: none;
    color: var(--dark-grey);
    font-size: 1rem;
    cursor: pointer;
`

const PageCountDisplay = styled.span`
    display: block;
`
