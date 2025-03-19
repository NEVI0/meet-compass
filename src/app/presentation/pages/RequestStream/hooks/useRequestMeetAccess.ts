import { useState } from 'react';

import { useRouter } from 'next/router';

import { makeRequestMeetAccessUseCase } from '@app/domain/useCases';

import { useToast } from '@app/presentation/contexts/ToastContext';
import { useMeet } from '@app/presentation/contexts/MeetContext';

export const useRequestMeetAccess = () => {
    const router = useRouter();

    const { toast } = useToast();
    const { tempParticipantData, setMeet, setUser } = useMeet();

    const [loading, setLoading] = useState<boolean>(false);

    const request = async () => {
        if (!tempParticipantData) return;

        try {
            setLoading(true);

            const { meet, user } = await makeRequestMeetAccessUseCase().execute(
                tempParticipantData,
            );

            setMeet(meet);
            setUser(user);

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
