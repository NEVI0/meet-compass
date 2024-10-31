import styled from 'styled-components';

export const Container = styled.button`
    width: 36px;
    height: 36px;

    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.75rem;

    background-color: ${props => props.theme.colors.body};
    font-size: ${props => props.theme.typography.size.icon};

    > svg {
        fill: ${props => props.theme.colors.text.main};
        font-size: ${props => props.theme.typography.size.icon};
    }
`;
