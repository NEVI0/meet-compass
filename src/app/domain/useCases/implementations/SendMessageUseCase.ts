import { SendMessageDTO } from '@app/domain/dtos';
import { MeetRepositoryAbstract } from '@app/domain/repositories';

export class SendMessageUseCase {
    constructor(private meetRepository: MeetRepositoryAbstract) {}

    public execute(params: SendMessageDTO) {
        this.meetRepository.sendMessage(params);
    }
}
