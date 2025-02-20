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
    public peer: RTCPeerConnection;

    constructor() {
        this.peer = new RTCPeerConnection(PEER_CONFIGS);
    }

    public createOffer: PeerConnectionProviderAbstract['createOffer'] =
        async () => {
            try {
                const offer = await this.peer.createOffer();
                this.peer.setLocalDescription(offer);

                return offer;
            } catch (error) {
                console.log({ error });
                return null as any;
            }
        };

    public answerOffer: PeerConnectionProviderAbstract['answerOffer'] =
        async params => {
            try {
                const { offer, media } = params;

                this.peer.setRemoteDescription(
                    new RTCSessionDescription(offer),
                );

                const answer = await this.peer.createAnswer();
                await this.peer.setLocalDescription(answer);

                this.peer.addTrack(media.track, media.stream);
            } catch (error) {
                console.log({ error });
                return null as any;
            }
        };
}
