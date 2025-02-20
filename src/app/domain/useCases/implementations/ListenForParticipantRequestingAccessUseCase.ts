import { ListenForParticipantRequestingAccessDTO } from '@app/domain/dtos';
import { MeetEventHandlersRepositoryAbstract } from '@app/domain/repositories';

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
