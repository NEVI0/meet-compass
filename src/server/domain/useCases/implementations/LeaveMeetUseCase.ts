import { LeaveMeetDTO } from '@server/domain/dtos';
import {
    ServerStorageProviderAbstract,
    SocketServerProviderAbstract,
} from '@server/domain/providers';

export class LeaveMeetUseCase {
    constructor(
        private socketServerProvider: SocketServerProviderAbstract,
        private serverStorageProvider: ServerStorageProviderAbstract,
    ) {}

    public execute() {
        this.socketServerProvider.on<LeaveMeetDTO>('leave-meet', data => {
            const { meetId, user } = data;

            const meet = this.serverStorageProvider.removeMeetParticipant(
                meetId,
                user,
            );
            if (!meet) return;

            meet.participants.forEach(participant => {
                this.socketServerProvider.emitToSocket(
                    participant.socketId,
                    'participant-left',
                    { name: user.name },
                );

                this.socketServerProvider.emitToSocket(
                    participant.socketId,
                    'updated-meet',
                    meet,
                );
            });
        });
    }
}
