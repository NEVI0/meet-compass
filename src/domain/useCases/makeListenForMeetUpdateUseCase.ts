import { makeMeetEventHandlersRepository } from '@infra/repositories';
import { ListenForMeetUpdateUseCase } from './implementations/ListenForMeetUpdateUseCase';

let instace: ListenForMeetUpdateUseCase | null = null;

export function makeListenForMeetUpdateUseCase() {
    if (!instace) {
        const meetEventHandlersRepository = makeMeetEventHandlersRepository();
        instace = new ListenForMeetUpdateUseCase(meetEventHandlersRepository);
    }
    return instace;
}
