import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    padding: 2rem;

    width: 100%;
    height: 100%;
    position: fixed;

    z-index: 5;

    > div {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
`;

export const Participant = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 1rem;
    border-radius: 1rem;
    box-shadow: 1px 1px 20px rgba(0, 0, 0, 0.25);
    background-color: ${props => props.theme.colors.container};

    width: 400px;

    > div:nth-child(1) {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;

        > small {
            font-size: ${props => props.theme.typography.size.small};
            color: ${props => props.theme.colors.text.light};
        }
    }

    > div:nth-child(2) {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
`;
