import {useContext} from 'react'
import {AuthContext} from '../context/AuthContext'
import {MapContext} from '../context/MapContext'

export const useLoginLogout = () => {
    const {dispatch} = useContext(MapContext);
    const {setUser} = useContext(AuthContext);

    function login(userData) {
        setUser(userData);
        localStorage.setItem('pfUser', JSON.stringify(userData));
    }

    function logout() {
        setUser(null);
        localStorage.clear();
        dispatch({type: 'RESET'})
    }

    return ({ login, logout })
}