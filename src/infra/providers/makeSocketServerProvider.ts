import { IoServer } from '@domain/entities';
import { SocketServerProviderAbstract } from '@domain/providers';
import { SocketIoServerProvider } from './implementations/SocketIoServerProvider';

let instance: SocketServerProviderAbstract | null = null;

export function makeSocketServerProvider(
    server: IoServer,
): SocketServerProviderAbstract {
    if (!instance) instance = new SocketIoServerProvider(server);
    return instance;
}
