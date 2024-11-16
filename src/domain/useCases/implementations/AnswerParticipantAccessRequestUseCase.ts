import { ParticipantAccessAnswerDTO } from '@domain/dtos';
import { MeetRepositoryAbstract } from '@domain/repositories';

export class AnswerParticipantAccessRequestUseCase {
    constructor(private meetRepository: MeetRepositoryAbstract) {}

    public execute(params: ParticipantAccessAnswerDTO) {
        this.meetRepository.answerParticipantAccessRequest(params);
    }
}
