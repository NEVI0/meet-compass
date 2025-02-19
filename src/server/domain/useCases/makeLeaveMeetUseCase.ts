import { SocketServerProviderAbstract } from '@server/domain/providers';
import { makeServerStorageProvider } from '@server/infra/providers';

import { LeaveMeetUseCase } from './implementations/LeaveMeetUseCase';

let instace: LeaveMeetUseCase | null = null;

export function makeLeaveMeetUseCase(
    socketServerProvider: SocketServerProviderAbstract,
) {
    if (!instace) {
        const serverStorageProvider = makeServerStorageProvider();

        instace = new LeaveMeetUseCase(
            socketServerProvider,
            serverStorageProvider,
        );
    }

    return instace;
}
