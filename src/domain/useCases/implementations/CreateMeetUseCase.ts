import { CreateMeetDTO } from '@domain/dtos';
import { MeetRepositoryAbstract } from '@domain/repositories';

export class CreateMeetUseCase {
    constructor(private meetRepository: MeetRepositoryAbstract) {}

    public async execute(params: CreateMeetDTO) {
        return this.meetRepository.create(params);
    }
}
