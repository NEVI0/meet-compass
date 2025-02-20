import { PeerConnectionProviderAbstract } from '@app/domain/providers';
import { RTCPeerConnectionProvider } from './implementations/RTCPeerConnectionProvider';

let instance: PeerConnectionProviderAbstract | null = null;

export function makePeerConnectionProvider() {
    if (!instance) instance = new RTCPeerConnectionProvider();
    return instance;
}
