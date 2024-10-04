import styled, { css } from 'styled-components';

export type Variant = 'primary' | 'green' | 'red';

const VARIANTS: Record<Variant, any> = {
    primary: css`
        background-color: ${props => props.theme.colors.primary};
    `,
    green: css`
        background-color: ${props => props.theme.colors.others.green};
    `,
    red: css`
        background-color: ${props => props.theme.colors.others.red};
    `,
};

export const Container = styled.button<{ variant: Variant }>`
    width: 44px;
    height: 44px;

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: ${props => props.theme.typography.size.icon};
    border-radius: 100%;

    > svg {
        fill: #fff;
    }

    ${props => VARIANTS[props.variant]};
`;
