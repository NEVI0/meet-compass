import { FC } from 'react';

import { Icon, IconName } from '@presentation/components';

import * as S from './styles';

interface IconButtonAbstract {
    icon: IconName;
    onClick?: () => void;
}

export const IconButton: FC<IconButtonAbstract> = ({ icon, onClick }) => {
    return (
        <S.Container onClick={onClick}>
            <Icon name={icon} />
        </S.Container>
    );
};
