import styled from 'styled-components';

export const Container = styled.div<{ visible: boolean }>`
    overflow: hidden;
    position: relative;

    display: ${props => (props.visible ? 'flex' : 'none')};
    align-items: center;
    justify-content: center;

    /* width: 300px;
    height: 175px; */
    /* MOBILE: width: 100px;
            height: 150px; */

    /* border-radius: 1rem; */
    /* border: 3px solid ${props => props.theme.colors.container}; */
    background-color: ${props => props.theme.colors.body};

    /* &:nth-last-child(1):nth-child(odd) {
        grid-column: span 2;
    } */

    .participant {
        position: absolute;

        left: 0.5rem;
        bottom: 0.5rem;

        display: flex;
        align-items: center;
        gap: 0.5rem;
        border-radius: 0.5rem;
        padding: 0.25rem 0.5rem;

        background-color: rgba(0, 0, 0, 0.4);

        &__name {
            color: #fff;
            font-size: ${props => props.theme.typography.size.smaller};
        }

        &__stream {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.25rem;

            > svg {
                fill: #fff;
                font-size: ${props => props.theme.typography.size.small};
            }
        }
    }

    > video {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;
