import { useState } from 'react';

import { makeLeaveMeetUseCase } from '@app/domain/useCases';

import { useMeet } from '@app/presentation/contexts/MeetContext';
import { useToast } from '@app/presentation/contexts/ToastContext';

export const useLeaveMeet = () => {
    const { toast } = useToast();
    const { user, meet, setUser, setMeet } = useMeet();

    const [loading, setLoading] = useState<boolean>(false);

    const leave = () => {
        try {
            if (!meet || !user) return;
            setLoading(true);

            makeLeaveMeetUseCase().execute({
                meetId: meet.id,
                user,
            });

            setMeet(null);
            setUser(null);
        } catch (error) {
            toast.error('Não foi possível sair da reunião!');
        } finally {
            setLoading(false);
        }
    };

    return { leave, loading };
};
