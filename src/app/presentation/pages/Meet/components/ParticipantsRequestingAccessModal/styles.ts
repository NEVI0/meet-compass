import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;

    width: 100%;
    height: 100%;
    position: fixed;

    transition: 0.3s;
    z-index: 5;

    > div {
        display: flex;
        flex-direction: column;
        align-items: flex-end;

        width: 100%;
    }

    @media screen and (min-width: 767px) {
        padding: 2rem;

        > div {
            gap: 1rem;
        }
    }
`;

export const Participant = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 1rem;
    background-color: ${props => props.theme.colors.container};

    width: 100%;
    border-bottom: 1px solid ${props => props.theme.colors.others.gray};
    transition: 0.3s;

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
        gap: 0.75rem;
    }

    @media screen and (min-width: 767px) {
        width: 400px;
        padding: 1.25rem;

        border-radius: 1rem;
        box-shadow: 1px 1px 20px rgba(0, 0, 0, 0.15);
    }
`;
