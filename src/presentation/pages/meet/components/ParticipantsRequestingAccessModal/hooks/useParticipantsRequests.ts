import { useEffect, useState } from 'react';

import { UserAbstract } from '@domain/entities';
import {
    makeAnswerParticipantAccessRequestUseCase,
    makeListenForParticipantRequestingAccessUseCase,
} from '@domain/useCases';

import { useMeet } from '@presentation/contexts/MeetContext';
import { useMeetPrivateContext } from '@presentation/pages/Meet/context';

interface RequestsAbstract {
    from: UserAbstract;
    offer: RTCSessionDescriptionInit;
}

interface ParamsAbstract extends RequestsAbstract {
    answer: 'ACCEPTED' | 'DENIED';
}

export const useParticipantsRequests = () => {
    const { meet } = useMeet();
    const { media } = useMeetPrivateContext();

    const [requests, setRequests] = useState<RequestsAbstract[]>([]);

    const answerRequest = (params: ParamsAbstract) => {
        if (!meet || !media.stream) return;

        makeAnswerParticipantAccessRequestUseCase().execute({
            answer: params.answer,
            meetId: meet.id,
            participant: params.from,
            offer: params.offer,
            media: {
                stream: media.stream,
                track: media.stream.getTracks()[0],
            },
        });

        setRequests(currentRequests => {
            return currentRequests.filter(
                request => request.from.id !== params.from.id,
            );
        });
    };

    useEffect(() => {
        makeListenForParticipantRequestingAccessUseCase().execute({
            onReceive: data => {
                setRequests(currentRequests => [...currentRequests, data]);
            },
        });
    }, []);

    return {
        requests,
        answerRequest,
    };
};
