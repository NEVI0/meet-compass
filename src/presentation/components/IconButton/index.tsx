import { FC } from 'react';

import { Icon, IconName } from '@presentation/components';

import * as S from './styles';

interface IconButtonAbstract {
    icon: IconName;
    variant?: S.Variant;
    onClick?: () => void;
}

export const IconButton: FC<IconButtonAbstract> = ({
    icon,
    variant = 'default',
    onClick,
}) => (
    <S.Container type="button" variant={variant} onClick={onClick}>
        <Icon name={icon} />
    </S.Container>
);
