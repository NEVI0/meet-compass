import { ListenForMeetUpdatedDTO } from '@app/domain/dtos';
import { MeetEventHandlersRepositoryAbstract } from '@app/domain/repositories';

export class ListenForMeetUpdateUseCase {
    constructor(
        private meetEventHandlersRepository: MeetEventHandlersRepositoryAbstract,
    ) {}

    public async execute(params: ListenForMeetUpdatedDTO) {
        return this.meetEventHandlersRepository.onMeetUpdate(params);
    }
}
