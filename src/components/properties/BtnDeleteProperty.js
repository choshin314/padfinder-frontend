import React, {useContext, useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt as faTrashAltEmpty } from '@fortawesome/free-regular-svg-icons'

import {AuthContext} from '../../context/AuthContext'
import {PropertyContext} from '../../context/PropertyContext'
import {useToggle} from '../../hooks/useToggle'
import AlertModal from '../shared/AlertModal'
import { CardBtn } from './CardBtn'

const BtnDeleteProperty = ({property}) => {
    const location = useLocation();
    const { address, _id } = property;
    const [ showDeletionModal, toggleDeletionModal ] = useToggle();
    const [ deletionConfirmed, setDeletionConfirmed ] = useState(false);
    const { listings, setListings } = useContext(PropertyContext); //on click, save the property in context. To be consumed by PropertyModal.
    const authContext = useContext(AuthContext);
    
    function handleClickDelete(e) {
        e.stopPropagation();
        toggleDeletionModal();
    }

    function handleConfirmDelete() {
        toggleDeletionModal();
        setDeletionConfirmed(true);
    }

    async function deleteProperty() {
        try {
            await fetch(`${process.env.REACT_APP_SERVER_URL}/api/properties/delete/${_id}`,{
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${authContext.user.token}`
                }
            })
            setListings(listings.filter(listing => listing._id !== _id))
        } catch(err) {
            console.log(err.message)
        }
        setDeletionConfirmed(false);
    }

    useEffect(() => {
        if (deletionConfirmed) deleteProperty();
    }, [deletionConfirmed])

    return (location.pathname === '/listings' && authContext.user && (authContext.user.userId === property.creator)) ? (
        <>
            <CardBtn onClick={handleClickDelete}>
                <FontAwesomeIcon fixedWidth icon={faTrashAltEmpty} />
                <span>DELETE</span>
            </CardBtn>
            {showDeletionModal && <AlertModal 
                toggleModal={toggleDeletionModal} 
                message={`Are you sure you want to delete ${address.street}?`} 
                affirmText="DELETE"
                handleClick={handleConfirmDelete}
            />}    
        </>
    ) : null
}

export default BtnDeleteProperty

/*Deletion is a multi-step process:
        1) Click 'Delete' button triggers 'handleClickDelete' -> Opens deletion confirmation modal (ConfirmDelete)
        2) In ConfirmDelete, we have two buttons:
            a.) Cancel -> calls 'toggleDeletionModal', which we pass down as props.  
            b.) Delete -> calls 'handleConfirmDelete', which we pass down as props
                i. Calls 'toggleDeletionModal,' closing the modal
                ii. Calls 'handleConfirmDelete', which we pass down as props
                    -This sets our state 'deletionConfirmed' to true, which triggers our effect (deletionConfirmed is a dependency of the effect)
                    -The effect calls the actual 'deleteProperty' function, i.e. the typical 'onSubmit' to the backend
    */