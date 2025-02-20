import styled, { css } from 'styled-components';

export type Variant = 'default' | 'container' | 'success' | 'error';

interface ContainerAbstract {
    variant: Variant;
}

const VARIANTS: Record<Variant, any> = {
    default: css`
        background-color: ${props => props.theme.colors.body};

        > svg {
            fill: ${props => props.theme.colors.text.main};
        }
    `,
    container: css`
        background-color: ${props => props.theme.colors.container};

        > svg {
            fill: ${props => props.theme.colors.text.main};
        }
    `,
    success: css`
        background-color: ${props => props.theme.colors.others.green};

        > svg {
            fill: #fff;
        }
    `,
    error: css`
        background-color: ${props => props.theme.colors.others.red};

        > svg {
            fill: #fff;
        }
    `,
};

export const Container = styled.button<ContainerAbstract>`
    width: 36px;
    height: 36px;

    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.75rem;
    font-size: ${props => props.theme.typography.size.icon};

    ${props => VARIANTS[props.variant]};

    > svg {
        font-size: ${props => props.theme.typography.size.icon};
    }
`;
