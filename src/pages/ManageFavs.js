import React, {useContext, useEffect} from 'react'

import {usePropertyList} from '../hooks/usePropertyList'
import PropertyList from '../components/properties/PropertyList'
import PropertyModal from '../components/properties/PropertyModal'
import { Wrapper } from '../components/shared/styledLib'
import {PropertyContext} from '../context/PropertyContext'


const ManageFavs = () => {
    const { modalOpen, toggleModal, favs, setFavs } = useContext(PropertyContext);
    const { fetchPropertyList, errorMsg } = usePropertyList();

    useEffect(() => {
        fetchPropertyList('favorites', 1, 100, setFavs);
        console.log('fetched')
    }, [])

    return (
        <>
        <Wrapper>
            <PropertyList 
                title="favorites"
                properties={favs} 
                setProperties={setFavs} 
                errorMsg={errorMsg} 
            />
        </Wrapper>
        {modalOpen && <PropertyModal toggleModal={toggleModal}/>}
        </>
    )
}

export default ManageFavs
