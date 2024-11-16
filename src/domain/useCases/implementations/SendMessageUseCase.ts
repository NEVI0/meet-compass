import { SendMessageDTO } from '@domain/dtos';
import { MeetRepositoryAbstract } from '@domain/repositories';

export class SendMessageUseCase {
    constructor(private meetRepository: MeetRepositoryAbstract) {}

    public execute(params: SendMessageDTO) {
        this.meetRepository.sendMessage(params);
    }
}
