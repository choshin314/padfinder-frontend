import React from 'react'
import styled from 'styled-components'

import Map from '../components/Map/Map'

const MapViewer = props => (
    <GridContainer>
        <GridItem columns={4}>
            <Map />
        </GridItem>
        <GridItem columns={2} />
    </GridContainer>
)

const GridContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    position: absolute;
    bottom: 0;
    top: 4rem;
`

const GridItem = styled.div`
    grid-column: span ${props => props.columns};
    position: relative;
    height: 100%;
`

export default MapViewer