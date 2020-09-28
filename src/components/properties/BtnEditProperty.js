import React, {useContext} from 'react'
import {useHistory} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-regular-svg-icons'

import {AuthContext} from '../../context/AuthContext'
import {PropertyContext} from '../../context/PropertyContext'
import {CardBtn} from './CardBtn'

const BtnEditProperty = ({property}) => {
    const { user } = useContext(AuthContext);
    const { propertyMethods } = useContext(PropertyContext); 
    const history = useHistory();

    function handleClickEdit(e) {
        e.stopPropagation();
        propertyMethods.selectProperty(property);
        history.push(`../listings/edit/${property._id}`)
    }

    return (user && (user.userId === property.creator)) ? (
        <CardBtn onClick={handleClickEdit}>
            <FontAwesomeIcon fixedWidth icon={faEdit} />
            <span>EDIT</span>
        </CardBtn>
    ) : null
}

export default BtnEditProperty