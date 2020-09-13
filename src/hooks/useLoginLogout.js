import {useContext} from 'react'
import {AuthContext} from '../context/AuthContext'
import {MapContext} from '../context/MapContext'
import {PropertyContext} from '../context/PropertyContext'

export const useLoginLogout = () => {
    const {dispatch} = useContext(MapContext);
    const {setUser} = useContext(AuthContext);
    const {setListings, setFavs, setExpandedProperty} = useContext(PropertyContext);

    function login(userData) {
        setUser(userData);
        localStorage.setItem('pfUser', JSON.stringify(userData));
    }

    function logout() {
        setUser(null);
        setListings([]);
        setFavs([]);
        setExpandedProperty(null);
        localStorage.clear();
        dispatch({type: 'RESET'})
    }

    return ({ login, logout })
}