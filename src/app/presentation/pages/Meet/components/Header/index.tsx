import { FC } from 'react';

import { useMeet } from '@app/presentation/contexts/MeetContext';
import { useWindowSize } from '@app/presentation/hooks';

import { DesktopActions, MobileActions } from './components';
import * as S from './styles';

export const Header: FC = () => {
    const { meet } = useMeet();
    const { size } = useWindowSize();

    if (!meet) return undefined;

    return (
        <S.Container>
            <h2>{meet.name}</h2>
            {size.width <= 768 ? <MobileActions /> : <DesktopActions />}
        </S.Container>
    );
};
