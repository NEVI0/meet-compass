import { UserAbstract } from '@shared/domain/entities';

export interface AnswerMeetAccessRequestDTO {
    meetId: string;
    answer: 'ACCEPTED' | 'DENIED';

    participant: UserAbstract;

    offer: RTCSessionDescriptionInit;
    media: {
        track: MediaStreamTrack;
        stream: MediaStream;
    };
}
