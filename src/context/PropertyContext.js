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
        selectProperty: async function(property) {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/properties/single?propertyId=${property._id}`);
            const refreshedProperty = await response.json();
            const selectedProperty = response.status === 200 ? refreshedProperty : property;
            setExpandedProperty(selectedProperty);
            localStorage.setItem('expandedProperty', JSON.stringify(selectedProperty))
        },
        deselectProperty: function() {
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
            listings,
            setListings,
            favs,
            setFavs,
            updateFavState
        }}>
            {props.children}
        </PropertyContext.Provider>
    )
}

export {PropertyContext, PropertyContextProvider}