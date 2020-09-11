import React, {useContext, useEffect, useState} from 'react'

import PropertyList from '../components/properties/PropertyList'
import PropertyModal from '../components/properties/PropertyModal'
import { Wrapper } from '../components/styledLib'
import {AuthContext} from '../context/AuthContext'
import {PropertyContext} from '../context/PropertyContext'

const ManageListings = () => {
    const authContext = useContext(AuthContext);
    const { modalOpen, toggleModal, listings, setListings } = useContext(PropertyContext);
    const [ errorMsg, setErrorMsg ] = useState(null);

    useEffect(() => {
        let isMounted = true;
        const fetchProperties = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/properties/${authContext.user.userId}/listings`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authContext.user.token}`
                    }
                });
                if (response.status !== 200) throw new Error('Could not retrieve listings.  Try again later.');
                const properties = await response.json();
                if (properties.length < 1) throw new Error('No listings found.  Create a property listing.');
                if (isMounted) setListings(properties);
            } catch(err) {
                return setErrorMsg(err.message);
            }
        };
        fetchProperties();  
        return () => isMounted = false; //cleanup - prevents setListings if component isn't mounted
    }, [listings]);

    //need to pass down setListings as 'setProperties' to enable live removal of Cards on 'delete'
    return (
        <>
        <Wrapper>
            <PropertyList 
                title="listings"
                properties={listings} 
                setProperties={setListings} 
                errorMsg={errorMsg} 
            />
        </Wrapper>
        {modalOpen && <PropertyModal toggleModal={toggleModal}/>}
        </>
    )
}

export default ManageListings
