import { FC } from 'react';

import { useMeet } from '@presentation/contexts/MeetContext';

import { EmptyMeet, Participants, UserVideo } from './components';
import * as S from './styles';

export const Content: FC = () => {
    const { meet, user } = useMeet();

    if (!meet || !user) return null;

    const availableParticipants = meet.participants.filter(
        participant => participant.id !== user.id,
    );

    return (
        <>
            <S.Content>
                {!availableParticipants.length ? (
                    <EmptyMeet />
                ) : (
                    <Participants participants={availableParticipants} />
                )}
            </S.Content>

            <UserVideo />
        </>
    );
};
