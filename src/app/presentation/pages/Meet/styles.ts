import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    overflow: hidden;
    flex-direction: column;

    background-color: ${props => props.theme.colors.body};
`;
