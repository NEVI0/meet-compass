import { useEffect, useState } from 'react';

import { UserAbstract } from '@shared/domain/entities';
import {
    makeAnswerParticipantAccessRequestUseCase,
    makeListenForParticipantRequestingAccessUseCase,
} from '@app/domain/useCases';

import { useMeet } from '@app/presentation/contexts/MeetContext';
import { useMeetPrivateContext } from '@app/presentation/pages/Meet/context';

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
        if (!meet || !media.localStream) return;

        makeAnswerParticipantAccessRequestUseCase().execute({
            answer: params.answer,
            meetId: meet.id,
            participant: params.from,
            offer: params.offer,
            media: {
                stream: media.localStream,
                track: media.localStream.getTracks()[0],
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
