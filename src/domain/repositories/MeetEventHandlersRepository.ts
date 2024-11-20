import {
    ListenForNewMessageDTO,
    ListenForMeetUpdatedDTO,
    ListenForLeavingParticipantDTO,
    ListenForParticipantRequestingAccessDTO,
} from '@domain/dtos';

export interface MeetEventHandlersRepositoryAbstract {
    onParticipantRequestingAccess(
        params: ListenForParticipantRequestingAccessDTO,
    ): void;

    onNewMessage(params: ListenForNewMessageDTO): void;
    onMeetUpdate(params: ListenForMeetUpdatedDTO): void;
    onLeavingParticipant(params: ListenForLeavingParticipantDTO): void;
}
