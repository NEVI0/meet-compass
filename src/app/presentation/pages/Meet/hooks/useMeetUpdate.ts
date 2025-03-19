import { useEffect } from 'react';

import { useMeet } from '@app/presentation/contexts/MeetContext';
import { makeListenForMeetUpdateUseCase } from '@app/domain/useCases';

interface ParamsAbstract {}

export const useMeetUpdate = (_?: ParamsAbstract) => {
    const { setMeet } = useMeet();

    useEffect(() => {
        makeListenForMeetUpdateUseCase().execute({
            onUpdated: updated => {
                setMeet(updated.meet);
            },
        });
    }, []);
};
