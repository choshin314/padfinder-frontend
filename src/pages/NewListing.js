import React, {useState} from 'react'

import PropertyNew from '../components/properties/PropertyNew'

const NewListing = () => {
    const [multi, setMulti] = useState(false);
    return (
        <PropertyNew />
    )
}

export default NewListing
