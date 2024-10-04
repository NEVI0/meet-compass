import styled from 'styled-components';

export const Container = styled.div`
    height: 100vh;
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
        flex: 1;
        margin-top: 60px;
        padding: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: 0.3s;
    }

    .footer {
        display: flex;
        align-items: center;
        justify-content: space-between;

        padding: 0 2rem;
        height: ${props => props.theme.layout.footerHeight};
        background-color: ${props => props.theme.colors.container};
        z-index: 5;
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
