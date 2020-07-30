import React, {useState} from 'react'

const SearchContext = React.createContext();

const SearchContextProvider = props => {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <SearchContext.Provider value={{searchQuery, setSearchQuery}} >
            {props.children}
        </SearchContext.Provider>
    )
}

export {SearchContextProvider, SearchContext};