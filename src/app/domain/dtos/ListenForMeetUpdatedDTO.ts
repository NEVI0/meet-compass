import { MeetUpdatedAbstract } from '@app/domain/entities';

export interface ListenForMeetUpdatedDTO {
    onUpdated(updated: MeetUpdatedAbstract): void;
}
