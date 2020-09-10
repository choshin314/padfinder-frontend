import React from 'react'
import {useParams} from 'react-router-dom'
import PropertyUpdate from '../components/properties/PropertyUpdate'

const UpdateListing = () => {
    let {propertyId} = useParams();
    return (
        <PropertyUpdate propertyId={propertyId} />
    )
}

export default UpdateListing