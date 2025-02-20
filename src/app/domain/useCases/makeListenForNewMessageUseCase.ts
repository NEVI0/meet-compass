import { makeMeetEventHandlersRepository } from '@app/infra/repositories';
import { ListenForNewMessageUseCase } from './implementations/ListenForNewMessageUseCase';

let instace: ListenForNewMessageUseCase | null = null;

export function makeListenForNewMessageUseCase() {
    if (!instace) {
        const meetEventHandlersRepository = makeMeetEventHandlersRepository();
        instace = new ListenForNewMessageUseCase(meetEventHandlersRepository);
    }
    return instace;
}
