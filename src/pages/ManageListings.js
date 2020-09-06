import React, {useContext, useEffect, useState} from 'react'
import styled from 'styled-components'

import {AuthContext} from '../context/AuthContext'
import PropertyList from '../components/properties/PropertyList'
import { Wrapper } from '../components/styledLib'

const ManageListings = () => {
    const authContext = useContext(AuthContext);
    const [ listings, setListings ] = useState([]);
    const [ errorMsg, setErrorMsg ] = useState(null);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/properties/${authContext.user.userId}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authContext.user.token}`
                    }
                });
                if (response.status != 200) throw new Error('Could not retrieve listings.  Try again later.');
                const properties = await response.json();
                if (properties.length < 1) throw new Error('No listings found.  Create a property listing.');
                setListings(properties);
            } catch(err) {
                return setErrorMsg(err.message);
            }
        };
        fetchProperties();  
    }, [authContext.user]);

    return (
        <Wrapper>
            <PropertyList listings={listings} errorMsg={errorMsg} />
        </Wrapper>
    )
}

export default ManageListings
