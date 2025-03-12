import styled, { css } from 'styled-components';

export type VariantType = 'primary' | 'default';

const VARIANTS: Record<VariantType, any> = {
    default: css`
        color: ${props => props.theme.colors.text.main};
        background-color: ${props => props.theme.colors.body};

        svg {
            fill: ${props => props.theme.colors.primary};
        }

        &:hover:not(&:disabled),
        &:focus:not(&:disabled) {
            color: ${props => props.theme.colors.primary};
        }
    `,
    primary: css`
        color: #fff;
        background-color: ${props => props.theme.colors.primary};

        svg {
            fill: #fff;
        }

        &:hover:not(&:disabled),
        &:focus:not(&:disabled) {
            background-color: ${props => props.theme.colors.secondary};
        }
    `,
};

export const Container = styled.button<{ variant: VariantType }>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 52px;
    padding: 0 1.5rem;
    border-radius: 1rem;

    font-weight: ${props => props.theme.typography.weight.medium};
    transition: 0.3s;

    svg {
        font-size: ${props => props.theme.typography.size.icon};
    }

    &:active:not(&:disabled) {
        transform: scale(0.98);
    }

    &:disabled {
        cursor: no-drop;

        color: ${props => props.theme.colors.text.light};
        background-color: ${props => props.theme.colors.body};

        svg {
            fill: ${props => props.theme.colors.text.light};
        }
    }

    @media screen and (min-width: 767px) {
        height: 58px;
    }

    ${props => VARIANTS[props.variant]}
`;
