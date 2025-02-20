interface AnswerOfferParams {
    offer: RTCSessionDescriptionInit;
    media: {
        track: MediaStreamTrack;
        stream: MediaStream;
    };
}

export interface PeerConnectionProviderAbstract {
    peer: RTCPeerConnection;

    createOffer(): Promise<RTCSessionDescriptionInit>;
    answerOffer(params: AnswerOfferParams): Promise<RTCSessionDescriptionInit>;
}
