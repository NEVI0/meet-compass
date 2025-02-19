import { ServerStorageProviderAbstract } from '@server/domain/providers';
import { ServerStorageProvider } from './implementations/ServerStorageProvider';

let instance: ServerStorageProviderAbstract | null = null;

export function makeServerStorageProvider(): ServerStorageProviderAbstract {
    if (!instance) instance = new ServerStorageProvider();
    return instance;
}
