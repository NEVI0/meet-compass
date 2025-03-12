import { FC } from 'react';

import { Icon, IconName } from '../Icon';
import { LoadingSpinner } from '../LoadingSpinner';

import * as S from './styles';

interface ButtonAbstract {
    icon: IconName;

    loading?: boolean;
    disabled?: boolean;
    variant?: S.VariantType;
    type?: 'button' | 'submit';

    children: string;
    onClick?: () => void;
}

export const Button: FC<ButtonAbstract> = ({
    icon,
    loading,
    disabled,
    variant = 'default',
    type = 'button',
    children,
    onClick,
}) => {
    return (
        <S.Container
            type={type}
            variant={variant}
            disabled={disabled || loading}
            onClick={onClick}
        >
            {children}
            {loading ? <LoadingSpinner /> : <Icon name={icon} />}
        </S.Container>
    );
};
