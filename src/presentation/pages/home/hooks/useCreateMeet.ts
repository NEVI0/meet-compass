import { useState } from 'react';
import { useRouter } from 'next/router';

import { CreateMeetDTO } from '@domain/dtos';
import { makeCreateMeetUseCase } from '@domain/useCases';

import { useMeet } from '@presentation/contexts/MeetContext';
import { useToast } from '@presentation/contexts/ToastContext';

export const useCreateMeet = () => {
    const router = useRouter();

    const { toast } = useToast();
    const { setMeet } = useMeet();

    const [loading, setLoading] = useState<boolean>(false);

    const create = async (params: CreateMeetDTO) => {
        try {
            setLoading(true);

            const meet = await makeCreateMeetUseCase().execute(params);
            if (!meet) throw Error();

            setMeet(meet);
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
