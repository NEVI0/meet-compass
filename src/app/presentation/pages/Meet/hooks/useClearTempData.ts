import { useEffect } from 'react';

import { useMeet } from '@app/presentation/contexts/MeetContext';

export const useClearTempData = () => {
    const { setTempMeetData, setTempParticipantData } = useMeet();

    useEffect(() => {
        setTempMeetData(null);
        setTempParticipantData(null);
    }, []);
};
