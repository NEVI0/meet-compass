import { ListenForParticipantRequestingAccessDTO } from '@domain/dtos';
import { MeetEventHandlersRepositoryAbstract } from '@domain/repositories';

export class ListenForParticipantRequestingAccessUseCase {
    constructor(
        private meetEventHandlersRepository: MeetEventHandlersRepositoryAbstract,
    ) {}

    public async execute(params: ListenForParticipantRequestingAccessDTO) {
        return this.meetEventHandlersRepository.onParticipantRequestingAccess(
            params,
        );
    }
}
