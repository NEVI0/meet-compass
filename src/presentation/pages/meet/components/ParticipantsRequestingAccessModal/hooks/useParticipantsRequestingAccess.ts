import { useEffect, useState } from 'react';

import { UserAbstract } from '@domain/entities';
import { ParticipantAccessAnswerDTO } from '@domain/dtos';
import {
    makeAnswerParticipantAccessRequestUseCase,
    makeListenForParticipantRequestingAccessUseCase,
} from '@domain/useCases';

import { useMeet } from '@presentation/contexts/MeetContext';

export const useParticipantsRequestingAccess = () => {
    const { meet, setMeet } = useMeet();

    const [participants, setParticipants] = useState<UserAbstract[]>([]);

    const answerParticipant = (
        params: Omit<ParticipantAccessAnswerDTO, 'meetId'>,
    ) => {
        if (!meet) return;

        makeAnswerParticipantAccessRequestUseCase().execute({
            ...params,
            meetId: meet.id,
        });

        setParticipants(currentParticipants => {
            return currentParticipants.filter(
                participant => participant.id !== params.participant.id,
            );
        });

        setMeet(currentMeet => {
            if (!currentMeet) return currentMeet;

            currentMeet.addParticipant(params.participant);
            return currentMeet;
        });
    };

    useEffect(() => {
        makeListenForParticipantRequestingAccessUseCase().execute({
            onReceive: data => {
                setParticipants(currentParticipants => [
                    ...currentParticipants,
                    data.from,
                ]);
            },
        });
    }, []);

    return {
        participants,
        answerParticipant,
    };
};
