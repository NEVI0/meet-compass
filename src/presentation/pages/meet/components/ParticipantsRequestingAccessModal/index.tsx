import { FC } from 'react';

import { IconButton } from '@presentation/components';

import { useParticipantsRequestingAccess } from './hooks';
import * as S from './styles';

export const ParticipantsRequestingAccessModal: FC = () => {
    const { participants, answerParticipant } =
        useParticipantsRequestingAccess();

    if (!participants.length) return null;

    return (
        <S.Container>
            <div>
                {participants.map(participant => (
                    <S.Participant key={participant.id}>
                        <div>
                            <h3>{participant.name}</h3>
                            <small>está ligando...</small>
                        </div>

                        <div>
                            <IconButton
                                variant="error"
                                icon="x"
                                onClick={() => {
                                    answerParticipant({
                                        answer: 'DENIED',
                                        participant,
                                    });
                                }}
                            />

                            <IconButton
                                variant="success"
                                icon="double-check"
                                onClick={() => {
                                    answerParticipant({
                                        answer: 'ACCEPTED',
                                        participant,
                                    });
                                }}
                            />
                        </div>
                    </S.Participant>
                ))}
            </div>
        </S.Container>
    );
};
