import React, {useContext, useEffect} from 'react'

import {usePropertyList} from '../hooks/usePropertyList'
import {PropertyContext} from '../context/PropertyContext'
import {scrollToTop} from '../helpers'
import PropertyList from '../components/properties/PropertyList'
import PropertyModal from '../components/properties/PropertyModal'
import { Wrapper } from '../components/shared/styledLib'
import PageNav from '../components/shared/PageNav'

const ManageListings = () => {
    const { modalOpen, toggleModal, listings, setListings } = useContext(PropertyContext);
    const { fetchPropertyList, pagination, errorMsg, loading } = usePropertyList();
    const {totalPages, currentPage, prevPage, nextPage} = pagination;

    useEffect(() => {
        fetchPropertyList('listings', 1, 10, setListings);
    }, [])

    return (
        <>
        <Wrapper>
            <PropertyList 
                title="listings"
                properties={listings} 
                setProperties={setListings} 
                errorMsg={errorMsg} 
                loading={loading}
            />
            {totalPages > 1 && (<PageNav
                currentPage={currentPage}
                nextPage={nextPage}
                prevPage={prevPage}
                totalPages={totalPages}
                handleNavPrev={() => {
                    fetchPropertyList('listings', prevPage, 10, setListings);
                    scrollToTop();
                }}
                handleNavNext={() => {
                    fetchPropertyList('listings', nextPage, 10, setListings);
                    scrollToTop();
                }}
            />)}
        </Wrapper>
        {modalOpen && <PropertyModal toggleModal={toggleModal}/>}
        </>
    )
}

export default ManageListings
