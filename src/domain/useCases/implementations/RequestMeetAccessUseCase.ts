import { RequestMeetAccessDTO } from '@domain/dtos';
import { MeetRepositoryAbstract } from '@domain/repositories';

export class RequestMeetAccessUseCase {
    constructor(private meetRepository: MeetRepositoryAbstract) {}

    public execute(params: RequestMeetAccessDTO) {
        return this.meetRepository.requestAccess(params);
    }
}
