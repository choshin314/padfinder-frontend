import React, {useState} from 'react'

const PropertyModalContext = React.createContext()

const PropertyModalContextProvider = (props) => {
    const [expandedProperty, setExpandedProperty] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const toggleModal = () => setModalOpen(!modalOpen);

    return (
        <PropertyModalContext.Provider value={{
            expandedProperty, 
            setExpandedProperty,
            modalOpen,
            toggleModal,
            setModalOpen
        }}>
            {props.children}
        </PropertyModalContext.Provider>
    )
}

export {PropertyModalContext, PropertyModalContextProvider}