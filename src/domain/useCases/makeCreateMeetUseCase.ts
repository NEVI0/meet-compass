import { makeMeetRepository } from '@infra/repositories';
import { CreateMeetUseCase } from './implementations/CreateMeetUseCase';

let instace: CreateMeetUseCase | null = null;

export function makeCreateMeetUseCase() {
    if (!instace) {
        const meetRepository = makeMeetRepository();
        instace = new CreateMeetUseCase(meetRepository);
    }
    return instace;
}
