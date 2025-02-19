import { SocketServerProviderAbstract } from '@server/domain/providers';
import { makeServerStorageProvider } from '@server/infra/providers';

import { RegisterMeetUseCase } from './implementations/RegisterMeetUseCase';

let instace: RegisterMeetUseCase | null = null;

export function makeRegisterMeetUseCase(
    socketServerProvider: SocketServerProviderAbstract,
) {
    if (!instace) {
        const serverStorageProvider = makeServerStorageProvider();

        instace = new RegisterMeetUseCase(
            socketServerProvider,
            serverStorageProvider,
        );
    }

    return instace;
}
