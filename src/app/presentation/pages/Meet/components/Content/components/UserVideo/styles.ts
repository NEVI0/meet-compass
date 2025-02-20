import styled from 'styled-components';

export const Container = styled.aside<{ visible: boolean }>`
    overflow: hidden;
    position: fixed;
    right: 1rem;
    bottom: calc(${props => props.theme.layout.footerHeight} + 1rem);

    display: ${props => (props.visible ? 'flex' : 'none')};
    align-items: center;
    justify-content: center;

    width: 300px;
    height: 175px;
    /* MOBILE: width: 100px;
            height: 150px; */

    border-radius: 1rem;
    border: 3px solid ${props => props.theme.colors.primary};
    background-color: ${props => props.theme.colors.body};
    z-index: 5;

    > video {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;
