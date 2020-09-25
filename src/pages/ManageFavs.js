import React, {useContext, useEffect} from 'react'

import {usePropertyList} from '../hooks/usePropertyList'
import PropertyList from '../components/properties/PropertyList'
import PropertyModal from '../components/properties/PropertyModal'
import { Wrapper } from '../components/shared/styledLib'
import {PropertyContext} from '../context/PropertyContext'
import PageNav from '../components/shared/PageNav'

const ManageFavs = () => {
    const { modalOpen, toggleModal, favs, setFavs } = useContext(PropertyContext);
    const { fetchPropertyList, pagination, errorMsg } = usePropertyList();
    const {totalPages, currentPage, prevPage, nextPage} = pagination;

    useEffect(() => {
        fetchPropertyList('favorites', 1, 10, setFavs);
        console.log('fetched')
    }, [])

    return (
        <>
        <Wrapper>
            <PropertyList 
                title="favorites"
                properties={favs} 
                setProperties={setFavs} 
                error
                Msg={errorMsg} 
            />
            {totalPages > 1 && (<PageNav
                currentPage={currentPage}
                nextPage={nextPage}
                prevPage={prevPage}
                totalPages={totalPages}
                handleNavPrev={() => fetchPropertyList('listings', prevPage, 1, setFavs)}
                handleNavNext={() => fetchPropertyList('listings', nextPage, 1, setFavs)}
            />)}
        </Wrapper>
        {modalOpen && <PropertyModal toggleModal={toggleModal}/>}
        </>
    )
}

export default ManageFavs
