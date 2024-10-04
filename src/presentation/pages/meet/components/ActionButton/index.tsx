import { FC } from 'react';

import { Icon, IconName, Tooltip } from '@presentation/components';

import * as S from './styles';

interface ActionButtonAbstract {
    label: string;

    icon: IconName;
    variant?: S.Variant;
}

export const ActionButton: FC<ActionButtonAbstract> = ({
    label,
    icon,
    variant = 'primary',
}) => {
    return (
        <Tooltip message={label}>
            <S.Container variant={variant}>
                <Icon name={icon} />
            </S.Container>
        </Tooltip>
    );
};
