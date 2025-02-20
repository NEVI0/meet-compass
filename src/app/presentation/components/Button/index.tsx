import { FC } from 'react';

import { Icon, IconName } from '../Icon';
import { LoadingSpinner } from '../LoadingSpinner';

import * as S from './styles';

interface ButtonAbstract {
    icon: IconName;

    loading?: boolean;
    disabled?: boolean;
    type?: 'button' | 'submit';

    children: string;
    onClick?: () => void;
}

export const Button: FC<ButtonAbstract> = ({
    icon,
    loading,
    disabled,
    type = 'button',
    children,
    onClick,
}) => {
    return (
        <S.Container
            type={type}
            disabled={disabled || loading}
            onClick={onClick}
        >
            {children}
            {loading ? <LoadingSpinner /> : <Icon name={icon} />}
        </S.Container>
    );
};
