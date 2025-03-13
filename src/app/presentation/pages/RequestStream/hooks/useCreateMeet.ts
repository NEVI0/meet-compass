import { useState } from 'react';
import { useRouter } from 'next/router';

import { makeCreateMeetUseCase } from '@app/domain/useCases';

import { useMeet } from '@app/presentation/contexts/MeetContext';
import { useToast } from '@app/presentation/contexts/ToastContext';

export const useCreateMeet = () => {
    const router = useRouter();

    const { toast } = useToast();
    const { tempMeetData, setMeet, setUser } = useMeet();

    const [loading, setLoading] = useState<boolean>(false);

    const create = async () => {
        if (!tempMeetData) return;

        try {
            setLoading(true);

            const meet = await makeCreateMeetUseCase().execute(tempMeetData);
            if (!meet) throw Error();

            setMeet(meet);
            setUser(meet.owner);

            router.push('/meet');
        } catch (error) {
            toast.error('Não foi possível criar a meet!');
        } finally {
            setLoading(false);
        }
    };

    return {
        create,
        loading,
    };
};
