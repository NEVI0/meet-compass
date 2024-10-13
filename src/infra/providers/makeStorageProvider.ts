import { StorageProviderAbstract } from '@domain/providers';
import { LocalStorageProvider } from './implementations/LocalStorageProvider';

let instance: StorageProviderAbstract | null = null;

export function makeStorageProvider(): StorageProviderAbstract {
    if (!instance) instance = new LocalStorageProvider();
    return instance;
}
