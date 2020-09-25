import React, {useContext, useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import styled from 'styled-components'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons'
import {faHeart as farHeart} from '@fortawesome/free-regular-svg-icons'

import {usePropertyList} from '../../hooks/usePropertyList'
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
    const {fetchPropertyList} = usePropertyList();

    async function addFavorite() {
        if (!authContext.user) return toggleLoginModal(); //send to Auth page if not logged in
        try {
            await fetch(`${process.env.REACT_APP_SERVER_URL}/api/properties/favorites/${authContext.user.userId}/add/${property._id}`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${authContext.user.token}`
                }
            });
            setFavs([...favs, property]);
            setIsFavorite(true);
        } catch(err) {
            console.log(err.message);
        }
    }

    async function removeFavorite() {
        if (!authContext.user) return toggleLoginModal(); //send to Auth page if not logged in
        try {
            await fetch(`${process.env.REACT_APP_SERVER_URL}/api/properties/favorites/${authContext.user.userId}/remove/${property._id}`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${authContext.user.token}`
                }
            });
            setFavs(favs.filter(fav => fav._id !== property._id));
            setIsFavorite(false);
        } catch(err) {
            console.log(err.message);
        }
    }

    function handleClick(e) {
        e.stopPropagation();
        isFavorite ? removeFavorite() : addFavorite()
    } 

    function navigateToAuth() {
        history.push('/authenticate')
    }

    useEffect(() => {
        fetchPropertyList('favorites', 1, 100, setFavs);
    }, [isFavorite]);

    useEffect(() => {
        let foundFavorite = favs.find(f => f['_id'] === property['_id'])
        if(foundFavorite) {
            setIsFavorite(true);
        } else {
            setIsFavorite(false);
        }
    }, [favs]);

    return (
        <FavSpan onClick={handleClick} color={color}> 
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

