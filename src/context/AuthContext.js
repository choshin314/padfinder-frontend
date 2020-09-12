import React, { useState } from 'react'

const AuthContext = React.createContext();

function checkLocalStorage(key, defaultValue) {
    let localItem = localStorage.getItem(key);
    return ( localItem ? JSON.parse(localItem) : defaultValue );
}

const AuthContextProvider = props => {
    //if it's saved in localstorage, initialize it w/ that.  Otherwise, initialize state fresh.
    const [ user, setUser ] = useState(checkLocalStorage('pfUser', null))

    return (
        <AuthContext.Provider value={{
            user, setUser
        }} >
            {props.children}
        </AuthContext.Provider>
    )
}

export {AuthContextProvider, AuthContext};