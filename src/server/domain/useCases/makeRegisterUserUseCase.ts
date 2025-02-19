import { SocketServerProviderAbstract } from '@server/domain/providers';
import { makeServerStorageProvider } from '@server/infra/providers';

import { RegisterUserUseCase } from './implementations/RegisterUserUseCase';

let instace: RegisterUserUseCase | null = null;

export function makeRegisterUserUseCase(
    socketServerProvider: SocketServerProviderAbstract,
) {
    if (!instace) {
        const serverStorageProvider = makeServerStorageProvider();

        instace = new RegisterUserUseCase(
            socketServerProvider,
            serverStorageProvider,
        );
    }

    return instace;
}
