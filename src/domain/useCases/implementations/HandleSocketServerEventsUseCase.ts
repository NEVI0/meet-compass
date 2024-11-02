import { ParticipantAccessAnswerDTO } from '@domain/dtos';
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
            user.socketId = socketId;

            this.serverStorageProvider.addUser(user);
        });
    }

    private handleRegisterMeet() {
        this.socketServerProvider.on<MeetAbstract>('register-meet', meet => {
            const socketId = this.socketServerProvider.socket?.id || '';
            const owner = this.serverStorageProvider.findUserById(
                meet.owner.id,
            );

            meet.socketId = socketId;
            meet.owner.socketId = owner?.socketId || '';

            this.serverStorageProvider.addMeet(meet);
        });
    }

    private handleRequestMeetAccess() {
        this.socketServerProvider.on<any>('request-meet-access', data => {
            const { meet, from, signal } = data;

            const found = this.serverStorageProvider.findMeetById(meet.id);
            if (!found) return;

            const user = this.serverStorageProvider.findUserById(from.id);
            from.socketId = user?.socketId || '';

            this.socketServerProvider.emitToSocket(
                found.owner.socketId,
                'participant-requesting-meet-access',
                {
                    from,
                    signal,
                },
            );
        });
    }

    private handleAnswerMeetAccessRequest() {
        this.socketServerProvider.on<ParticipantAccessAnswerDTO>(
            'answer-meet-access-request',
            data => {
                const { meetId, answer, participant } = data;

                if (answer === 'DENIED') {
                    return this.socketServerProvider.emit(
                        'request-denied',
                        null,
                    );
                }

                const meet = this.serverStorageProvider.addMeetParticipant(
                    meetId,
                    participant,
                );
                if (!meet) return;

                this.socketServerProvider.emit('request-accepted', meet);
            },
        );
    }
}
