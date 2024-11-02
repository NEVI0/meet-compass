import { useRouter } from 'next/navigation';

import { useMeet } from '@presentation/contexts/MeetContext';

export const useLeaveMeet = () => {
    const router = useRouter();

    const { setMeet } = useMeet();

    const leave = () => {
        setMeet(null);
        router.replace('/home');
    };

    return { leave };
};
