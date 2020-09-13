import React, {useContext, useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import styled from 'styled-components'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons'
import {faHeart as farHeart} from '@fortawesome/free-regular-svg-icons'

import {useToggle} from '../../hooks/useToggle'
import {AuthContext} from '../../context/AuthContext'
import {PropertyContext} from '../../context/PropertyContext'
import AlertModal from '../shared/AlertModal'

const FavoriteOption = ({property, color}) => {
    const [isFavorite, setIsFavorite] = useState();
    const [ showLoginModal, toggleLoginModal ] = useToggle();
    const {favs, setFavs} = useContext(PropertyContext);
    const authContext = useContext(AuthContext);
    const history = useHistory();

    async function addFavorite() {
        if (!authContext.user) return toggleLoginModal(); //send to Auth page if not logged in
        await fetch(`${process.env.REACT_APP_SERVER_URL}/api/properties/${authContext.user.userId}/favorites/add/${property._id}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${authContext.user.token}`
            }
        });
        setIsFavorite(true);
    }



    const navigateToAuth = () => history.push('/authenticate');

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
                console.log(err.message);
            }
        };
        fetchProperties();  
        return () => isMounted = false; //cleanup - prevents setListings if component isn't mounted
    }, []);

    useEffect(() => {
        console.log(favs);
        console.log(property);
        let x = favs.find(f => f['_id'] === property['_id'])
        console.log(x)
        if(x) {
            setIsFavorite(true);
        } else {
            setIsFavorite(false);
        }
    }, [favs]);

    // function deleteFavorite() {
    //     console.log(propertyId);
    //     toggleIsFavorite()
    // }

    // function saveFavorite() {
    //     console.log('Saving favorite');
    //     toggleIsFavorite()
    // }

    // function handleFavorite() {
    //     isFavorite ? deleteFavorite() : saveFavorite()
    // }

    // async function deleteProperty() {
    //     try {
    //         await fetch(`${process.env.REACT_APP_SERVER_URL}/api/properties/delete/${_id}`,{
    //             method: 'DELETE',
    //             headers: {
    //                 Authorization: `Bearer ${authContext.user.token}`
    //             }
    //         })
    //         props.setProperties(prev => prev.filter(listing => listing._id !== _id))
    //     } catch(err) {
    //         console.log(err.message)
    //     }
    //     setDeletionConfirmed(false);
    // }

    return (
        <FavSpan onClick={addFavorite} color={color}> 
            {isFavorite ? <FontAwesomeIcon icon={fasHeart} /> : <FontAwesomeIcon icon={farHeart} />}
            {isFavorite ? 'SAVED' : 'SAVE' }
            {showLoginModal && <AlertModal 
                toggleModal={toggleLoginModal}
                message="Sign up/login required to save favorites"
                affirmText="LOGIN/SIGNUP"
                handleClick={navigateToAuth}
            />}
        </FavSpan>
    )
}

export default FavoriteOption

const FavSpan = styled.span`
    font-size: 1rem;
    cursor: pointer;
    color: ${props => props.color ? props.color : 'white'};
    & > svg {
        margin-right: .5rem;
    }
`

