import { ListenForLeavingParticipantDTO } from '@app/domain/dtos';
import { MeetEventHandlersRepositoryAbstract } from '@app/domain/repositories';

export class ListenForLeavingParticipantUseCase {
    constructor(
        private meetEventHandlersRepository: MeetEventHandlersRepositoryAbstract,
    ) {}

    public async execute(params: ListenForLeavingParticipantDTO) {
        return this.meetEventHandlersRepository.onLeavingParticipant(params);
    }
}
