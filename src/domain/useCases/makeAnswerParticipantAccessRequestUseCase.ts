import { makeMeetEventHandlersRepository } from '@infra/repositories';
import { AnswerParticipantAccessRequestUseCase } from './implementations/AnswerParticipantAccessRequestUseCase';

let instace: AnswerParticipantAccessRequestUseCase | null = null;

export function makeAnswerParticipantAccessRequestUseCase() {
    if (!instace) {
        const meetEventHandlersRepository = makeMeetEventHandlersRepository();

        instace = new AnswerParticipantAccessRequestUseCase(
            meetEventHandlersRepository,
        );
    }
    return instace;
}
