import styled from 'styled-components';

export const Container = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;

    > main {
        display: flex;
        flex-direction: column;
        align-items: center;

        row-gap: 3.25rem;
        text-align: center;

        > div {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;

            > h1 {
                font-size: ${props => props.theme.typography.size.h1};
            }

            > p {
                color: ${props => props.theme.colors.text.light};
            }
        }
    }
`;
