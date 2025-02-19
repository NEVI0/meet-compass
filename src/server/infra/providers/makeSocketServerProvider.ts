import { IoServer } from '@shared/domain/entities';
import { SocketServerProviderAbstract } from '@server/domain/providers';

import { SocketIoServerProvider } from './implementations/SocketIoServerProvider';

let instance: SocketServerProviderAbstract | null = null;

export function makeSocketServerProvider(
    server: IoServer,
): SocketServerProviderAbstract {
    if (!instance) instance = new SocketIoServerProvider(server);
    return instance;
}
