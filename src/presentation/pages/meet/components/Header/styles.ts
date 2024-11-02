import styled from 'styled-components';

export const Container = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;

    display: flex;
    align-items: center;
    justify-content: space-between;
    height: ${props => props.theme.layout.headerHeight};

    padding: 0 2rem;
    background-color: ${props => props.theme.colors.container};
    transition: 0.3s;

    > h2 {
        font-size: ${props => props.theme.typography.size.h2};
    }

    > div {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
`;
