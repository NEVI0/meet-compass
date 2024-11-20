import { makeMeetEventHandlersRepository } from '@infra/repositories';
import { ListenForLeavingParticipantUseCase } from './implementations/ListenForLeavingParticipantUseCase';

let instace: ListenForLeavingParticipantUseCase | null = null;

export function makeListenForLeavingParticipantUseCase() {
    if (!instace) {
        const meetEventHandlersRepository = makeMeetEventHandlersRepository();
        instace = new ListenForLeavingParticipantUseCase(
            meetEventHandlersRepository,
        );
    }

    return instace;
}
