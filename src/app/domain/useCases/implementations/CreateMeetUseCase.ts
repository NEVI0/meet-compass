import { CreateMeetDTO } from '@app/domain/dtos';
import { MeetRepositoryAbstract } from '@app/domain/repositories';

export class CreateMeetUseCase {
    constructor(private meetRepository: MeetRepositoryAbstract) {}

    public async execute(params: CreateMeetDTO) {
        return this.meetRepository.create(params);
    }
}
