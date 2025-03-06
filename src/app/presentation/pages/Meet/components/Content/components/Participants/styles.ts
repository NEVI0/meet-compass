import styled, { css } from 'styled-components';

export const Container = styled.div<{ participants: number }>`
    width: 100%;
    height: 100%;

    display: grid;
    grid-gap: 4px;
    transition: 0.3s;

    /* UM PARTICIPANTE: grid-template-columns: 1fr; */
    /* DOIS OU QUATRO PARTICIPANTES: grid-template-columns: 1fr 1fr; */

    ${props =>
        props.participants === 1 &&
        css`
            margin: 0;
            grid-template-columns: 1fr;

            @media screen and (min-width: 767px) {
                margin: 0 10rem;
            }
        `}

    ${props =>
        props.participants >= 2 &&
        props.participants < 6 &&
        css`
            grid-template-columns: repeat(2, 1fr);
        `}

	${props =>
        props.participants >= 6 &&
        props.participants < 10 &&
        css`
            grid-template-columns: repeat(3, 1fr);
        `}

	${props =>
        props.participants >= 10 &&
        props.participants < 14 &&
        css`
            grid-template-columns: repeat(4, 1fr);
        `}
`;
