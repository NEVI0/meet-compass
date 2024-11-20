import { useEffect } from 'react';

import { useToast } from '@presentation/contexts/ToastContext';
import { makeListenForLeavingParticipantUseCase } from '@domain/useCases';

export const useLeavingParticipant = () => {
    const { toast } = useToast();

    useEffect(() => {
        makeListenForLeavingParticipantUseCase().execute({
            onReceive: data => {
                toast.error(`O participante "${data.name}" saiu!`);
            },
        });
    }, []);
};
