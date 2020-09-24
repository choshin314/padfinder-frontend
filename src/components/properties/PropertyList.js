import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

import {AuthContext} from '../../context/AuthContext'
import PropertyCard from './PropertyCard'

const PropertyList = ({ title, properties, setProperties, errorMsg }) => {
    const {user} = useContext(AuthContext);
    //need to pass down 'setProperties' (which is rly setListings or setFavorites) to enable live removal of Cards on 'delete'
    return (
        <Container>
            <Heading>MANAGE YOUR {title.toUpperCase()}</Heading>
            {!user && <ErrorDisplay><LoginLink><Link to="/authenticate">LOGIN to see your {title}!</Link></LoginLink></ErrorDisplay>}
            {user && !user.isLister && title === 'listings' && <ErrorDisplay>You must be logged in as a Property Manager/Agent to manage listings</ErrorDisplay>}
            {user && user.isLister && title === 'listings' && (!properties || properties.length < 1) && <ErrorDisplay>{errorMsg}</ErrorDisplay>}
            {user && title === 'favorites' && (!properties || properties.length < 1) && <ErrorDisplay>{errorMsg}</ErrorDisplay>}
            {properties.length > 0 && properties.map(property => (
                <CardWrapper key={property._id}>
                    <PropertyCard
                        property={property}
                        setProperties={setProperties}
                    />
                </CardWrapper>
            ))}
        </Container>
    )
}

export default PropertyList

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    & h1 {
        font-size: 1.5rem;
        text-align: center;
    }

    & > div {
        display: flex;
    }
    @media(min-width: )
`
const Heading = styled.h1`
    width: 100%;
    text-align: center;
    font-size: 2rem;
    font-weight: bold;
    margin: 1rem auto;
`

const CardWrapper = styled.div`
    width: 100%;
    padding: 1rem;
`

const ErrorDisplay = styled.p`
    width: 100%;
    text-align: center;
    font-size: 1rem;
    font-weight: bold;
    color: red;
`
const LoginLink = styled.span`
    & > a {
        text-decoration: none;
        color: red;
        font-size: 1.3rem;
        font-weight: 800;
        position: relative;
        cursor: pointer;
        &:hover {
            color: var(--accent);
        }
    }
    & > a::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 2px;
        background: var(--accent);
        transform: scaleX(0);
        transform-origin: left;
        transition: all 250ms ease-in;
    }

    & > a:hover::after {
        transform: scaleX(1);
    }
`