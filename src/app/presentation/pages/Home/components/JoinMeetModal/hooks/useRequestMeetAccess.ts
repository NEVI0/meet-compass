import { useState } from 'react';

import { useRouter } from 'next/router';

import { RequestMeetAccessDTO } from '@app/domain/dtos';
import { makeRequestMeetAccessUseCase } from '@app/domain/useCases';

import { useToast } from '@app/presentation/contexts/ToastContext';
import { useMeet } from '@app/presentation/contexts/MeetContext';

export const useRequestMeetAccess = () => {
    const router = useRouter();

    const { toast } = useToast();
    const { setMeet, setUser } = useMeet();

    const [loading, setLoading] = useState<boolean>(false);

    const request = async (params: RequestMeetAccessDTO) => {
        try {
            setLoading(true);

            const { meet, currentUser } =
                await makeRequestMeetAccessUseCase().execute(params);

            setMeet(meet);
            setUser(currentUser);

            toast.success('Acesso permitido!');
            router.push('/meet');
        } catch (error) {
            toast.error(error as string);
        } finally {
            setLoading(false);
        }
    };

    return {
        request,
        loading,
    };
};
