import styled from 'styled-components';

export const Container = styled.aside<{ visible: boolean }>`
    overflow: hidden;
    position: fixed;
    right: 1rem;
    bottom: calc(${props => props.theme.layout.footerHeight} + 1rem);

    display: ${props => (props.visible ? 'flex' : 'none')};
    align-items: center;
    justify-content: center;

    width: 100px;
    height: 150px;

    border-radius: 1rem;
    border: 3px solid ${props => props.theme.colors.others.gray};
    background-color: ${props => props.theme.colors.body};
    z-index: 5;

    transition: 0.3s;

    > video {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    @media screen and (min-width: 767px) {
        width: 300px;
        height: 175px;
    }
`;
