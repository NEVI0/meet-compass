import { darken } from 'polished';
import styled, { css } from 'styled-components';

interface ContainerAbstract {
    error?: boolean;
    disabled?: boolean;
}

export const Container = styled.div<ContainerAbstract>`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    .input {
        display: flex;
        align-items: center;
        justify-content: space-between;

        gap: 0.5rem;
        padding: 0 1.5rem;
        border-radius: 1rem;
        background-color: ${props => props.theme.colors.body};
        border: 1px solid
            ${props =>
                props.error
                    ? props.theme.colors.others.red
                    : props.theme.colors.body};

        cursor: ${props => (props.disabled ? 'default' : 'text')};
        transition: 0.3s;

        > input {
            flex: 1;
            border: none;
            outline: none;
            background-color: transparent;
            color: ${props =>
                props.disabled
                    ? props.theme.colors.text.light
                    : props.theme.colors.text.main};
            height: 48px;
        }

        > svg {
            fill: ${props =>
                props.disabled
                    ? darken(0.4, props.theme.colors.text.light)
                    : props.error
                    ? props.theme.colors.others.red
                    : props.theme.colors.primary};
        }

        ${props =>
            !props.error &&
            css`
                &:focus-within {
                    border-color: ${props => props.theme.colors.primary};
                }
            `}
    }

    .error {
        color: ${props => props.theme.colors.others.red};
        font-size: ${props => props.theme.typography.size.small};
        font-weight: ${props => props.theme.typography.weight.light};
    }

    @media screen and (min-width: 767px) {
        .input {
            > input {
                height: 52px;
            }
        }
    }
`;
