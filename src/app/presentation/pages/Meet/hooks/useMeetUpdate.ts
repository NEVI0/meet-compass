import { useEffect } from 'react';

import { useMeet } from '@app/presentation/contexts/MeetContext';
import { makeListenForMeetUpdateUseCase } from '@app/domain/useCases';

export const useMeetUpdate = () => {
    const { setMeet } = useMeet();

    useEffect(() => {
        makeListenForMeetUpdateUseCase().execute({
            onReceive: meet => {
                // console.log({ meet });
                setMeet(meet);
            },
        });
    }, []);
};
