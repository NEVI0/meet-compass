import { RegisterUserDTO } from '@server/domain/dtos';
import {
    ServerStorageProviderAbstract,
    SocketServerProviderAbstract,
} from '@server/domain/providers';

export class RegisterUserUseCase {
    constructor(
        private socketServerProvider: SocketServerProviderAbstract,
        private serverStorageProvider: ServerStorageProviderAbstract,
    ) {}

    public execute() {
        this.socketServerProvider.on<RegisterUserDTO>('register-user', data => {
            if (!this.socketServerProvider.socket) return;

            const socketId = this.socketServerProvider.socket.id || '';
            data.user.socketId = socketId;

            this.serverStorageProvider.addUser(data.user);
        });
    }
}
