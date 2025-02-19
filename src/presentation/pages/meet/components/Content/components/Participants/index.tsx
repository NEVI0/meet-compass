import { FC } from 'react';

import { UserAbstract } from '@domain/entities';

import { Participant } from './components';
import * as S from './styles';

export const Participants: FC<{ participants: UserAbstract[] }> = ({
    participants,
}) => {
    return (
        <S.Container participants={participants.length}>
            {participants.map((participant, index) => (
                <Participant
                    key={index}
                    index={index}
                    participant={participant}
                />
            ))}
        </S.Container>
    );
};
