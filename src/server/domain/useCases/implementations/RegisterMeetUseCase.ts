import { RegisterMeetDTO } from '@server/domain/dtos';
import {
    ServerStorageProviderAbstract,
    SocketServerProviderAbstract,
} from '@server/domain/providers';

export class RegisterMeetUseCase {
    constructor(
        private socketServerProvider: SocketServerProviderAbstract,
        private serverStorageProvider: ServerStorageProviderAbstract,
    ) {}

    public execute() {
        this.socketServerProvider.on<RegisterMeetDTO>('register-meet', data => {
            if (!this.socketServerProvider.socket) return;

            const socketId = this.socketServerProvider.socket.id || '';
            const owner = this.serverStorageProvider.findUserById(
                data.meet.owner.id,
            );

            if (!owner) return;

            data.meet.socketId = socketId;
            data.meet.owner.socketId = owner.socketId || '';

            this.serverStorageProvider.addMeet(data.meet);
            this.serverStorageProvider.addMeetParticipant(
                data.meet.id,
                data.meet.owner,
            );

            this.socketServerProvider.emit('updated-meet', { meet: data.meet });
        });
    }
}
