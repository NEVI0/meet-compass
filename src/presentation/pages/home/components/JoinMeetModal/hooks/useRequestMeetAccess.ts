import { useState } from 'react';

import { useRouter } from 'next/router';

import { RequestMeetAccessDTO } from '@domain/dtos';
import { makeRequestMeetAccessUseCase } from '@domain/useCases';
import { useToast } from '@presentation/contexts/ToastContext';

export const useRequestMeetAccess = () => {
    const router = useRouter();
    const { toast } = useToast();

    const [loading, setLoading] = useState<boolean>(false);

    const request = async (params: RequestMeetAccessDTO) => {
        try {
            setLoading(true);

            await makeRequestMeetAccessUseCase().execute(params);

            toast.success('Acesso permitido!');
            router.push('/meet');
        } catch (error) {
            toast.error('Acesso negado!');
        } finally {
            setLoading(false);
        }
    };

    return {
        request,
        loading,
    };
};
