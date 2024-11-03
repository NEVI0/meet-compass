import styled from 'styled-components';
import * as Dropdown from '@radix-ui/react-dropdown-menu';

export const Container = styled(Dropdown.Content)`
    background-color: ${props => props.theme.colors.body};
    border-radius: 0.75rem;

    box-shadow: 2px 2px 20px rgba(0, 0, 0, 0.25);

    overflow: hidden;
    display: flex;
    flex-direction: column;
`;

export const Arrow = styled(Dropdown.Arrow)`
    fill: ${props => props.theme.colors.container};
`;
