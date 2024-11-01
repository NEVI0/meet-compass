import { useRouter } from 'next/navigation';

import { useMeet } from '@presentation/contexts/MeetContext';

export const useLeaveMeet = () => {
    const router = useRouter();

    const { updateMeetData } = useMeet();

    const leave = () => {
        updateMeetData(null);
        router.replace('/home');
    };

    return { leave };
};
