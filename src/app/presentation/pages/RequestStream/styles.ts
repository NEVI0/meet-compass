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
        row-gap: 2rem;
        padding: 2rem;

        transition: 0.3s;
        overflow-y: auto;

        > header > h1 {
            font-size: ${props => props.theme.typography.size.h1};
        }

        > div {
            display: flex;
            flex-direction: column;
            gap: 2rem;

            section:first-child {
                position: relative;

                display: flex;
                justify-content: center;

                width: 100%;
                height: 500px;

                border-radius: 1.5rem;
                border: 3px solid ${props => props.theme.colors.primary};
                background-color: ${props => props.theme.colors.body};

                overflow: hidden;

                > video {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                > aside {
                    position: absolute;

                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);

                    > svg {
                        fill: ${props => props.theme.colors.primary};
                        font-size: ${props => props.theme.typography.size.icon};
                    }
                }
            }

            section:last-child {
                display: flex;
                flex-direction: column;

                gap: 2rem;

                > div {
                    display: flex;
                    flex-direction: column;

                    gap: 1rem;

                    > p {
                        font-size: ${props =>
                            props.theme.typography.size.normal};
                    }

                    > ol {
                        list-style-position: inside;
                    }
                }

                > footer {
                    flex: 1;

                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;

                    gap: 1rem;
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
            padding: 5rem 20rem;
        }
    }

    @media screen and (min-width: 1490px) {
        > main {
            padding: 5rem 20rem;

            align-items: flex-start;
            justify-content: center;

            > div {
                flex-direction: row;

                section:first-child {
                    flex: 1;
                    height: 400px;
                }

                section:last-child {
                    flex: 1;
                }
            }
        }
    }
`;
