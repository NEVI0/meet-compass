import { LeaveMeetDTO } from '@domain/dtos';
import { MeetRepositoryAbstract } from '@domain/repositories';

export class LeaveMeetUseCase {
    constructor(private meetRepository: MeetRepositoryAbstract) {}

    public async execute(params: LeaveMeetDTO) {
        return this.meetRepository.leave(params);
    }
}
