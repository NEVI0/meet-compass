import { UserAbstract } from '@domain/entities';

export interface ParticipantAccessAnswerDTO {
    meetId: string;
    answer: 'ACCEPTED' | 'DENIED';
    participant: UserAbstract;
    offer: RTCSessionDescriptionInit;
    media: {
        track: MediaStreamTrack;
        stream: MediaStream;
    };
}
