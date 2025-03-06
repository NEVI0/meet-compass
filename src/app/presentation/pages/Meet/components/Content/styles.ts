import styled from 'styled-components';

export const Content = styled.main`
    height: 100vh;
    overflow: hidden;

    display: flex;
    align-items: center;
    justify-content: center;

    padding: calc(${props => props.theme.layout.headerHeight} - 12px) 0;
    transition: 0.3s;

    @media screen and (min-width: 767px) {
        padding: ${props => props.theme.layout.headerHeight} 0;
    }
`;
