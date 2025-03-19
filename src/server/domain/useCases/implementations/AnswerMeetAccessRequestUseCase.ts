import { AnswerMeetAccessRequestDTO } from '@server/domain/dtos';
import {
    ServerStorageProviderAbstract,
    SocketServerProviderAbstract,
} from '@server/domain/providers';

export class AnswerMeetAccessRequestUseCase {
    constructor(
        private socketServerProvider: SocketServerProviderAbstract,
        private serverStorageProvider: ServerStorageProviderAbstract,
    ) {}

    public execute() {
        this.socketServerProvider.on<AnswerMeetAccessRequestDTO>(
            'answer-meet-access-request',
            data => {
                const { meetId, answer, participant } = data;

                if (answer === 'DENIED') {
                    return this.socketServerProvider.emitTo(
                        participant.socketId,
                        'request-denied',
                        null,
                    );
                }

                const meet = this.serverStorageProvider.addMeetParticipant(
                    meetId,
                    participant,
                );
                if (!meet) return;

                meet.participants.forEach(participant => {
                    this.socketServerProvider.emitTo(
                        participant.socketId,
                        'updated-meet',
                        { meet },
                    );
                });
            },
        );
    }
}
