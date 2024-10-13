import { FC } from 'react';

import {
    Icon,
    IconName,
    LoadingSpinner,
    Tooltip,
} from '@presentation/components';

import * as S from './styles';

interface ActionButtonAbstract {
    label: string;

    icon: IconName;
    variant?: S.Variant;
    loading?: boolean;
    disabled?: boolean;

    onClick?: () => void;
}

export const ActionButton: FC<ActionButtonAbstract> = ({
    label,
    icon,
    variant = 'primary',
    loading = false,
    disabled = false,
    onClick,
}) => (
    <Tooltip message={label} forceHide={disabled || loading}>
        <S.Container
            variant={variant}
            disabled={disabled || loading}
            onClick={onClick}
        >
            {loading ? <LoadingSpinner /> : <Icon name={icon} />}
        </S.Container>
    </Tooltip>
);
