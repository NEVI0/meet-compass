interface StartParams {
    localStream: MediaStream;
    onReceivedParticipantStream: (stream: MediaStream) => void;
}

export interface PeerConnectionProviderAbstract {
    start(params: StartParams): Promise<void>;
}
