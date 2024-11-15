import styled, { css } from 'styled-components';

export type Variant = 'current-user' | 'participant';

interface ContainerAbstract {
    variant: Variant;
}

export const Container = styled.div<ContainerAbstract>`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    align-items: ${props =>
        props.variant === 'current-user' ? 'flex-end' : 'flex-start'};

    > div {
        width: 90%;

        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        padding: 0.75rem;
        border: 1px solid ${props => props.theme.colors.container};
        border-top-left-radius: 1rem;
        border-top-right-radius: 1rem;

        > p {
            font-size: ${props => props.theme.typography.size.normal};
        }

        ${props =>
            props.variant === 'current-user'
                ? css`
                      border-bottom-left-radius: 1rem;
                  `
                : css`
                      border-bottom-right-radius: 1rem;
                      background-color: ${props =>
                          props.theme.colors.container};
                  `}
    }

    > small {
        margin: 0 0.75rem;

        font-size: ${props => props.theme.typography.size.smaller};
        font-weight: ${props => props.theme.typography.weight.light};
        color: ${props => props.theme.colors.text.light};
    }
`;
