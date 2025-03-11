import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: center;

    width: 100%;
    height: 100%;
    position: fixed;
    background-color: rgba(0, 0, 0, 0.35);
    backdrop-filter: blur(2px);

    z-index: 5;

    > div {
        padding: 2rem;
        border-radius: 2rem;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;

        width: 500px;

        display: flex;
        flex-direction: column;
        gap: 2.5rem;

        background-color: ${props => props.theme.colors.container};

        > header {
            display: flex;
            align-items: center;
            justify-content: space-between;

            > h2 {
                font-size: ${props => props.theme.typography.size.h2};
            }
        }

        > form {
            display: flex;
            flex-direction: column;
            gap: 2rem;

            > div {
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }
        }
    }

    @media screen and (min-width: 576px) {
        align-items: center;

        > div {
            border-radius: 2rem;
        }
    }
`;
