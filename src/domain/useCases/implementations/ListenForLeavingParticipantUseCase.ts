import { ListenForLeavingParticipantDTO } from '@domain/dtos';
import { MeetEventHandlersRepositoryAbstract } from '@domain/repositories';

export class ListenForLeavingParticipantUseCase {
    constructor(
        private meetEventHandlersRepository: MeetEventHandlersRepositoryAbstract,
    ) {}

    public async execute(params: ListenForLeavingParticipantDTO) {
        return this.meetEventHandlersRepository.onLeavingParticipant(params);
    }
}
