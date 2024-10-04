import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;

    > div {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        text-align: center;

        > h2 {
            font-size: ${props => props.theme.typography.size.h2};
        }

        > p {
            color: ${props => props.theme.colors.text.light};

            a {
                cursor: pointer;
                color: ${props => props.theme.colors.primary};
                transition: 0.3s;

                &:hover {
                    color: ${props => props.theme.colors.secondary};
                    text-decoration: underline;
                }
            }
        }
    }
`;
