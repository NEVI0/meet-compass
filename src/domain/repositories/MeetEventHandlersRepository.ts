import { ParticipantAccessAnswerDTO } from '@domain/dtos';

export interface MeetEventHandlersRepositoryAbstract {
    onParticipantRequestingAccess(): Promise<any>;
    onAnswerParticipantAccessRequest(param: ParticipantAccessAnswerDTO): void;
}
