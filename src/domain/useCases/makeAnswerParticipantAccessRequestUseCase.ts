import { makeSocketClientProvider } from '@infra/providers';
import { AnswerParticipantAccessRequestUseCase } from './implementations/AnswerParticipantAccessRequestUseCase';

let instace: AnswerParticipantAccessRequestUseCase | null = null;

export function makeAnswerParticipantAccessRequestUseCase() {
    if (!instace) {
        const socketClientProvider = makeSocketClientProvider();

        instace = new AnswerParticipantAccessRequestUseCase(
            socketClientProvider,
        );
    }
    return instace;
}
