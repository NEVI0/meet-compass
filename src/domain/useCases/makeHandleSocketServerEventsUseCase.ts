import { IoServer } from '@domain/entities';
import {
    makeServerStorageProvider,
    makeSocketServerProvider,
} from '@infra/providers';
import { HandleSocketServerEventsUseCase } from './implementations/HandleSocketServerEventsUseCase';

let instace: HandleSocketServerEventsUseCase | null = null;

export function makeHandleSocketServerEventsUseCase(server: IoServer) {
    if (!instace) {
        const serverStorageProvider = makeServerStorageProvider();
        const socketServerProvider = makeSocketServerProvider(server);

        instace = new HandleSocketServerEventsUseCase(
            serverStorageProvider,
            socketServerProvider,
        );
    }

    return instace;
}
