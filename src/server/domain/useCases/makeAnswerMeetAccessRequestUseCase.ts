import { SocketServerProviderAbstract } from '@server/domain/providers';
import { makeServerStorageProvider } from '@server/infra/providers';

import { AnswerMeetAccessRequestUseCase } from './implementations/AnswerMeetAccessRequestUseCase';

let instace: AnswerMeetAccessRequestUseCase | null = null;

export function makeAnswerMeetAccessRequestUseCase(
    socketServerProvider: SocketServerProviderAbstract,
) {
    if (!instace) {
        const serverStorageProvider = makeServerStorageProvider();

        instace = new AnswerMeetAccessRequestUseCase(
            socketServerProvider,
            serverStorageProvider,
        );
    }

    return instace;
}
