import {
    ListenForMeetUpdatedDTO,
    ListenForNewMessageDTO,
    ListenForParticipantRequestingAccessDTO,
} from '@domain/dtos';

export interface MeetEventHandlersRepositoryAbstract {
    onParticipantRequestingAccess(
        params: ListenForParticipantRequestingAccessDTO,
    ): void;

    onNewMessage(params: ListenForNewMessageDTO): void;
    onMeetUpdate(params: ListenForMeetUpdatedDTO): void;
}
