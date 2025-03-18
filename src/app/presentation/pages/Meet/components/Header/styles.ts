import styled from 'styled-components';

export const Container = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;

    display: flex;
    align-items: center;
    justify-content: space-between;
    height: calc(${props => props.theme.layout.headerHeight} - 12px);

    padding: 0 1rem;
    background-color: ${props => props.theme.colors.container};
    border-bottom: 1px solid ${props => props.theme.colors.others.gray};
    transition: 0.3s;

    > h2 {
        font-size: ${props => props.theme.typography.size.h2};
    }

    > div {
        display: flex;
        align-items: center;
        column-gap: 0.75rem;
    }

    @media screen and (min-width: 767px) {
        padding: 0 2rem;
        height: ${props => props.theme.layout.headerHeight};

        > div {
            column-gap: 1rem;
        }
    }
`;
