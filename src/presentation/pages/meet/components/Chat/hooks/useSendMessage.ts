import { makeSendMessageUseCase } from '@domain/useCases';

import { useMeet } from '@presentation/contexts/MeetContext';
import { useToast } from '@presentation/contexts/ToastContext';

export const useSendMessage = () => {
    const { user, meet } = useMeet();
    const { toast } = useToast();

    const send = (message: string) => {
        console.log({ sendMessage: meet, user });

        if (!message || !meet || !user) {
            toast.error('Não foi possível enviar a sua mensagem!');
            return null;
        }

        const params = {
            message,
            meetId: meet.id,
            sent: {
                at: new Date().toISOString(),
                by: user,
            },
        };

        makeSendMessageUseCase().execute(params);
        return params;
    };

    return { send };
};
