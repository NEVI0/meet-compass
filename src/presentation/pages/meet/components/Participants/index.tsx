import { FC } from 'react';

import { Participant } from './components';

import * as S from './styles';

export const Participants: FC = () => {
    const participants = 1;

    return (
        <S.Container participants={participants}>
            {new Array(participants).fill(0).map((_, index) => (
                <Participant index={index} />
            ))}
        </S.Container>
    );
};
