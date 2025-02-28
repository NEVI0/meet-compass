import { MeetAbstract } from '@shared/domain/entities';

export interface ListenForMeetUpdatedDTO {
    localStream: MediaStream;

    onReceiveMeetData(meet: MeetAbstract): void;
    onReceivedParticipantStream: (stream: MediaStream) => void;
}
