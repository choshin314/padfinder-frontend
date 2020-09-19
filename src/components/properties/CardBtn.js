import styled from 'styled-components'

export const CardBtn = styled.div`
    background: rgba(0,0,0,.3);
    outline: none;
    padding: .5rem 1rem;
    margin: 0 .5px;
    cursor: pointer;
    & svg {
        margin-right: .5rem;
    }
    &:hover {
        background: rgba(0,0,0,.7);
    }

    &:active {
        background-color: var(--primary-color);
        box-shadow: 0 5px #666;
        transform: translateY(4px);
    }
`
