import React, {useContext, useEffect, useState} from 'react'

import {usePropertyList} from '../hooks/usePropertyList'
import PropertyList from '../components/properties/PropertyList'
import PropertyModal from '../components/properties/PropertyModal'
import { Wrapper } from '../components/shared/styledLib'
import {PropertyContext} from '../context/PropertyContext'
import PageNav from '../components/shared/PageNav'

const ManageListings = () => {
    const { modalOpen, toggleModal, listings, setListings } = useContext(PropertyContext);
    const { fetchPropertyList, pagination, errorMsg } = usePropertyList();
    const {totalPages, currentPage, prevPage, nextPage} = pagination;

    useEffect(() => {
        fetchPropertyList('listings', 1, 1, setListings);
    }, [])

    return (
        <>
        <Wrapper>
            <PropertyList 
                title="listings"
                properties={listings} 
                setProperties={setListings} 
                errorMsg={errorMsg} 
            />
            <PageNav
                currentPage={currentPage}
                nextPage={nextPage}
                prevPage={prevPage}
                totalPages={totalPages}
                handleNavPrev={() => fetchPropertyList('listings', prevPage, 1, setListings)}
                handleNavNext={() => fetchPropertyList('listings', nextPage, 1, setListings)}
            />
        </Wrapper>
        {modalOpen && <PropertyModal toggleModal={toggleModal}/>}
        </>
    )
}

export default ManageListings
