import React, {useContext, useEffect} from 'react'

import {usePropertyList} from '../hooks/usePropertyList'
import {PropertyContext} from '../context/PropertyContext'
import {scrollToTop} from '../helpers'
import PropertyList from '../components/properties/PropertyList'
import PropertyModal from '../components/properties/PropertyModal'
import { Wrapper } from '../components/shared/styledLib'
import PageNav from '../components/shared/PageNav'

const ManageFavs = () => {
    const { modalOpen, toggleModal, favs, setFavs } = useContext(PropertyContext);
    const { fetchPropertyList, pagination, errorMsg, loading } = usePropertyList();
    const {totalPages, currentPage, prevPage, nextPage} = pagination;

    useEffect(() => {
        fetchPropertyList('favorites', 1, 10, setFavs);
    }, [])

    return (
        <>
        <Wrapper>
            <PropertyList 
                title="favorites"
                properties={favs} 
                setProperties={setFavs} 
                errorMsg={errorMsg} 
                loading={loading}
            />
            {totalPages > 1 && (<PageNav
                currentPage={currentPage}
                nextPage={nextPage}
                prevPage={prevPage}
                totalPages={totalPages}
                handleNavPrev={() => {
                    fetchPropertyList('listings', prevPage, 1, setFavs)
                    scrollToTop();
                }}
                handleNavNext={() => {
                    fetchPropertyList('listings', nextPage, 1, setFavs)
                    scrollToTop();
                }}
            />)}
        </Wrapper>
        {modalOpen && <PropertyModal toggleModal={toggleModal}/>}
        </>
    )
}

export default ManageFavs
