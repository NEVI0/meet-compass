import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 100%;
    position: fixed;
    background-color: rgba(0, 0, 0, 0.35);

    z-index: 5;

    .modal {
        padding: 2rem;
        border-radius: 2rem;

        width: 500px;

        display: flex;
        flex-direction: column;
        gap: 2rem;

        background-color: ${props => props.theme.colors.container};

        &__header {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        &__title {
            font-size: ${props => props.theme.typography.size.h2};
        }

        &__form {
            display: flex;
            flex-direction: column;
            gap: 2rem;
        }

        &__content {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        &__footer {
            > button {
                width: 100%;
            }
        }
    }
`;
