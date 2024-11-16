import { ListenForNewMessageDTO } from '@domain/dtos';
import { MeetEventHandlersRepositoryAbstract } from '@domain/repositories';

export class ListenForNewMessageUseCase {
    constructor(
        private meetEventHandlersRepository: MeetEventHandlersRepositoryAbstract,
    ) {}

    public async execute(params: ListenForNewMessageDTO) {
        return this.meetEventHandlersRepository.onNewMessage(params);
    }
}
