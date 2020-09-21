import React, {useContext} from 'react'
import {useHistory, useRouteMatch, useLocation} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-regular-svg-icons'

import {AuthContext} from '../../context/AuthContext'
import {PropertyContext} from '../../context/PropertyContext'
import {CardBtn} from './CardBtn'

const BtnEditProperty = ({property}) => {
    const { user } = useContext(AuthContext);
    const { propertyMethods } = useContext(PropertyContext); 
    const history = useHistory();
    const match = useRouteMatch();
    const location = useLocation();

    function handleClickEdit(e) {
        e.stopPropagation();
        propertyMethods.selectProperty(property);
        history.push(`${match.url}/edit/${property._id}`)
    }

    return (location.pathname === '/listings' && user && (user.userId === property.creator)) ? (
        <CardBtn onClick={handleClickEdit}>
            <FontAwesomeIcon fixedWidth icon={faEdit} />
            <span>EDIT</span>
        </CardBtn>
    ) : null
}

export default BtnEditProperty