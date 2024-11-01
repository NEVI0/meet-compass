import {
    makeAnswerParticipantAccessRequestUseCase,
    makeListenForParticipantRequestingAccessUseCase,
} from '@domain/useCases';
import { useEffect } from 'react';

export const useListenForParticipantRequestingAccess = () => {
    useEffect(() => {
        const listen = async () => {
            const data =
                await makeListenForParticipantRequestingAccessUseCase().execute();

            await makeAnswerParticipantAccessRequestUseCase().execute({
                answer: 'DENIED',
                participant: data.from,
            });
        };

        listen();
    });
};
