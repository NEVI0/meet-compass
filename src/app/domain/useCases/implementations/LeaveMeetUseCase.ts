import { LeaveMeetDTO } from '@app/domain/dtos';
import { MeetRepositoryAbstract } from '@app/domain/repositories';

export class LeaveMeetUseCase {
    constructor(private meetRepository: MeetRepositoryAbstract) {}

    public async execute(params: LeaveMeetDTO) {
        return this.meetRepository.leave(params);
    }
}
