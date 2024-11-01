import { ParticipantAccessAnswerDTO } from '@domain/dtos';
import { MeetEventHandlersRepositoryAbstract } from '@domain/repositories';

export class AnswerParticipantAccessRequestUseCase {
    constructor(
        private meetEventHandlersRepository: MeetEventHandlersRepositoryAbstract,
    ) {}

    public execute(params: ParticipantAccessAnswerDTO) {
        this.meetEventHandlersRepository.onAnswerParticipantAccessRequest(
            params,
        );
    }
}
