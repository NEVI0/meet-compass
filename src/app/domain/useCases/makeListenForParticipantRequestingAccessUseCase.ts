import { makeMeetEventHandlersRepository } from '@app/infra/repositories';
import { ListenForParticipantRequestingAccessUseCase } from './implementations/ListenForParticipantRequestingAccessUseCase';

let instace: ListenForParticipantRequestingAccessUseCase | null = null;

export function makeListenForParticipantRequestingAccessUseCase() {
    if (!instace) {
        const meetEventHandlersRepository = makeMeetEventHandlersRepository();
        instace = new ListenForParticipantRequestingAccessUseCase(
            meetEventHandlersRepository,
        );
    }
    return instace;
}
