import React, {useContext, useEffect, useState, useRef} from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

import './Map.css'
import {MapContext} from '../../context/MapContext'
import building from '../../assets/building-solid.svg'

const dummyProperties = [
    {
        address: '1557 Sanford Ave, St. Louis, MO',
        coordinates: {
            lat: 38.6224608,
            lng: -90.298468
        },
        type: 'house',
        id: 'p1',
        image: 'https://specials-images.forbesimg.com/imageserve/1026205392/960x0.jpg'
    },
    {
        address: '7355 Manchester Rd, Maplewood, MO',
        coordinates: {
            lat: 38.6140832,
            lng: -90.31923739999999
        },
        type: 'apartment',
        id: 'p2',
        image: 'https://specials-images.forbesimg.com/imageserve/1026205392/960x0.jpg'
    },
    {
        address: '6554 Manchester Rd, Maplewood, Mo',
        coordinates: {
            lat: 38.61923,
            lng: -90.30013
        },
        type: 'apartment',
        id: 'p3',
        image: 'https://specials-images.forbesimg.com/imageserve/1026205392/960x0.jpg'
    }
]

const Map = props => {
    const mapContext = useContext(MapContext);
    const mapRef = useRef(null);
    const [coordinates, setCoordinates] = useState(mapContext.coordinates)
    //map coordinates will be based on 'coordinates' state value, which is initialized w/ value from mapContext
    //on mount, map search bar will be prefilled with formatted address of previous search
    //initialize coordinates with the value received from context
    //can enter new search coordinates within the loaded Map (i.e. rewrite 'coordinates' state)

    //render map on mount and rerender map on each 'coordinates' update
    const initMap = async (coordinates) => {
        let map = new window.google.maps.Map(mapRef.current, {
            zoom: 15,
            center: coordinates
        });

        const markers = dummyProperties.map(p => {
            let icon = () => {
                return (p.type === 'apartment' ? {
                    path: "M436 480h-20V24c0-13.255-10.745-24-24-24H56C42.745 0 32 10.745 32 24v456H12c-6.627 0-12 5.373-12 12v20h448v-20c0-6.627-5.373-12-12-12zM128 76c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v40c0 6.627-5.373 12-12 12h-40c-6.627 0-12-5.373-12-12V76zm0 96c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v40c0 6.627-5.373 12-12 12h-40c-6.627 0-12-5.373-12-12v-40zm52 148h-40c-6.627 0-12-5.373-12-12v-40c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v40c0 6.627-5.373 12-12 12zm76 160h-64v-84c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v84zm64-172c0 6.627-5.373 12-12 12h-40c-6.627 0-12-5.373-12-12v-40c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v40zm0-96c0 6.627-5.373 12-12 12h-40c-6.627 0-12-5.373-12-12v-40c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v40zm0-96c0 6.627-5.373 12-12 12h-40c-6.627 0-12-5.373-12-12V76c0-6.627 5.373-12 12-12h40c6.627 0 12 5.373 12 12v40z",
                    scale: .05,
                    fillColor: 'red',
                    fillOpacity: 10,
                    strokeColor: 'red',
                    strokeWeight: 1
                } : {
                    path: "M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z",
                    scale: .05,
                    fillColor: 'red',
                    fillOpacity: 10,
                    strokeColor: 'red',
                    strokeWeight: 1
                })
            }
            const marker = new window.google.maps.Marker({
                position: p.coordinates,
                map: map,
                icon: icon()
            })

            const infowindow = new window.google.maps.InfoWindow({
                content: `
                    <div class="infowindow">
                        <h1>${p.address}</h1>
                        <a class="infolink" href="/propertydetails/${p.address.replace(/ /g,'+')}/${p.id}">
                            <img src=${p.image} />
                        </a>
                    </div>
                `,
            })

            marker.addListener('click', () => {infowindow.open(map, marker)})

            return marker;
        });
    };

    useEffect(() => {
        //need to save coordinates to local storage or it'll keep blanking out on reload
        //only reset local storage w/ new coordinates if we have new coordinates
        let localCoords = JSON.parse(localStorage.getItem('coordinates'));
        if (coordinates.lat) {
            initMap(coordinates)
            localStorage.setItem('coordinates', JSON.stringify({coordinates: coordinates}));   
        } else {
            initMap(localCoords.coordinates);
        }  
    }, [coordinates, mapContext]);


    return (
        <Div ref={mapRef} ></Div>
    )
}

const Div = styled.div`
    width: 100%;
    height: 100%;
`

export default Map