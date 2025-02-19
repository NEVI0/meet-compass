interface AnswerOfferParams {
    media: {
        track: MediaStreamTrack;
        stream: MediaStream;
    };
    offer: RTCSessionDescriptionInit;
}

export interface PeerConnectionProviderAbstract {
    peer: RTCPeerConnection;

    createOffer(): Promise<RTCSessionDescriptionInit>;
    answerOffer(params: AnswerOfferParams): Promise<RTCSessionDescriptionInit>;
}
