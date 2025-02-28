import { PeerConnectionProviderAbstract } from '@app/domain/providers';

const PEER_CONFIGS = {
    iceServers: [
        {
            urls: 'stun:openrelay.metered.ca:80',
        },
        {
            urls: 'turn:openrelay.metered.ca:80',
            username: 'openrelayproject',
            credential: 'openrelayproject',
        },
        {
            urls: 'turn:openrelay.metered.ca:443',
            username: 'openrelayproject',
            credential: 'openrelayproject',
        },
        {
            urls: 'turn:openrelay.metered.ca:443?transport=tcp',
            username: 'openrelayproject',
            credential: 'openrelayproject',
        },
    ],
};

export class RTCPeerConnectionProvider
    implements PeerConnectionProviderAbstract
{
    private localPeerConnection: RTCPeerConnection;
    private remotePeerConnection: RTCPeerConnection;

    constructor() {
        this.localPeerConnection = new RTCPeerConnection(PEER_CONFIGS);
        this.remotePeerConnection = new RTCPeerConnection(PEER_CONFIGS);
    }

    public start: PeerConnectionProviderAbstract['start'] = async params => {
        try {
            this.listenForIceCandidates();
            this.listenForNewTracks(params.onReceivedParticipantStream);
            this.addLocalTracks(params.localStream);

            const offer = await this.localPeerConnection.createOffer({
                offerToReceiveAudio: true,
                offerToReceiveVideo: true,
            });

            await this.localPeerConnection.setLocalDescription(offer);
            await this.remotePeerConnection.setRemoteDescription(offer);

            const answer = await this.remotePeerConnection.createAnswer();

            await this.remotePeerConnection.setLocalDescription(answer);
            await this.localPeerConnection.setRemoteDescription(answer);
        } catch (error) {
            console.log({ error });
        }
    };

    private listenForIceCandidates() {
        this.localPeerConnection.addEventListener('icecandidate', event =>
            this.remotePeerConnection.addIceCandidate(event.candidate!),
        );

        this.remotePeerConnection.addEventListener('icecandidate', event =>
            this.localPeerConnection.addIceCandidate(event.candidate!),
        );
    }

    private listenForNewTracks(
        onReceivedParticipantStream: (stream: MediaStream) => void,
    ) {
        this.remotePeerConnection.addEventListener('track', event => {
            onReceivedParticipantStream(event.streams[0]);
        });
    }

    private addLocalTracks(localStream: MediaStream) {
        localStream
            .getTracks()
            .forEach(track =>
                this.localPeerConnection.addTrack(track, localStream),
            );
    }
}
