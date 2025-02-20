import { makeMeetRepository } from '@app/infra/repositories';
import { LeaveMeetUseCase } from './implementations/LeaveMeetUseCase';

let instace: LeaveMeetUseCase | null = null;

export function makeLeaveMeetUseCase() {
    if (!instace) {
        const meetRepository = makeMeetRepository();
        instace = new LeaveMeetUseCase(meetRepository);
    }

    return instace;
}
