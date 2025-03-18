import styled from 'styled-components';

export const Container = styled.footer`
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;

    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 0 1rem;
    height: calc(${props => props.theme.layout.footerHeight} - 12px);
    border-top: 1px solid ${props => props.theme.colors.others.gray};
    background-color: ${props => props.theme.colors.container};
    transition: 0.3s;

    > section {
        display: flex;
        align-items: center;
        column-gap: 0.75rem;
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

    @media screen and (min-width: 767px) {
        padding: 0 2rem;
        height: ${props => props.theme.layout.footerHeight};

        > section {
            column-gap: 1rem;
        }
    }
`;
