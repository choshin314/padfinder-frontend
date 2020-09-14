import React, {useContext, useEffect, useState} from 'react'

import PropertyList from '../components/properties/PropertyList'
import PropertyModal from '../components/properties/PropertyModal'
import { Wrapper } from '../components/shared/styledLib'
import {AuthContext} from '../context/AuthContext'
import {PropertyContext} from '../context/PropertyContext'

const ManageFavs = () => {
    const authContext = useContext(AuthContext);
    const { modalOpen, toggleModal, favs, setFavs } = useContext(PropertyContext);
    const [ errorMsg, setErrorMsg ] = useState(null);

    useEffect(() => {
        let isMounted = true;
        const fetchProperties = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/properties/${authContext.user.userId}/favorites`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authContext.user.token}`
                    }
                });
                if (response.status !== 200) throw new Error('Could not retrieve favorites.  Try again later.');
                const properties = await response.json();
                if (properties.length < 1) throw new Error(`You haven't added any favorites.  You can add any property to your list here.`);
                if (isMounted) setFavs(properties);
            } catch(err) {
                return setErrorMsg(err.message);
            }
        };
        fetchProperties();  
        return () => isMounted = false; //cleanup - prevents setListings if component isn't mounted
    }, []);

    //need to pass down setListings as 'setProperties' to enable live removal of Cards on 'delete'
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
