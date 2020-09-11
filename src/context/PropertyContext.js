import React, {useState} from 'react'

const PropertyContext = React.createContext()

function checkLocalStorage(key, defaultValue) {
    let localItem = localStorage.getItem(key);
    return ( localItem ? JSON.parse(localItem) : defaultValue );
}

const PropertyContextProvider = (props) => {
    const [expandedProperty, setExpandedProperty] = useState(checkLocalStorage('expandedProperty', null));
    const [modalOpen, setModalOpen] = useState(false);

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

    return (
        <PropertyContext.Provider value={{
            expandedProperty, 
            setExpandedProperty,
            propertyMethods,
            modalOpen,
            toggleModal
        }}>
            {props.children}
        </PropertyContext.Provider>
    )
}

export {PropertyContext, PropertyContextProvider}