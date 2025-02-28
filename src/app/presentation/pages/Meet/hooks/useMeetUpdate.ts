import { useEffect } from 'react';

import { useMeet } from '@app/presentation/contexts/MeetContext';
import { makeListenForMeetUpdateUseCase } from '@app/domain/useCases';

interface ParamsAbstract {
    loading: boolean;
    localStream: MediaStream | null;

    setParticipantStream: (stream: MediaStream) => void;
}

export const useMeetUpdate = (params: ParamsAbstract) => {
    const { setMeet } = useMeet();

    useEffect(() => {
        if (params.loading) return;

        console.log({ localStream: params.localStream });

        makeListenForMeetUpdateUseCase().execute({
            localStream: params.localStream!,
            onReceivedParticipantStream: stream => {
                params.setParticipantStream(stream);
            },
            onReceiveMeetData: meet => {
                setMeet(meet);
            },
        });
    }, [params.loading]);
};
