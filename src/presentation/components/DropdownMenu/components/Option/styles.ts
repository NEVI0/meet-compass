import styled from 'styled-components';

export const Container = styled.button`
    padding: 0.75rem 1rem;
    background-color: transparent;

    display: flex;
    align-items: center;
    column-gap: 0.75rem;

    color: ${props => props.theme.colors.text};
    font-size: ${props => props.theme.typography.size.normal};
    font-weight: ${props => props.theme.typography.weight.regular};

    transition: 0.5s;

    &:hover:not(&:disabled) {
        background-color: ${props => props.theme.colors.container};
    }

    &:disabled {
        cursor: no-drop;
        color: ${props => props.theme.colors.text.light};
    }
`;
