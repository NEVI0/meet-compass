import { useRouter } from 'next/router';

import { CreateMeetDTO } from '@app/domain/dtos';

import { useMeet } from '@app/presentation/contexts/MeetContext';

export const useRegisterMeet = () => {
    const router = useRouter();
    const { setTempMeetData } = useMeet();

    const register = async (params: CreateMeetDTO) => {
        setTempMeetData(params);
        router.push('/request-stream');
    };

    return { register };
};
