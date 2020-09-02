import React, { useEffect, useState } from 'react'

const AuthContext = React.createContext();

function checkLocalStorage(key, orValue) {
    let localItem = localStorage.getItem(key);
    return ( localItem ? JSON.parse(localItem) : orValue );
}

const AuthContextProvider = props => {
    //if it's saved in localstorage, initialize it w/ that.  Otherwise, initialize state fresh.
    const [ authState, setAuthState ] = useState({
        user: checkLocalStorage('pfUser', null)
    })
    const { user } = authState;

    //need to save user to local storage or user will be logged out on reload bc context won't persist on reload
    //only reset local storage w/ context values if we actually have new context values
    //if we don't have new user, we need to use our value saved in local storage to set context state again after a reload
    useEffect(()=> {
        if (user) {
            localStorage.setItem('pfUser', JSON.stringify(user));
        } 
    }, [user])

    return (
        <AuthContext.Provider value={{
            authState, setAuthState
        }} >
            {props.children}
        </AuthContext.Provider>
    )
}

export {AuthContextProvider, AuthContext};