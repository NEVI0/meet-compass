import styled from 'styled-components';

export const Container = styled.button`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 48px;
    padding: 0 1.5rem;
    border-radius: 1rem;

    color: #fff;
    background-color: ${props => props.theme.colors.primary};
    font-weight: ${props => props.theme.typography.weight.medium};

    transition: 0.3s;

    svg {
        fill: #fff;
        font-size: ${props => props.theme.typography.size.icon};
    }

    &:hover,
    &:focus {
        background-color: ${props => props.theme.colors.secondary};
    }

    &:active:not(&:disabled) {
        transform: scale(0.98);
    }

    &:disabled {
        color: ${props => props.theme.colors.text.light};
        background-color: ${props => props.theme.colors.body};
        cursor: no-drop;
    }

    @media screen and (min-width: 767px) {
        height: 52px;
    }
`;
