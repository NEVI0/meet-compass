import styled from 'styled-components';

export const Container = styled.div`
    position: relative;

    .tooltip {
        position: absolute;
        top: -40px;
        left: 50%;
        transform: translateX(-50%);

        opacity: 0;
        visibility: hidden;
        cursor: default;

        padding: 0.5rem 0.75rem;
        border-radius: 0.5rem;
        text-align: center;
        white-space: nowrap;
        font-size: ${props => props.theme.typography.size.smaller};
        color: ${props => props.theme.colors.text.light};

        background-color: ${props => props.theme.colors.container};
        box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.25);
        z-index: 10;
        transition: 0.3s;
    }

    &:hover > .tooltip {
        opacity: 1;
        visibility: visible;
    }
`;
