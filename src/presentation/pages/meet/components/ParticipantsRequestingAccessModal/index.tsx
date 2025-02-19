import { FC } from 'react';

import { IconButton } from '@presentation/components';

import { useParticipantsRequests } from './hooks';
import * as S from './styles';

export const ParticipantsRequestingAccessModal: FC = () => {
    const { requests, answerRequest } = useParticipantsRequests();

    if (!requests.length) return null;

    return (
        <S.Container>
            <div>
                {requests.map(request => (
                    <S.Participant key={request.from.id}>
                        <div>
                            <h3>{request.from.name}</h3>
                            <small>quer participar...</small>
                        </div>

                        <div>
                            <IconButton
                                variant="error"
                                icon="x"
                                onClick={() => {
                                    answerRequest({
                                        ...request,
                                        answer: 'DENIED',
                                    });
                                }}
                            />

                            <IconButton
                                variant="success"
                                icon="double-check"
                                onClick={() => {
                                    answerRequest({
                                        ...request,
                                        answer: 'ACCEPTED',
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
