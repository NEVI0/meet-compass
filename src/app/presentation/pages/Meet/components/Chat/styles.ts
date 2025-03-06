import styled, { css } from 'styled-components';

export const Container = styled.div<{ active: boolean }>`
    position: fixed;
    top: 0;
    right: ${props => (props.active ? '0' : '-100vw')};
    bottom: 0;
    z-index: 5;

    transition: 0.3s;

    > aside {
        display: flex;
        flex-direction: column;

        width: 100vw;
        height: 100%;

        background-color: ${props => props.theme.colors.body};

        ${props =>
            props.active &&
            css`
                box-shadow: -2px 0 50px rgba(0, 0, 0, 0.25);
            `};

        > header {
            display: flex;
            align-items: center;
            justify-content: space-between;

            padding: 0 1rem;
            height: calc(${props => props.theme.layout.headerHeight} - 12px);
            border-bottom: 1px solid ${props => props.theme.colors.container};
        }

        > div {
            flex: 1;

            display: flex;
            flex-direction: column;
            overflow-y: auto;

            padding: 1.5rem;
            gap: 1rem;

            > span {
                text-align: center;
                color: ${props => props.theme.colors.text.light};
            }
        }

        > footer {
            padding: 0.5rem 1rem;
            height: calc(${props => props.theme.layout.footerHeight} - 12px);
            border-top: 1px solid ${props => props.theme.colors.container};

            > form {
                width: 100%;
                height: 100%;

                display: flex;
                align-items: center;
                gap: 1.5rem;

                > button {
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    border: none;
                    outline: none;
                    background-color: transparent;

                    > svg {
                        fill: ${props => props.theme.colors.primary};
                        font-size: ${props => props.theme.typography.size.icon};
                    }
                }

                > input {
                    flex: 1;
                    height: 100%;
                    border: none;
                    outline: none;
                    background-color: transparent;
                    color: ${props => props.theme.colors.text.main};
                }
            }
        }
    }

    @media screen and (min-width: 767px) {
        right: ${props => (props.active ? '0' : '-450px')};

        > aside {
            width: 450px;

            > header {
                padding: 0 1.5rem;
                height: ${props => props.theme.layout.headerHeight};
            }

            > div {
                padding: 1.5rem;
                gap: 1.5rem;
            }

            > footer {
                padding: 0.5rem 1.5rem;
                height: ${props => props.theme.layout.footerHeight};
            }
        }
    }
`;
