import { FC, useMemo } from 'react';

import {
    Icon,
    IconName,
    LoadingSpinner,
    Tooltip,
} from '@app/presentation/components';

import * as S from './styles';
import { useWindowSize } from '@app/presentation/hooks';

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
}) => {
    const { size } = useWindowSize();

    const shouldHideTooltip = useMemo(() => {
        return size.width < 768;
    }, [size]);

    return (
        <Tooltip
            message={label}
            forceHide={shouldHideTooltip || disabled || loading}
        >
            <S.Container
                variant={variant}
                disabled={disabled || loading}
                onClick={onClick}
            >
                {loading ? <LoadingSpinner /> : <Icon name={icon} />}
            </S.Container>
        </Tooltip>
    );
};
