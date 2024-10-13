import { useCallback, useState } from 'react';

import { useMeet } from '@presentation/contexts/MeetContext';
import { CreateMeetDTO } from '@domain/dtos';
import { makeCreateMeetUseCase } from '@domain/useCases';

export const useCreateMeet = () => {
    const { updateMeetData } = useMeet();

    const [loading, setLoading] = useState<boolean>(false);

    const create = useCallback(async (params: CreateMeetDTO) => {
        try {
            setLoading(true);

            const meet = await makeCreateMeetUseCase().execute(params);
            if (!meet) throw Error();

            updateMeetData(meet);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        create,
        loading,
    };
};
