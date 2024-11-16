import { makeMeetRepository } from '@infra/repositories';
import { AnswerParticipantAccessRequestUseCase } from './implementations/AnswerParticipantAccessRequestUseCase';

let instace: AnswerParticipantAccessRequestUseCase | null = null;

export function makeAnswerParticipantAccessRequestUseCase() {
    if (!instace) {
        const meetRepository = makeMeetRepository();
        instace = new AnswerParticipantAccessRequestUseCase(meetRepository);
    }

    return instace;
}
