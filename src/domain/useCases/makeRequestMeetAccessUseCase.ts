import { makeMeetRepository } from '@infra/repositories';
import { RequestMeetAccessUseCase } from './implementations/RequestMeetAccessUseCase';

let instace: RequestMeetAccessUseCase | null = null;

export function makeRequestMeetAccessUseCase() {
    if (!instace) {
        const meetRepository = makeMeetRepository();
        instace = new RequestMeetAccessUseCase(meetRepository);
    }

    return instace;
}
