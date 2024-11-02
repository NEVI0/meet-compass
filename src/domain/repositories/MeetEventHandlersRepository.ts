import {
    ListenForParticipantRequestingAccessDTO,
    ParticipantAccessAnswerDTO,
} from '@domain/dtos';

export interface MeetEventHandlersRepositoryAbstract {
    onParticipantRequestingAccess(
        params: ListenForParticipantRequestingAccessDTO,
    ): void;

    onAnswerParticipantAccessRequest(param: ParticipantAccessAnswerDTO): void;
}
