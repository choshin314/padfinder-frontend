import React, {useState} from 'react'

const PropertyContext = React.createContext()

function checkLocalStorage(key, defaultValue) {
    let localItem = localStorage.getItem(key);
    return ( localItem ? JSON.parse(localItem) : defaultValue );
}

const PropertyContextProvider = (props) => {
    const [expandedProperty, setExpandedProperty] = useState(checkLocalStorage('expandedProperty', null));
    const [modalOpen, setModalOpen] = useState(false);
    const [listings, setListings] = useState([]);
    const [favs, setFavs] = useState([]);

    const toggleModal = () => {
        if (modalOpen) {
            localStorage.removeItem('expandedProperty')
        }
        setModalOpen(!modalOpen);
    }

    const propertyMethods = {
        openProperty: function(property) {
            setExpandedProperty(property);
            localStorage.setItem('expandedProperty', JSON.stringify(property))
        },
        closeProperty: function(property) {
            setExpandedProperty(null);
            localStorage.removeItem('expandedProperty');
        }
    }

    function updateFavState(property, action) {
        if (action === 'add') {
            setFavs([...favs, property])
        } else {
            let updatedFavs = favs.filter(fav => fav._id !== property._id);
            setFavs(updatedFavs);
        }
    }

    return (
        <PropertyContext.Provider value={{
            expandedProperty, 
            setExpandedProperty,
            propertyMethods,
            modalOpen,
            toggleModal,
            favs,
            setFavs,
            updateFavState
        }}>
            {props.children}
        </PropertyContext.Provider>
    )
}

export {PropertyContext, PropertyContextProvider}