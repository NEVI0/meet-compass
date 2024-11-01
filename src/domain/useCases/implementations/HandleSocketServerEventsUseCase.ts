import { MeetAbstract, UserAbstract } from '@domain/entities';
import {
    ServerStorageProviderAbstract,
    SocketServerProviderAbstract,
} from '@domain/providers';

export class HandleSocketServerEventsUseCase {
    constructor(
        private serverStorageProvider: ServerStorageProviderAbstract,
        private socketServerProvider: SocketServerProviderAbstract,
    ) {}

    public execute() {
        this.socketServerProvider.connect(() => {
            this.handleRegisterUser();
            this.handleRegisterMeet();

            this.handleRequestMeetAccess();
            this.handleAnswerMeetAccessRequest();
        });
    }

    private handleRegisterUser() {
        this.socketServerProvider.on<UserAbstract>('register-user', user => {
            const socketId = this.socketServerProvider.socket?.id || '';

            this.serverStorageProvider.addUser({
                ...user,
                socketId,
            });
        });
    }

    private handleRegisterMeet() {
        this.socketServerProvider.on<MeetAbstract>('register-meet', meet => {
            const socketId = this.socketServerProvider.socket?.id || '';

            this.serverStorageProvider.addMeet({
                ...meet,
                socketId,
            });
        });
    }

    private handleRequestMeetAccess() {
        this.socketServerProvider.on<any>('request-meet-access', data => {
            const { meet, from, signal } = data;

            const found = this.serverStorageProvider.findMeetById(meet.id);
            if (!found) return;

            const user = this.serverStorageProvider.findUserById(
                found.owner.id,
            );
            if (!user) return;

            this.socketServerProvider.emitToSocket(
                user.socketId,
                'participant-requesting-meet-access',
                {
                    from,
                    signal,
                },
            );
        });
    }

    private handleAnswerMeetAccessRequest() {
        this.socketServerProvider.on<any>(
            'answer-meet-access-request',
            data => {
                const { answer } = data;

                this.socketServerProvider.emit(
                    answer === 'ACCEPTED'
                        ? 'request-accepted'
                        : 'request-denied',
                    null,
                );
            },
        );
    }
}
