export interface UserAbstract {
    id: string;
    name: string;
    email: string;
    socketId: string;
    peerSignal?: RTCPeerConnection;
}
