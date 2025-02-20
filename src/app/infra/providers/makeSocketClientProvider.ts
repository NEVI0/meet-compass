import { SocketClientProviderAbstract } from '@app/domain/providers';
import { SocketIoClientProvider } from './implementations/SocketIoClientProvider';

let instance: SocketClientProviderAbstract | null = null;

export function makeSocketClientProvider(): SocketClientProviderAbstract {
    if (!instance) instance = new SocketIoClientProvider();
    return instance;
}
