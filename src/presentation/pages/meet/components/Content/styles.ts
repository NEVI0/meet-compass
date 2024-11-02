import styled from 'styled-components';

export const Content = styled.main`
    height: 100vh;
    overflow: hidden;

    display: flex;
    align-items: center;
    justify-content: center;

    /* padding-left: 2rem;
        padding-right: 2rem; */
    padding-top: ${props => props.theme.layout.headerHeight};
    padding-bottom: ${props => props.theme.layout.footerHeight};

    transition: 0.3s;
`;
