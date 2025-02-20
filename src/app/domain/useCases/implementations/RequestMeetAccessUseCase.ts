import { RequestMeetAccessDTO } from '@app/domain/dtos';
import { MeetRepositoryAbstract } from '@app/domain/repositories';

export class RequestMeetAccessUseCase {
    constructor(private meetRepository: MeetRepositoryAbstract) {}

    public execute(params: RequestMeetAccessDTO) {
        return this.meetRepository.requestAccess(params);
    }
}
