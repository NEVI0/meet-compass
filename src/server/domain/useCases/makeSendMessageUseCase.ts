import { SocketServerProviderAbstract } from '@server/domain/providers';
import { makeServerStorageProvider } from '@server/infra/providers';

import { SendMessageUseCase } from './implementations/SendMessageUseCase';

let instace: SendMessageUseCase | null = null;

export function makeSendMessageUseCase(
    socketServerProvider: SocketServerProviderAbstract,
) {
    if (!instace) {
        const serverStorageProvider = makeServerStorageProvider();

        instace = new SendMessageUseCase(
            socketServerProvider,
            serverStorageProvider,
        );
    }

    return instace;
}
