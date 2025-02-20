import styled from 'styled-components';

export const Container = styled.footer`
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;

    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 0 2rem;
    height: ${props => props.theme.layout.footerHeight};
    background-color: ${props => props.theme.colors.container};
    /* z-index: 5; */
    transition: 0.3s;

    > section {
        display: flex;
        align-items: center;
        column-gap: 1rem;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }

    > span,
    > button {
        color: ${props => props.theme.colors.text.light};
        font-size: ${props => props.theme.typography.size.small};
    }

    > button {
        border: none;
        outline: none;
        background: none;
    }
`;
