import React, {useContext} from 'react'
import {useHistory, useRouteMatch} from 'react-router-dom'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt as faTrashAltFull } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt as faTrashAltEmpty, faEye, faEdit } from '@fortawesome/free-regular-svg-icons'

import {AuthContext} from '../../context/AuthContext'
import {PropertyModalContext} from '../../context/PropertyModalContext'

const PropertyCard = props => {
    const {_id, photos, details, address, type} = props.property;
    const { rent, beds, baths, size } = details;
    const { toggleModal, propertyMethods } = useContext(PropertyModalContext); //on click, save the property in context. To be consumed by PropertyModal.
    const authContext = useContext(AuthContext);
    const history = useHistory();
    const match = useRouteMatch();

    function handleClickView() {
        toggleModal();
        propertyMethods.openProperty(props.property);
    }

    function handleClickEdit() {
        propertyMethods.openProperty(props.property);
        history.push(`${match.url}/edit/${_id}`)
    }

    async function handleClickDelete() {
        if (confirmDelete()) {
            try {
                await fetch(`${process.env.REACT_APP_SERVER_URL}/api/properties/delete/${_id}`,{
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${authContext.user.token}`
                    }
                })
                props.setProperties(prev => prev.filter(listing => listing._id !== _id))
            } catch(err) {
                console.log(err.message)
            }
        }
    }

    function confirmDelete() {
        return true;
    }

    return (
        <Container>
            <ImageDiv>
                <img src={photos[0].href} alt={address.street} />
            </ImageDiv>
            <InfoList onClick={handleClickView}>
                <Address>{address.street}, {address.city}, {address.state} {address.zip}</Address>
                <Detail>{details.neighborhood || `${type} for Rent`}</Detail>    
                {
                    rent[1] === rent[0] ? 
                    <Detail>${rent[0]}/mo</Detail> :
                    <Detail>${rent[0]}-${rent[1]}/mo</Detail>
                }
                {
                    beds[1] === beds[0] ? 
                    <Detail>{beds[0]} bd | {baths[0]} ba | {size[0]} sqft</Detail> :
                    <Detail>{beds[0]}-{beds[1]} bd | {baths[0]}-{baths[1]} ba | {size[0]}-{size[1]} sqft</Detail>
                }
            </InfoList>
            <ButtonGroup>
                <Button onClick={handleClickView}>
                    <FontAwesomeIcon fixedWidth icon={faEye} />
                    VIEW
                </Button>
                <Button onClick={handleClickEdit}>
                    <FontAwesomeIcon fixedWidth icon={faEdit} />
                    EDIT
                </Button>
                <Button onClick={handleClickDelete}>
                    <FontAwesomeIcon fixedWidth icon={faTrashAltEmpty} />
                    DELETE
                </Button>
            </ButtonGroup>
        </Container>
    )
}

export default PropertyCard


const Container = styled.div`
    width: 100%;
    height: 300px;
    display: grid;
    grid-template-rows: 2fr 1fr;
    position: relative;
    padding: 0;
    box-shadow: 0 3px 6px rgba(0,0,0,0.12), 0 3px 6px rgba(0,0,0,0.24);
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
    &:hover {
        box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    }
`

const ImageDiv = styled.div`
    width: 100%;
    overflow: hidden;
    & img {
        width: 100%;
        height: 200px;
        object-fit: cover;
        object-position: 50% 50%;
    }
` 
const InfoList = styled.ul`
    list-style: none;
    padding: 1rem;
    margin: 0;
    cursor: pointer;
`

const Flex = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: baseline;
`
const Address = styled.li`
    font-size: 1rem;
    font-weight: bold;
    text-transform: capitalize;
`

const Detail = styled.li`
    font-size: .8rem;
    line-height: 1.5;
    text-transform: capitalize;
`

const ButtonGroup = styled.div`
    position: absolute;
    top: 0;
    display: flex;
    justify-content: flex-end;
    width: 100%;
    font-size: 1rem;
    font-weight: bold;
    color: white;
`

const Button = styled.div`
    background: rgba(0,0,0,.3);
    outline: none;
    padding: .25rem .5rem;
    cursor: pointer;
    &:hover {
        background: rgba(0,0,0,.7);
    }

    &:active {
        background-color: var(--primary-color);
        box-shadow: 0 5px #666;
        transform: translateY(4px);
    }
    
    & > svg {
        margin-right: .5rem;
    }
`