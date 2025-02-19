import { SocketServerProviderAbstract } from '@server/domain/providers';
import { makeServerStorageProvider } from '@server/infra/providers';

import { RequestMeetAccessUseCase } from './implementations/RequestMeetAccessUseCase';

let instace: RequestMeetAccessUseCase | null = null;

export function makeRequestMeetAccessUseCase(
    socketServerProvider: SocketServerProviderAbstract,
) {
    if (!instace) {
        const serverStorageProvider = makeServerStorageProvider();

        instace = new RequestMeetAccessUseCase(
            socketServerProvider,
            serverStorageProvider,
        );
    }

    return instace;
}
