import { PeerConnectionProviderAbstract } from '@domain/providers';
import { WebRTCConnectionProvider } from './implementations/WebRTCConnectionProvider';

let instance: PeerConnectionProviderAbstract | null = null;

export function makePeerConnectionProvider(): PeerConnectionProviderAbstract {
    if (!instance) instance = new WebRTCConnectionProvider();
    return instance;
}
