import { useEffect } from 'react';

import { useMeet } from '@presentation/contexts/MeetContext';
import { makeListenForMeetUpdateUseCase } from '@domain/useCases';

export const useMeetUpdate = () => {
    const { setMeet } = useMeet();

    useEffect(() => {
        makeListenForMeetUpdateUseCase().execute({
            onReceive: meet => {
                console.log({ meet });
                setMeet(meet);
            },
        });
    }, []);
};
