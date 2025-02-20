import { MeetAbstract } from '@shared/domain/entities';

export interface ListenForMeetUpdatedDTO {
    onReceive(meet: MeetAbstract): void;
}
