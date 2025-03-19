import { SendMessageDTO } from '@server/domain/dtos';
import {
    ServerStorageProviderAbstract,
    SocketServerProviderAbstract,
} from '@server/domain/providers';

export class SendMessageUseCase {
    constructor(
        private socketServerProvider: SocketServerProviderAbstract,
        private serverStorageProvider: ServerStorageProviderAbstract,
    ) {}

    public execute() {
        this.socketServerProvider.on<SendMessageDTO>('message', data => {
            const { meetId, sent } = data;

            const meet = this.serverStorageProvider.findMeetById(meetId);
            if (!meet) return;

            meet.participants
                .filter(participant => participant.id !== sent.by.id)
                .forEach(participant => {
                    this.socketServerProvider.emitTo(
                        participant.socketId,
                        'message',
                        data,
                    );
                });
        });
    }
}
