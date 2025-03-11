import styled from 'styled-components';

export const Container = styled.div`
    min-height: 100vh;

    display: flex;
    flex-direction: column;

    transition: 0.3s;

    > main {
        flex: 1;

        display: flex;
        flex-direction: column;
        justify-content: center;
        row-gap: 2.5rem;
        padding: 2rem;

        transition: 0.3s;
        overflow-y: auto;

        > header {
            display: flex;
            flex-direction: column;
            row-gap: 1rem;

            > div:first-child {
                width: 52px;
                height: 52px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 0.75rem;
                background-color: ${props => props.theme.colors.body};

                > svg {
                    font-size: 1.75rem;
                    fill: ${props => props.theme.colors.primary};
                }
            }

            > div:last-child {
                display: flex;
                flex-direction: column;
                gap: 0.25rem;

                > h1 {
                    margin-bottom: 0.25rem;
                    font-size: ${props => props.theme.typography.size.biggest};
                }

                > p {
                    color: ${props => props.theme.colors.text.light};
                }
            }
        }

        > form {
            display: flex;
            flex-direction: column;
            row-gap: 2.5rem;

            > div {
                display: flex;
                flex-direction: column;
                row-gap: 1rem;
            }
        }

        > div {
            display: flex;
            align-items: center;
            justify-content: center;
            column-gap: 1rem;
            font-size: ${props => props.theme.typography.size.smaller};
            color: ${props => props.theme.colors.text.light};
            text-transform: uppercase;

            > div {
                height: 1px;
                width: 50px;
                border-radius: 1rem;
                background-color: ${props => props.theme.colors.text.light};
            }
        }

        > span {
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

    @media screen and (min-width: 576px) {
        > main {
            padding: 3rem 6rem;
        }
    }

    @media screen and (min-width: 767px) {
        > main {
            padding: 5rem 10rem;
        }
    }

    @media screen and (min-width: 992px) {
        > main {
            padding: 5rem 15rem;
        }
    }

    @media screen and (min-width: 1120px) {
        > main {
            padding: 5rem 28rem;
        }
    }

    @media screen and (min-width: 1490px) {
        > main {
            padding: 5rem 36rem;
        }
    }
`;
