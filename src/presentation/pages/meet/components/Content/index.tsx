import { FC } from 'react';

import { EmptyMeet, UserVideo } from './components';
import * as S from './styles';

export const Content: FC = () => {
    return (
        <>
            <S.Content>
                <EmptyMeet />
            </S.Content>

            <UserVideo />
        </>
    );
};
