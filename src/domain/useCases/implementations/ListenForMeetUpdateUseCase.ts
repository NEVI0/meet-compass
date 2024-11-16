import { ListenForMeetUpdatedDTO } from '@domain/dtos';
import { MeetEventHandlersRepositoryAbstract } from '@domain/repositories';

export class ListenForMeetUpdateUseCase {
    constructor(
        private meetEventHandlersRepository: MeetEventHandlersRepositoryAbstract,
    ) {}

    public async execute(params: ListenForMeetUpdatedDTO) {
        return this.meetEventHandlersRepository.onMeetUpdate(params);
    }
}
