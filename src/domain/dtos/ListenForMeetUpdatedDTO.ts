import { MeetAbstract } from '@domain/entities';

export interface ListenForMeetUpdatedDTO {
    onReceive(meet: MeetAbstract): void;
}
