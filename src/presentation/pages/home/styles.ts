import styled from 'styled-components';

export const Containter = styled.div`
    display: flex;
    flex-direction: column-reverse;
    transition: 0.3s;

    .left {
        display: none;

        .logo {
            position: fixed;
            font-size: 60rem;
            transition: 0.3s;
            fill: ${props => props.theme.colors.primary};
        }
    }

    .home {
        min-height: 100vh;

        display: flex;
        flex-direction: column;
        justify-content: center;
        row-gap: 2.5rem;
        padding: 2rem;

        background-color: ${props => props.theme.colors.container};
        transition: 0.3s;
        overflow: auto;

        &__header {
            display: flex;
            flex-direction: column;
            row-gap: 1rem;
        }

        &__logo {
            width: 52px;
            height: 52px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 0.75rem;
            background-color: ${props => props.theme.colors.body};

            &-icon {
                font-size: 1.75rem;
                fill: ${props => props.theme.colors.primary};
            }
        }

        &__title {
            margin-bottom: 0.25rem;
            font-size: ${props => props.theme.typography.size.biggest};
        }

        &__description {
            color: ${props => props.theme.colors.text.light};
        }

        &__content {
            display: flex;
            flex-direction: column;
            row-gap: 1rem;
        }

        &__divider {
            display: flex;
            align-items: center;
            justify-content: center;
            column-gap: 1rem;
            font-size: ${props => props.theme.typography.size.smaller};
            color: ${props => props.theme.colors.text.light};
            text-transform: uppercase;

            &-line {
                height: 1px;
                width: 50px;
                border-radius: 1rem;
                background-color: ${props => props.theme.colors.text.light};
            }
        }

        &__join {
            text-align: center;
            font-size: ${props => props.theme.typography.size.small};

            > a {
                cursor: pointer;
                transition: 0.3s;
                color: ${props => props.theme.colors.primary};

                &:hover {
                    text-decoration: underline;
                    color: ${props => props.theme.colors.secondary};
                }
            }
        }
    }

    .language-switch {
        position: fixed;
        top: 1.5rem;
        right: 1.5rem;
    }

    @media screen and (min-width: 576px) {
        .home {
            padding: 3rem 6rem;
        }
    }

    @media screen and (min-width: 767px) {
        .home {
            padding: 5rem 10rem;
        }
    }

    @media screen and (min-width: 992px) {
        flex-direction: row;

        .left {
            width: 50%;
            display: block;

            .logo {
                left: -450px;
                bottom: -350px;
            }
        }

        .home {
            width: 50%;
            padding: 2rem 2.5rem;
        }
    }

    @media screen and (min-width: 1120px) {
        .home {
            padding: 2rem 4rem;
        }
    }

    @media screen and (min-width: 1490px) {
        .left .logo {
            font-size: 80rem;
            left: -550px;
            bottom: -450px;
        }

        .home {
            padding: 5rem 10rem;
        }
    }
`;
