import { ListenForNewMessageDTO } from '@app/domain/dtos';
import { MeetEventHandlersRepositoryAbstract } from '@app/domain/repositories';

export class ListenForNewMessageUseCase {
    constructor(
        private meetEventHandlersRepository: MeetEventHandlersRepositoryAbstract,
    ) {}

    public async execute(params: ListenForNewMessageDTO) {
        return this.meetEventHandlersRepository.onNewMessage(params);
    }
}
