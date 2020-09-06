import React, {useContext, useEffect, useState} from 'react'

import PropertyList from '../components/properties/PropertyList'
import PropertyModal from '../components/properties/PropertyModal'
import { Wrapper } from '../components/styledLib'
import {AuthContext} from '../context/AuthContext'
import {PropertyModalContext} from '../context/PropertyModalContext'

const ManageListings = () => {
    const authContext = useContext(AuthContext);
    const { modalOpen, toggleModal } = useContext(PropertyModalContext);
    const [ listings, setListings ] = useState();
    const [ errorMsg, setErrorMsg ] = useState(null);

    useEffect(() => {
        let isMounted = true;
        const fetchProperties = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/properties/${authContext.user.userId}`, {
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
    }, []);

    return (
        <>
        <Wrapper>
            <PropertyList properties={listings} errorMsg={errorMsg} />
        </Wrapper>
        {modalOpen && <PropertyModal toggleModal={toggleModal}/>}
        </>
    )
}

export default ManageListings
