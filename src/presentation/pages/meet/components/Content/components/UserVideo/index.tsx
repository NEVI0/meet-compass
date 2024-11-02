import { FC } from 'react';

import * as S from './styles';

export const UserVideo: FC = () => {
    return (
        <S.Container visible={false}>
            <video
                id="localUserVideo"
                // ref={localUserVideoRef}
                autoPlay
                playsInline
                muted
            />
        </S.Container>
    );
};
