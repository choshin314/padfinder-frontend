import React from 'react'
import styled from 'styled-components'

const Card = props => <Card>{props.children}</Card>

const CardContainer = styled.div`
    width: 100%;
    position: relative;
    padding: 0;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
`

export default Card