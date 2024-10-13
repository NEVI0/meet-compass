import styled from 'styled-components';

export const Container = styled.div`
    /* max-height: 100vh; */
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;

        display: flex;
        align-items: center;
        justify-content: space-between;
        height: ${props => props.theme.layout.headerHeight};

        padding: 0 2rem;
        background-color: ${props => props.theme.colors.container};
        transition: 0.3s;

        &__title {
            font-size: ${props => props.theme.typography.size.h2};
        }

        &__time {
            letter-spacing: 4px;
            color: ${props => props.theme.colors.text.light};
            font-size: ${props => props.theme.typography.size.normal};
        }
    }

    .meet {
        height: 100vh;
        overflow: hidden;

        display: flex;
        align-items: center;
        justify-content: center;

        /* padding-left: 2rem;
        padding-right: 2rem; */
        padding-top: ${props => props.theme.layout.headerHeight};
        padding-bottom: ${props => props.theme.layout.footerHeight};

        transition: 0.3s;
    }

    .footer {
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

        &__actions {
            display: flex;
            align-items: center;
            column-gap: 1rem;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
        }

        &__info {
            color: ${props => props.theme.colors.text.light};
            font-size: ${props => props.theme.typography.size.small};
        }
    }
`;

export const LocalUserVideo = styled.aside<{ visible: boolean }>`
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
