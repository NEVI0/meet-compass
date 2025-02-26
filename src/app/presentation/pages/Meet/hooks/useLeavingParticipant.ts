import { useEffect } from 'react';

import { useToast } from '@app/presentation/contexts/ToastContext';
import { makeListenForLeavingParticipantUseCase } from '@app/domain/useCases';

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
